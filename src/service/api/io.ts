import { io, Socket } from "socket.io-client";

export interface Ios {
  auth: Socket,
  transaction: Socket,
  deposit: Socket
}

export function createIo(base: string, ns: string) {
  return io(`${base}/${ns}`, {
    withCredentials: true
  });
}

export function createIos(base: string): Ios {
  return {
    auth: createIo(base, 'auth'),
    transaction: createIo(base, 'transaction'),
    deposit: createIo(base, 'deposit')
  }
}
