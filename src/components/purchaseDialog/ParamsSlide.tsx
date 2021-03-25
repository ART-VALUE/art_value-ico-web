import React, { FunctionComponent, useState } from "react"
import "./PurchaseDialog.scss"
import BN from "bn.js"

type ParamsSlideProps = {
    startStripeChecout: (amount: BN) => void
}

const ParamsSlide: FunctionComponent<ParamsSlideProps> = ({
    startStripeChecout
}) => {
    const [amount, setAmount] = useState(new BN("5000"))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting...")
    }

    const onStipeBtnClick = () => {
        startStripeChecout(amount)
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputAmountEur = new BN(e.target.value)
        const inputAmountCents = inputAmountEur.mul(new BN(100))
        setAmount(inputAmountCents)
    }

    return (
        <div>
            <h2 className="dialog__title">Purchase Art_Value Coins:</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Coins
                    <input
                        type="number" placeholder="Amount of coins, > 1" min="1"
                        value={amount.div(new BN(100)).toString(10)} onChange={handleAmountChange}
                    />
                </label>
                <p>Checkout with:</p>
                <button className="payment-btn" type="submit" value="creditcard" onClick={onStipeBtnClick}>
                    <img src={process.env.PUBLIC_URL + '/icon/mastercard.svg'} />
                    <img src={process.env.PUBLIC_URL + '/icon/visa.svg'} />
                    <img src={process.env.PUBLIC_URL + '/icon/americanexpress.svg'} />
                </button>
                <button className="payment-btn" type="submit" value="crypto">
                    <img src={process.env.PUBLIC_URL + '/icon/ethereum.svg'} />
                    <img src={process.env.PUBLIC_URL + '/icon/bitcoin.svg'} />
                </button>
            </form>
        </div>
    )
}

export default ParamsSlide
