import BN from "bn.js";
import React, { FunctionComponent, useState } from "react";
import { ChainId } from "../../../service/eth/networks";
import Wallet from "../../../service/eth/Wallet";
import Carousel from "../Carousel";
import SelectWalletSlide from "../wallet/SelectWalletSlide";
import PayUsingWalletSlide from "./PayUsingWalletSlide";
import { TransactionReceipt, PromiEvent } from "web3-core";

const EtherSlides: FunctionComponent<{
  chainId: ChainId,
  toAddress: string,
  amount: BN,
  gasPrice: BN,
  onPaymentComplete: (receipt: TransactionReceipt, wallet: Wallet) => void
}> = ({ chainId, amount, toAddress, gasPrice, onPaymentComplete }) => {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [chosenWallet, setChosenWallet] = useState<Wallet | null>(null)
  
  return <Carousel currentIndex={carouselIndex}>{[
    <SelectWalletSlide
      key={SelectWalletSlide.name}
      onWalletSelected={wallet => {
        setChosenWallet(wallet)
        setCarouselIndex(old => Math.max(old, 1))
      }}>
      Select an Ethereum wallet to pay
    </SelectWalletSlide>,
    ...(chosenWallet !== null ? [
      <PayUsingWalletSlide
        key={PayUsingWalletSlide.name}
        chainId={chainId}
        toAddress={toAddress}
        wallet={chosenWallet}
        amount={amount}
        gasPrice={gasPrice}
        onPaymentComplete={receipt => onPaymentComplete(receipt, chosenWallet)} />
    ] : [])
  ]}</Carousel>
}

export default EtherSlides
