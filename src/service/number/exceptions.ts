export class NumberFormatException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NumberFormatException'
  }
}

export class TooManyDecimalSeparatorsException extends NumberFormatException {
  constructor(message: string) {
    super(message)
    this.name = 'TooManyDecimalSeparatorsException'
  }
}

export class InvalidCharacterException extends NumberFormatException {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCharacterException'
  }
}

export class FrationalPartTooLargeException extends NumberFormatException {
  constructor(message: string) {
    super(message)
    this.name = 'FrationalPartTooLargeException'
  }
}
