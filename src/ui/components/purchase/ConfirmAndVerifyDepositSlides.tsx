import React, { FunctionComponent, useState } from "react";
import Web3 from "web3";
import { ChainId } from "../../../service/eth/networks";
import Deposit from "../../../service/model/Deposit";
import Carousel from "../Carousel";
import SuccessSlide from "./SuccessSlide";
import VerifyDepositSlide from "./VerifyDepositSlide";
import ConfirmEthTxSlide from "./ConfirmEthTxSlide";
import { TransactionReceipt } from "web3-core";
import SelectWalletSlide from "../wallet/SelectWalletSlide";
import Wallet from "../../../service/eth/Wallet";
import GetEthTxReceipt from "./GetEthTxReceipt";

const ConfirmAndVerifyDepositSlides: FunctionComponent<{
  chainId: ChainId,
  deposit: Deposit,
  onVerified: (deposite: Deposit) => void
}> = ({ deposit, onVerified, chainId }) => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [ethTxReceipt, setEthTxReceipt] = useState<TransactionReceipt | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [hasConfirmedEthTx, setHasConfirmedEthTx] = useState(false)
  const [verifiedDeposit, setVerifiedDeposit] = useState<Deposit | null>(null)

  return <Carousel currentIndex={carouselIndex}>{[
    <SelectWalletSlide
      key={SelectWalletSlide.name}
      onWalletSelected={wallet => {
        setSelectedWallet(wallet)
        setCarouselIndex(old => Math.max(old, 1))
      }}>
      Select wallet to confirm transaction
    </SelectWalletSlide>,
    ...(selectedWallet != null
      ? [
        <GetEthTxReceipt
          key={GetEthTxReceipt.name}
          deposit={deposit}
          wallet={selectedWallet}
          onGotEthTxReceipt={receipt => {
            setEthTxReceipt(receipt)
            setCarouselIndex(old => Math.max(old, 2))
          }} />,
        ...(ethTxReceipt != null
          ? [
            <ConfirmEthTxSlide
              key={ConfirmEthTxSlide.name}
              web3={new Web3(selectedWallet.provider)}
              chainId={chainId}
              txReceipt={ethTxReceipt}
              onTransactionConfirmed={() => {
                setHasConfirmedEthTx(true)
                setCarouselIndex(old => Math.max(old, 3))
              }} />,
            ...(hasConfirmedEthTx
              ? [
                <VerifyDepositSlide
                  key={VerifyDepositSlide.name}
                  deposit={deposit}
                  onVerified={verifiedDeposit => {
                    setVerifiedDeposit(verifiedDeposit)
                    setCarouselIndex(old => Math.max(old, 4))
                  }} />,
                ...(verifiedDeposit != null
                  ? [
                    <SuccessSlide
                      key={SuccessSlide.name}
                      deposit={deposit}
                      onClose={() => onVerified(verifiedDeposit)} />
                  ]
                  : []
                )
              ]
              : []
            )
          ]
          : []
        )
      ]
      : []
    )
  ]}</Carousel>
}

export default ConfirmAndVerifyDepositSlides
