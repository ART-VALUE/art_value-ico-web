import BN from "bn.js"

export const weiToEtherStr = (wei: BN) => (wei.div(new BN('1000000000')).toNumber() / 1000000000).toString()
export const weiToGweiStr = (wei: BN) => (wei.toNumber() / 1000000000).toString()
