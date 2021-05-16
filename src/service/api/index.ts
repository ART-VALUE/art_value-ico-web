import { Socket } from "socket.io-client";

const DEFAULT_API_CALL_TIMEOUT = 7000

export type ApiResult<T> = {
  data: T,
  error: null
} | {
  data: null,
  error: {
    name: string | null,
    message: string
  }
}

export abstract class ApiException extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'ApiException'
  }
}

export class ApiCallTimeoutException extends ApiException {
  constructor(message?: string) {
    super(message)
    this.name = 'ApiCallTimeoutException'
  }
}

export class UnknownApiException extends ApiException {
  constructor(message: string) {
    super(message)
    this.name = 'UnknownApiException'
  }
}

export class NamedApiException extends ApiException {
  originalName: string
  originalMessage: string

  constructor(name: string, message: string) {
    super(`${name}: ${message}`)
    this.name = 'NamedApiException'
    this.originalMessage = message
    this.originalName = name
  }
}

export function asyncApiCall<I = null, O = null>(
  socket: Socket,
  ev: string,
  data: I | null = null,
  timeout = DEFAULT_API_CALL_TIMEOUT
) {
  return new Promise<O>((resolve, reject) => {
    setTimeout(() => reject(new ApiCallTimeoutException()), timeout)
    socket.emit(
      ev,
      data,
      (msg: ApiResult<O>) => {
        if (msg.error == null) {
          resolve(msg.data)
        } else {
          if (msg.error.name == null) {
            reject(new UnknownApiException(msg.error.message))
          } else {
            reject(new NamedApiException(msg.error.name, msg.error.message))
          }
        }
      }
    );
  })
}
