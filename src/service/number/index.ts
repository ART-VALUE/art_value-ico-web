import BN from "bn.js";
import trimEnd from "lodash/trimEnd";
import { FrationalPartTooLargeException, InvalidCharacterException, TooManyDecimalSeparatorsException } from "./exceptions";

export const TWO_NBRO_FRACTION_DIGITS = 2 // 824.12 => 824 + 12 * 100 = 82412 fractionless
const decimalSeparatorRegex = /[\.\,]/g
const nonNumericRegex = /[^\d]/
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
  const fractionalPartStr = fractionalPart.toString(10, maxNbroFractionDigits)
  if (fractionalPart.isZero()) {
    return integerPartStr
  } else {
    return integerPartStr + browserDecimalSeparator + fractionalPartStr
  }
}

export function fractionlessNumberFromString(
  numberString: string,
  decimalSeparator = browserDecimalSeparator,
  maxNbroFractionDigits = TWO_NBRO_FRACTION_DIGITS,
  throwOnTooLargeFractionPart = false
): {
  withDecimalSeparator: string,
  number: BN
} | null {
  const fractionFactor = toFractionFactor(maxNbroFractionDigits)

  if (numberString.length === 0) return null
  const numberParts = numberString.split(decimalSeparator)
  if (numberParts.length > 2) {
    throw new TooManyDecimalSeparatorsException(
      `Found ${numberParts.length-1} decimal separators `
      + `(${decimalSeparator}). Only one is allowed.`
    )
  }
  const [integerPartStr, fractionPartStr] = numberParts

  // Parse integer part
  const integerPartWoDecimalSeparators = integerPartStr
    .replace(decimalSeparatorRegex, '')
  throwOnNonNumeric(integerPartWoDecimalSeparators, 'Integer part')
  const integerPart = new BN(integerPartWoDecimalSeparators, 10)
  const fractionlessIntegerPart = integerPart.mul(fractionFactor)
  
  if (numberParts.length === 1) return {
    number: fractionlessIntegerPart,
    withDecimalSeparator: integerPart.toString(10)
  }

  // Parse fraction part
  throwOnNonNumeric(fractionPartStr, 'Fraction part')
  const fractionPartDigits = fractionPartStr.length
  if (throwOnTooLargeFractionPart && fractionPartDigits > maxNbroFractionDigits) {
    throw new FrationalPartTooLargeException(
      `Fractional part (${fractionPartStr}) of ${numberString} has more `
      + `digits than allowed (${maxNbroFractionDigits})`
    )
  }

  if (fractionPartDigits === 0) {
    return {
      number: fractionlessIntegerPart,
      withDecimalSeparator: integerPart.toString(10) + decimalSeparator
    }
  }

  const slicedAndPaddedFractionPart = fractionPartStr
    .slice(0, maxNbroFractionDigits)
    .padEnd(maxNbroFractionDigits, '0')
  const fractionPart = new BN(slicedAndPaddedFractionPart, 10)

  const processedFractionPartStr = fractionPart.toString(10, Math.min(fractionPartDigits, maxNbroFractionDigits))
  const lastZeroIndex = processedFractionPartStr.lastIndexOf('0')
  const trimmedProcessedFractionPartStr = processedFractionPartStr.slice(
    0,
    Math.max(lastZeroIndex, fractionPartDigits)
  )
  
  return {
    number: fractionlessIntegerPart.add(fractionPart),
    withDecimalSeparator: integerPart.toString(10) + decimalSeparator + trimmedProcessedFractionPartStr
  }
}

function throwOnNonNumeric(string: string, stringName: string) {
  const nonNumeric = string.match(nonNumericRegex)
  if (nonNumeric != null) {
    const index = nonNumeric.index
    throw new InvalidCharacterException(
      `${stringName} contains an invalid character (character `
      + (index != null ? (index + 1).toString() : '?')
      + ` of '${string}': '${nonNumeric[0]}')`
    )
  }
}
