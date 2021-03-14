import React, { useState, useEffect, FormEvent } from "react"
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import { StripeCardElementChangeEvent } from "@stripe/stripe-js"
import './CheckoutForm.sass'
import { io } from "socket.io-client"


function throwF(throwable: Error): never {
    throw throwable
}

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()!
  const stripeElements = useElements()!


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const socket = io("http://localhost:3000")
    console.log("Sending intent req")
    socket.emit("/payment/create-intent", (msg: any) => {
      console.log("Got response: ", msg)
    });
    
    // window
    //   .fetch("http://localhost:3000/create-payment-intent", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
    //   })
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(data => {
    //     setClientSecret(data.clientSecret)
    //   })
  }, [])

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
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty)
    setError(e.error ? e.error.message : null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    console.log("stripe", stripe)
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
