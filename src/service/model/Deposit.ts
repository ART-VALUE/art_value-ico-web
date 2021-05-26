import BN from "bn.js"

export interface DepositDto {
  uuid: string,
  user: string,
  amount: string,
  timeCreated: number,
  priceEther: string,
  gasPrice: string,
  ethTxHash: string | null,
  isVerified: boolean
}

export default class Deposit {
  readonly uuid: string
  readonly user: string
  readonly amount: BN
  readonly timeCreated: number
  readonly priceEther: BN
  readonly gasPrice: BN
  readonly ethTxHash: string | null
  readonly isVerified: boolean

  constructor(
    uuid: string,
    user: string,
    amount: BN,
    timeCreated: number,
    priceEther: BN,
    gasPrice: BN,
    ethTxHash: string | null,
    isVerified: boolean
  ) {
    this.uuid = uuid
    this.user = user
    this.amount = amount
    this.timeCreated = timeCreated
    this.priceEther = priceEther
    this.gasPrice = gasPrice
    this.ethTxHash = ethTxHash
    this.isVerified = isVerified
  }

  static fromDto(dto: DepositDto): Deposit {
    return new Deposit(
      dto.uuid,
      dto.user,
      new BN(dto.amount, 'hex'),
      dto.timeCreated,
      new BN(dto.priceEther, 'hex'),
      new BN(dto.gasPrice, 'hex'),
      dto.ethTxHash,
      dto.isVerified
    )
  }
}
