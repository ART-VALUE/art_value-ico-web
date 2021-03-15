import './App.scss'
import FlipClock from './Flipclock'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import Modal from 'react-modal'
import PurchaseDialog from './PurchaseDialog'
import { useState } from 'react'

console.log("Loading stripe...")
const stripePromise = loadStripe("pk_test_51ITna8JcDKL67QxNOgLJSMRVqFGagqi7pcHXCtewhqPyxqsWt5QrIWLeCoWXTZlZIi2gOhNSh3JE4M6Rr40VFhSJ00cmqxUD2d");
console.log("Stripe loaded!", stripePromise)

Modal.setAppElement("#root")

export default function App() {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const endDate = new Date(1615809936000).getMilliseconds()

  const handlePurchaseTokenClick = () => {
    setPurchaseDialogOpen(true)
  }

  return (
    <div className="App">
      <Modal
        isOpen={purchaseDialogOpen}
        className="PurchaseDialogModal"
        overlayClassName="PurchaseDialogModalOverlay"
        contentLabel="Coin Purchase Dialog"
        shouldCloseOnOverlayClick={true}>
        <PurchaseDialog />
      </Modal>

      <header className="App-header">
        <a href="#">Linkielink</a>
        <a href="#">Linkielink2</a>
      </header>

      <div className="ClockCont">
        <FlipClock date={endDate} />
        <button className="purchase-token" onClick={handlePurchaseTokenClick}>Purchase Art_Value token</button>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
}
