import { NamedApiException } from "./service/api"

export async function tryRetrow<T>(
  tryBlock: () => Promise<T>,
  retrowBlock: (e: any) => any
) {
  try {
    return await tryBlock()
  } catch (error) {
    throw retrowBlock(error)
  }
}

export const ifElse = <I, E>(
  condition: () => boolean | boolean,
  ifBlock: () => I,
  elseBlock: () => E
) => (typeof condition === 'function' ? condition() : condition)
  ? ifBlock()
  : elseBlock()

export function markErrorProcessed(error: any) {
  if (typeof error === 'object' && error != null) {
    (error as any)['processed'] = true
  }
}

export function isErrorProcessed(error: any) {
  return typeof error === 'object'
    && error != null
    && (error as any)['processed'] === true
}

export function errorToString(error: any) {
  if (error instanceof Error) {
    if (error instanceof NamedApiException) {
      return `${error.originalName}: ${error.message}`
    }
    return `${error.name}: ${error.message}`
  }
  const stringRepresentation = `${error}`
  if (stringRepresentation === '[object Object]') {
    try {
      return JSON.stringify(error)
    } catch (error) {
      // pass to fallback
    }
  }
  return stringRepresentation
}
