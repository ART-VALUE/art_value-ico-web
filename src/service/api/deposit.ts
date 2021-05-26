import BN from "bn.js"
import { Socket } from "socket.io-client"
import { asyncApiCall } from "."
import Deposit, { DepositDto } from "../model/Deposit"

export async function createDeposit(
  depositIo: Socket,
  amount: BN
) {
  return Deposit.fromDto(await asyncApiCall<any, DepositDto>(
    depositIo,
    'create',
    { amount }
  ))
}

export async function setDepositEthTxHash(
  depositIo: Socket,
  deposit: Deposit,
  ethTxHash: string
) {
  return Deposit.fromDto(await asyncApiCall<any, DepositDto>(
    depositIo,
    'setEthTxHash',
    { uuid: deposit.uuid, ethTxHash }
  ))
}

export async function verifyDeposit(
  depositIo: Socket,
  deposit: Deposit
) {
  return Deposit.fromDto(await asyncApiCall<any, DepositDto>(
    depositIo,
    'verify',
    { uuid: deposit.uuid }
  ))
}

export async function getMyDeposits(
  depositIo: Socket
) {
  return (await asyncApiCall<any, DepositDto[]>(
    depositIo,
    'getMine',
    {}
  )).map(Deposit.fromDto)
}

export async function getMyPaidDeposits(
  depositIo: Socket
) {
  return (await asyncApiCall<any, DepositDto[]>(
    depositIo,
    'getMinePaid',
    {}
  )).map(Deposit.fromDto)
}
