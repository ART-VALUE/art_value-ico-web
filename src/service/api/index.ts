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

export function parseApiResult<T>(apiResponse: ApiResult<T>) {
  if (apiResponse.error == null) {
    return apiResponse.data
  } else {
    if (apiResponse.error.name == null) {
      throw new UnknownApiException(apiResponse.error.message)
    } else {
      throw new NamedApiException(apiResponse.error.name, apiResponse.error.message)
    }
  }
}

export function isNamedApiException(error: any, name: string) {
  return error instanceof NamedApiException && error.originalName === name
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
        try {
          resolve(parseApiResult(msg))
        } catch (error) {
          reject(error)
        }
      }
    );
  })
}
