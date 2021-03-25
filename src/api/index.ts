import { Socket } from "socket.io-client";

export const PAYMENT_NS = "payment"

type ApiResponse<T> = {
    success: true,
    data: T
} | {
    success: false,
    errorMsg: string
}

export function asyncApiCall<I, O>(socket: Socket, ev: string, data: I) {
    return new Promise<O>((resolve, reject) => {
        socket.emit(
            ev,
            data,
            (msg: ApiResponse<O>) => {
                if (msg.success) {
                    resolve(msg.data)
                } else {
                    reject(msg.errorMsg)
                }
            }
        );
    })
}
