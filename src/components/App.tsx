import './App.scss'
import FlipClock from './Flipclock'
import { loadStripe } from "@stripe/stripe-js"
import Modal from 'react-modal'
import PurchaseDialog from './purchaseDialog/PurchaseDialog'
import { useState } from 'react'
import { io } from 'socket.io-client'
import { PAYMENT_NS } from '../api'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import PreIco from './PreIco'
import { ThemeProvider } from 'styled-components'
import { darken, lighten } from "polished";
import Ico from './Ico'

const stripePromise = loadStripe("pk_test_51ITna8JcDKL67QxNOgLJSMRVqFGagqi7pcHXCtewhqPyxqsWt5QrIWLeCoWXTZlZIi2gOhNSh3JE4M6Rr40VFhSJ00cmqxUD2d");
const paymentApiIo = io(`http://localhost:3000/${PAYMENT_NS}`)

Modal.setAppElement("#root")

const colorBackground = "#0a0a0a"

const theme = {
  color: {
    background: colorBackground,
    surface: lighten(0.2, colorBackground),
    border: lighten(0.4, colorBackground),
    text: darken(0.1, "#fff")
  },
  font: {
    text: "Avenir95Light",
    title: "Avenir95Black"
  }
}

export default function App() {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const endDate = new Date(1615809936000).getMilliseconds()

  const handlePurchaseTokenClick = () => {
    setPurchaseDialogOpen(true)
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
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
            {/* <Link to="/"></Link> */}
            <a href="#">Linkielink</a>
            <a href="#">Linkielink2</a>
          </header>

          <Switch>
            <Route path="/">
              <Ico />
            </Route>
          </Switch>

          {/* <div className="ClockCont">
            <button className="purchase-token" onClick={handlePurchaseTokenClick}>Purchase Art_Value token</button>
          </div> */}
        </Router>
      </ThemeProvider>
    </div>
  )
}
