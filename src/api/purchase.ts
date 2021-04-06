import BN from "bn.js";
import { Socket } from "socket.io-client";
import { asyncApiCall } from ".";

export type ApiResponse<T> = {
    success: true,
    data: T
} | {
    success: false,
    errorMsg: string
}

export interface StripeInitData {
    clientSecret: string,
    avTxId: string
}

export const stripeInit = (
    socket: Socket,
    amount: BN,
    ethAddress: string
) => asyncApiCall<{
    amountHex: string,
    ethAddress: string
}, StripeInitData>(
    socket,
    "stripeInit",
    { amountHex: amount.toString('hex'), ethAddress }
)

interface VerifyTxData {
    mintTx: string
}

export const verifyTx = (
    socket: Socket,
    avTxId: string
) => asyncApiCall<{
    avTxId: string
}, VerifyTxData>(
    socket,
    "verifyTx",
    { avTxId }
)
