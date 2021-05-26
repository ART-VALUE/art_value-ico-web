import BN from "bn.js";
import trimEnd from "lodash/trimEnd";

export const AMOUNT_TO_FRACTIONLESS_FACTOR = 100 // amount 824.12 euro * 100 = 82412 fractionless euro

const replaceAll = (needle: string, str: string, replacement = '') => str.split(needle).join(replacement)

export const amountToFractionlessFactorBn = new BN(AMOUNT_TO_FRACTIONLESS_FACTOR)
const decimalSeperatorRegex = /[\.\,]/g
const nonNumericRegex = /[^$,.\d]/
const containsNonNumerics = (string: string) => string.match(nonNumericRegex) !== null
export const browserDecimalSeparator = (1.1).toLocaleString().substring(1, 2)

export function fractionlessToString(number: BN) {
  const integerPart = number.div(amountToFractionlessFactorBn)
  const fractionalPart = number.sub(integerPart.mul(amountToFractionlessFactorBn))
  const integerPartStr = integerPart.toString(10)
  const fractionalPartStr = trimEnd(fractionalPart.toString(10), '0')
  if (fractionalPart.isZero()) {
    return integerPartStr
  } else {
    return integerPartStr + browserDecimalSeparator + fractionalPartStr
  }
}

export class NumberFormatException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NumberFormatException'
  }
}

export class TooManyDecimalSeperatorsException extends NumberFormatException {
  constructor(message: string) {
    super(message)
    this.name = 'TooManyDecimalSeperatorsException'
  }
}

export class InvalidCharacterException extends NumberFormatException {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCharacterException'
  }
}

export function fractionlessNumberFromString(
  string: string,
  decimalSeperator = browserDecimalSeparator
) {
  if (string.length === 0) return null
  const numberParts = string.split(decimalSeperator)
  if (numberParts.length > 2) throw new TooManyDecimalSeperatorsException(`Found ${numberParts.length+1} decimal seperators (${decimalSeperator}). Only one is allowed.`)
  const integerPartStr =  numberParts[0].replace(decimalSeperatorRegex, '')
  if (containsNonNumerics(integerPartStr)) throw new TooManyDecimalSeperatorsException(`Integer part contains an invalid character`)
  const integerPart = new BN(integerPartStr, 10).mul(amountToFractionlessFactorBn)
  
  if (numberParts.length === 1) return integerPart

  const fractionalPartStr = numberParts[1].replace(decimalSeperatorRegex, '')
  if (containsNonNumerics(fractionalPartStr)) throw new TooManyDecimalSeperatorsException(`Fractional part contains an invalid character`)
  const fractionalPart = new BN(fractionalPartStr, 10)
  return integerPart.add(fractionalPart)
}
