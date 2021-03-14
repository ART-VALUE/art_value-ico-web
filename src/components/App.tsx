import './App.sass'
import FlipClock from './Flipclock'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

console.log("Loading stripe...")
const stripePromise = loadStripe("pk_test_51ITna8JcDKL67QxNOgLJSMRVqFGagqi7pcHXCtewhqPyxqsWt5QrIWLeCoWXTZlZIi2gOhNSh3JE4M6Rr40VFhSJ00cmqxUD2d");
console.log("Stripe loaded!", stripePromise)


export default function App() {
  const endDate = new Date(1615809936000).getMilliseconds()

  return (
    <div className="App">
      <header className="App-header">
        <a href="#">Linkielink</a>
        <a href="#">Linkielink2</a>
      </header>

      <div className="ClockCont">
        <FlipClock date={endDate} />
        <a className="purchase-token">Purchase Art_Value token</a>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
}
