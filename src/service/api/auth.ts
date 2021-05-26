import { Socket } from "socket.io-client";
import Web3 from "web3";
import { asyncApiCall } from ".";
import { tryRetrow } from "../../util";
import Wallet from "../eth/Wallet";
import { UserDto } from "../model/User";

export async function getMe(
  authIo: Socket
) {
  return await asyncApiCall<null, UserDto>(authIo, 'me')
}

export class SigningDeniedException extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'SigningDeniedException'
  }
}

export async function authenticateThroughWeb3(
  authIo: Socket,
  web3: Web3,
  address: string
) {
  const signedVerifier = await asyncApiCall<null, string>(authIo, 'verifier')  
  const signedVerifierHash = web3.eth.accounts.hashMessage(signedVerifier)
  const userSignature = await tryRetrow(
    async () => await web3.eth.sign(signedVerifierHash, address),
    e => {
      if (e.message === 'User denied message signature.') {
        return new SigningDeniedException()
      }
      return e
    }
  )

  const user = await asyncApiCall<any, UserDto | null>(
    authIo,
    'authenticate',
    { signedVerifier, address, userSignature }
  )

  return user
}

export async function signUp(
  authIo: Socket,
  web3: Web3,
  wallet: Wallet,
  email: string
) {
  const signedVerifier = await asyncApiCall<null, string>(authIo, 'verifier')  
  const signedVerifierHash = web3.eth.accounts.hashMessage(signedVerifier)
  const userSignature = await web3.eth.sign(signedVerifierHash, wallet.address)

  const user = await asyncApiCall<any, UserDto>(
    authIo,
    'signUp',
    { signedVerifier, userSignature, address: wallet.address, providerType: wallet.providerType, email }
  )

  return user
}
