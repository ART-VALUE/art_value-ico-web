import { FunctionComponent, useEffect, useState } from "react"
import "./PurchaseDialog.scss"
import "../../style/form.scss"
import WalletSlide from "./WalletSlide"
import ParamsSlide from "./ParamsSlide"
import Carousel from "./Carousel"
import BN from "bn.js"
import StripeSlide from "./StripeSlide"
import { Stripe } from "@stripe/stripe-js"
import { Socket } from "socket.io-client"
import VerifyTxSlide from "./VerifyTxSlide"
import { Elements } from "@stripe/react-stripe-js"

const PurchaseDialog: FunctionComponent<{
  stripePromise: Promise<Stripe | null>,
  io: Socket
}> = ({ stripePromise, io }) => {
  const [amount, setAmount] = useState<BN | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [avTransactionId, setAvTransactionId] = useState<string | null>(null)
  const [carouselIndex, setCarouselIndex] = useState<number>(1)
  const [checkoutId, setCheckoutId] = useState<number>() // Used to track this checkout client side (different from AvTxId)

  useEffect(() => setCheckoutId(Math.random()), [])

  const onWalletConnected = (_address: string) => {
    console.log(`Wallet connected: ${_address}`)
    setAddress(_address)
    setCarouselIndex(2)
  }

  const onStartStripeCheckout = (_amount: BN) => {
    console.log(`Amount specified, stripe chosen: ${_amount}`)
    setAmount(_amount)
    setCarouselIndex(3)
  }

  const onStripeCheckoutDone = (_avTransactionId: string) => {
    console.log(`Stripe checkout done, avTransactionId: ${_avTransactionId}`)
    setAvTransactionId(_avTransactionId)
    setCarouselIndex(4)
  }

  return (
    <div className="dialog PurchaseDialog">
      <div>
        <Carousel currentIndex={carouselIndex}>
          <WalletSlide onWalletConnected={onWalletConnected} />
          <ParamsSlide startStripeChecout={onStartStripeCheckout} />
          { (amount !== null && address !== null && checkoutId != null)
            ? <Elements stripe={stripePromise}>
              <StripeSlide
                checkoutId={checkoutId}
                checkoutDoneHandler={onStripeCheckoutDone}
                io={io}
                stripePromise={stripePromise}
                amount={amount}
                address={address} />
            </Elements>
            : <p>
              Internal error: could not retrieve amount, address or checkoutId
            </p>
          }
          { (avTransactionId !== null)
            ?
            <VerifyTxSlide io={io} avTransactionId={avTransactionId} />
            :
            <p>Could not retrieve transaction ID</p>
          }
        </Carousel>
      </div>
    </div>
  )
}

export default PurchaseDialog
