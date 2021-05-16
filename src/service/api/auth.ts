import { Socket } from "socket.io-client";
import { asyncApiCall } from ".";
import { Web3Wrapper } from "../eth/Web3Wrapper";

export async function authenticateThroughPortis(
  authIo: Socket,
  web3Wrapper: Web3Wrapper
) {
  const signedVerifier = await asyncApiCall<null, string>(authIo, 'verifier')  
  const accounts = await web3Wrapper.web3.eth.getAccounts()
  const address = accounts[0]
  const signedVerifierHash = web3Wrapper.web3.eth.accounts.hashMessage(signedVerifier)
  const userSignature = await web3Wrapper.web3.eth.sign(signedVerifierHash, address)

  const authenticateResult = await asyncApiCall<any, string>(
    authIo,
    'authenticateOrCreateUser',
    { signedVerifier, address, userSignature }
  )

  console.log(authenticateResult)
  throw Error('Continue')
}
