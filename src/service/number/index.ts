import BN from "bn.js";
import trimEnd from "lodash/trimEnd";
import { FrationalPartTooLargeException, InvalidCharacterException, TooManyDecimalSeperatorsException } from "./exceptions";

export const TWO_NBRO_FRACTION_DIGITS = 2 // 824.12 => 824 + 12 * 100 = 82412 fractionless
const decimalSeperatorRegex = /[\.\,]/g
const nonNumericRegex = /[^$,.\d]/
const containsNonNumerics = (string: string) => string.match(nonNumericRegex) !== null
export const browserDecimalSeparator = (1.1).toLocaleString().substring(1, 2)
export const toFractionFactor = (nbroFractionDigits: number) => new BN(10).pow(new BN(nbroFractionDigits))

export function fractionlessToString(
  number: BN,
  maxNbroFractionDigits = TWO_NBRO_FRACTION_DIGITS
) {
  const fractionFactor = toFractionFactor(maxNbroFractionDigits)

  const integerPart = number.div(fractionFactor)
  const fractionalPart = number.sub(integerPart.mul(fractionFactor))
  const integerPartStr = integerPart.toString(10)
  const fractionalPartStr = trimEnd(fractionalPart.toString(10), '0')
  if (fractionalPart.isZero()) {
    return integerPartStr
  } else {
    return integerPartStr + browserDecimalSeparator + fractionalPartStr
  }
}

export function fractionlessNumberFromString(
  numberString: string,
  decimalSeperator = browserDecimalSeparator,
  maxNbroFractionDigits = TWO_NBRO_FRACTION_DIGITS,
  throwOnTooLargeFractionPart = false
) {
  const fractionFactor = toFractionFactor(maxNbroFractionDigits)

  if (numberString.length === 0) return null
  const numberParts = numberString.split(decimalSeperator)
  if (numberParts.length > 2) {
    throw new TooManyDecimalSeperatorsException(
      `Found ${numberParts.length+1} decimal seperators `
      + `(${decimalSeperator}). Only one is allowed.`
    )
  }
  const [integerPartStr, fractionPartStr] = numberParts

  const integerPartWoDecimalSeperators = integerPartStr
    .replace(decimalSeperatorRegex, '')
  if (containsNonNumerics(integerPartWoDecimalSeperators)) {
    throw new InvalidCharacterException(
      'Integer part contains an invalid character'
    )
  }
  const integerPart = new BN(integerPartWoDecimalSeperators, 10)
    .mul(fractionFactor)
  
  if (numberParts.length === 1) return integerPart

  if (containsNonNumerics(fractionPartStr)) {
    throw new InvalidCharacterException(
      'Fraction part contains an invalid character'
    )
  }
  if (throwOnTooLargeFractionPart && fractionPartStr.length > maxNbroFractionDigits) {
    throw new FrationalPartTooLargeException(
      `Fractional part (${fractionPartStr}) of ${numberString} has more `
      + `digits than allowed (${maxNbroFractionDigits})`
    )
  }
  const fractionPart = new BN(fractionPartStr.slice(0, maxNbroFractionDigits), 10)

  return integerPart.add(fractionPart)
}
