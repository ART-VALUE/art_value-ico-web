import BN from "bn.js";
import { Socket } from "socket.io-client";
import { asyncApiCall } from ".";

export interface StripeInitData {
  clientSecret: string,
  avTxId: string
}

export const create = (
  ns: Socket,
  amount: BN,
  ethAddress: string
) => asyncApiCall<{
  amountHex: string,
  ethAddress: string
}, StripeInitData>(
  ns,
  "create",
  { amountHex: amount.toString('hex'), ethAddress }
)

interface VerifyTxData {
  mintTx: string
}

export const verifyTx = (
  ns: Socket,
  avTxId: string
) => asyncApiCall<{
  avTxId: string
}, VerifyTxData>(
  ns,
  "verifyTx",
  { avTxId }
)
