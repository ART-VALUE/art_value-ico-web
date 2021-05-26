import React, { FunctionComponent, useEffect, useState } from "react"
import ParamsSlide from "./ParamsSlide"
import Carousel from "../Carousel"
import BN from "bn.js"
import StripeSlide from "./StripeSlide"
import { Stripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useCurrentUserDetails, useWallets } from "../../../contexts"
import LoginSlides from "../auth/LoginSlides"
import EtherSlides from "./EtherSlides"
import CreateDepositSlide from "./CreateDepositSlide"
import Deposit, { DepositDto } from "../../../service/model/Deposit"
import VerifyDepositSlide from "./VerifyDepositSlide"
import InfoSlide from "./InfoSlide"
import * as constants from "../../../constants";
import { TransactionReceipt } from "web3-core";
import SetDepositEthTxHashSlide from "./UpdateDepositSlide"
import { Button } from "../../style/button"
import { EthPaymentTxResult } from "../../../service/eth/pay"
import ConfirmEthTxSlide from "./ConfirmEthTxSlide"
import SuccessSlide from "./SuccessSlide"
import Wallet from "../../../service/eth/Wallet"
import Web3 from "web3"

const PurchaseSlides: FunctionComponent<{
  stripePromise: Promise<Stripe | null>,
  onClose: () => void
}> = ({ stripePromise, onClose }) => {
  const { currentUser } = useCurrentUserDetails()
  const [amount, setAmount] = useState<BN | null>(null)
  const [deposit, setDeposit] = useState<Deposit | null>(null)
  const [depositEthTxHashIsSet, setDepositEthTxHashIsSet] = useState(false)
  const [ethTxReceiptAndWallet, setEthTxReceiptAndWallet] = useState<{
    receipt: TransactionReceipt, wallet: Wallet
  } | null>(null)
  const [ethTxConfirmations, setEthTxConfirmations] = useState(0)
  const [ethTxConfirmed, setEthTxConfirmed] = useState(false)
  const [ethTxVerified, setEthTxVerified] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const [checkoutId, setCheckoutId] = useState<number>() // Used to track this checkout client side (different from AvTxId)

  useEffect(() => setCheckoutId(Math.random()), [])
  
  const chainId = constants.CHAIN_ID
  const toAddress = constants.ETHER_TO_ADDRESS

  // const handleStripeCheckout = (_amount: BN) => {
  //   console.log(`Amount specified, stripe chosen: ${_amount}`)
  //   setAmount(_amount)
  //   setCarouselIndex(2)
  // }

  const handleEtherCheckout = (_amount: BN) => {
    console.log(`Amount specified: ${_amount}, Ether chosen`)
    setAmount(_amount)
    setCarouselIndex(old => Math.max(old, 2))
  }

  // const onStripeCheckoutDone = (_avTransactionId: string) => {
  //   console.log(`Stripe checkout done, avTransactionId: ${_avTransactionId}`)
  //   setAvTransactionId(_avTransactionId)
  //   setCarouselIndex(3)
  // }

  return (<>
  <Carousel currentIndex={carouselIndex}>{[
    ...(currentUser == null
      ? [<LoginSlides
          key={LoginSlides.name}
          onLoggedIn={() => {}} />]
      : []
    ),
    <InfoSlide
      key="Info slide"
      onContinue={() => setCarouselIndex(old => Math.max(old, 1))} />,
    <ParamsSlide
      key={ParamsSlide.name}
      onEtherCheckout={handleEtherCheckout} />,
    ...(amount != null
      ? [
        <CreateDepositSlide
          key={CreateDepositSlide.name}
          amount={amount}
          onDepositCreated={deposit => {
            setDeposit(deposit)
            setCarouselIndex(old => Math.max(old, 3))
          }} />,
        ...(deposit != null
          ? [
            <EtherSlides
              key={EtherSlides.name}
              chainId={chainId}
              toAddress={toAddress}
              amount={deposit.priceEther}
              gasPrice={deposit.gasPrice}
              onPaymentComplete={(receipt, wallet) => {
                setEthTxReceiptAndWallet({receipt, wallet})
                setCarouselIndex(old => Math.max(old, 4))
              }} />,
            ...(ethTxReceiptAndWallet != null
              ? [
                <SetDepositEthTxHashSlide
                  key={SetDepositEthTxHashSlide.name}
                  deposit={deposit}
                  ethTxHash={ethTxReceiptAndWallet.receipt.transactionHash}
                  onDepositEthTxHashSet={(deposit) => {
                    setDeposit(deposit)
                    setDepositEthTxHashIsSet(true)
                    setCarouselIndex(old => Math.max(old, 5))
                  }} />,
                  ...(depositEthTxHashIsSet
                    ? [
                      <ConfirmEthTxSlide
                        key={ConfirmEthTxSlide.name}
                        web3={new Web3(ethTxReceiptAndWallet.wallet.provider)}
                        chainId={chainId}
                        txReceipt={ethTxReceiptAndWallet.receipt}
                        onTransactionConfirmed={() => {
                          setEthTxConfirmed(true)
                          setCarouselIndex(old => Math.max(old, 6))
                        }} />,
                      ...(ethTxConfirmed
                        ? [
                          <VerifyDepositSlide
                            key={VerifyDepositSlide.name}
                            deposit={deposit}
                            onVerified={() => {
                              setEthTxVerified(true)
                              setCarouselIndex(old => Math.max(old, 7))
                            }} />,
                          ...(ethTxVerified
                            ? [
                              <SuccessSlide
                                key={SuccessSlide.name}
                                deposit={deposit}
                                onClose={onClose} />
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
          ]
          : []
        )

      ]
      : []
    )
  ]}</Carousel>
  {carouselIndex > 0
    ? <Button onClick={() => setCarouselIndex(old => Math.max(0, old - 1))}>Back</Button>
    : <></>
  }
  </>)
}

export default PurchaseSlides
