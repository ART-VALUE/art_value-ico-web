import { useState, FormEvent, FunctionComponent, useEffect } from "react"
import {
  CardElement,
  useElements,
  Elements
} from "@stripe/react-stripe-js"
import { Stripe, StripeCardElementChangeEvent } from "@stripe/stripe-js"
import './StripeSlide.sass'
import { Socket } from "socket.io-client"
import * as purchaseApi from "../../api/purchase"
import BN from "bn.js"
import { StripeInitData } from "../../api/purchase"
import { useQuery } from "react-query"
import styled from "styled-components"
import LoadingRing from "../LoadingRing"


function throwF(throwable: Error): never {
  throw throwable
}

const ErrorP = styled.p`
  color: red;
`

const Button = styled.button`

`

const StripeSlide: FunctionComponent<{
  checkoutId: number,
  checkoutDoneHandler: (avTransactionId: string) => void,
  io: Socket,
  stripePromise: Promise<Stripe | null>,
  amount: BN,
  address: string
}> = ({ checkoutId, checkoutDoneHandler, io, stripePromise, amount, address }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const stripeElements = useElements()!
  const qStripeInitData = useQuery<StripeInitData, string>(
    ['purchase', 'stripeInit', checkoutId],
    () => purchaseApi.create(io, amount, address)
  )
  console.log(qStripeInitData)

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  }

  const handleCardChange = async (e: StripeCardElementChangeEvent) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : null)
  }

  const handleSubmit = async (e: FormEvent) => {
    console.log("Submit")
    e.preventDefault()
    if (qStripeInitData.isLoading || processing || disabled || succeeded) {
      console.log("Preventing submit because loading")
      return
    }

    setProcessing(true)

    console.log("Waiting for stripe init...")
    const { clientSecret, avTxId } = qStripeInitData.data!
    console.log("Stripe init: ", clientSecret, avTxId)
    const stripe = (await stripePromise) ?? throwF(new Error("Could not load Stripe"))
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: stripeElements.getElement(CardElement) ?? throwF(new Error("Could not get Stripe CardElement"))
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      checkoutDoneHandler(avTxId)
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {(!qStripeInitData.isError)
        ? <>
          <CardElement id="card-element" options={cardStyle} onChange={handleCardChange} />
          {qStripeInitData.isLoading || processing
            ? <LoadingRing />
            : <button
              disabled={qStripeInitData.isLoading || processing || disabled || succeeded}>
              <span>Pay now</span>
            </button>
          }
        </>
        : <ErrorP>{qStripeInitData.error}</ErrorP>
      }
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </form>
  )
}

export default StripeSlide
