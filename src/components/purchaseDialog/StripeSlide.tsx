import { useState, FormEvent, FunctionComponent } from "react"
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


function throwF(throwable: Error): never {
    throw throwable
}

const StripeSlide: FunctionComponent<{
  checkoutDoneHandler: (avTransactionId: string) => void,
  paymentApiIo: Socket,
  stripePromise: Promise<Stripe | null>,
  amount: BN,
  address: string
}> = ({ checkoutDoneHandler, paymentApiIo, stripePromise, amount, address }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const stripeElements = useElements()!

  // Start fetching client secret now, await in submitHandler
  const stripeInitResPromise = purchaseApi.stripeInit(paymentApiIo, amount, address)

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
    setProcessing(true)

    console.log("Waiting for stripe init...")
    const { clientSecret, avTxId } = await stripeInitResPromise
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
      <CardElement id="card-element" options={cardStyle} onChange={handleCardChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  )
}

export default StripeSlide
