import './App.scss'
import FlipClock from './Flipclock'
import { loadStripe } from "@stripe/stripe-js"
import Modal from 'react-modal'
import PurchaseDialog from './purchaseDialog/PurchaseDialog'
import { useState } from 'react'
import { io } from 'socket.io-client'
import { PAYMENT_NS } from '../api'

const stripePromise = loadStripe("pk_test_51ITna8JcDKL67QxNOgLJSMRVqFGagqi7pcHXCtewhqPyxqsWt5QrIWLeCoWXTZlZIi2gOhNSh3JE4M6Rr40VFhSJ00cmqxUD2d");
const paymentApiIo = io(`http://localhost:3000/${PAYMENT_NS}`)

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
        <PurchaseDialog
          stripePromise={stripePromise}
          paymentApiIo={paymentApiIo} />
      </Modal>

      <header className="App-header">
        <a href="#">Linkielink</a>
        <a href="#">Linkielink2</a>
      </header>

      <div className="ClockCont">
        <FlipClock date={endDate} />
        <button className="purchase-token" onClick={handlePurchaseTokenClick}>Purchase Art_Value token</button>
      </div>
    </div>
  )
}
