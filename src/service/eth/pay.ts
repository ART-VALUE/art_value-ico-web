import BN from "bn.js";
import Web3 from "web3";
import { TransactionReceipt, PromiEvent } from "web3-core";
import { ChainId } from "./networks";

export interface EthPaymentTxResult {
  receipt: TransactionReceipt,
  promiEvent: PromiEvent<TransactionReceipt>
}

export default async function payUsingWeb3(
  web3: Web3,
  from: string,
  to: string,
  amount: BN,
  gasPrice: BN,
  chainId: ChainId
) {
  return await web3.eth.sendTransaction({
    from,
    to,
    gasPrice,
    chainId,
    value: amount
  })
}
