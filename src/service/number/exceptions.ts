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

export class FrationalPartTooLargeException extends NumberFormatException {
  constructor(message: string) {
    super(message)
    this.name = 'FrationalPartTooLargeException'
  }
}
