import React, { Children, FunctionComponent, useState } from "react"
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
    paymentApiIo: Socket
}> = ({ stripePromise, paymentApiIo }) => {
    const [amount, setAmount] = useState<BN | null>(null)
    const [address, setAddress] = useState<string | null>(null)
    const [avTransactionId, setAvTransactionId] = useState<string | null>(null)
    const [carouselIndex, setCarouselIndex] = useState<number>(1)

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

    console.log(StripeSlide)

    return (
        <div className="dialog PurchaseDialog">
            <div>
                <Carousel currentIndex={carouselIndex}>
                    <WalletSlide onWalletConnected={onWalletConnected} />
                    <ParamsSlide startStripeChecout={onStartStripeCheckout} />
                    { (amount !== null && address !== null)
                        ?
                        <Elements stripe={stripePromise}>
                            <StripeSlide
                                checkoutDoneHandler={onStripeCheckoutDone}
                                paymentApiIo={paymentApiIo}
                                stripePromise={stripePromise}
                                amount={amount}
                                address={address} />
                        </Elements>
                        :
                        <p>Could not retrieve amount or address</p>
                    }
                    { (avTransactionId !== null)
                        ?
                        <VerifyTxSlide paymentApiIo={paymentApiIo} avTransactionId={avTransactionId} />
                        :
                        <p>Could not retrieve transaction ID</p>
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default PurchaseDialog
