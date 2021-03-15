import { FunctionComponent } from "react"
import "./PurchaseDialog.scss"
import "../style/form.scss"

type PurchaseDialogProps = {

}

const PurchaseDialog: FunctionComponent<PurchaseDialogProps> = ({}) => {
    // const [tMinusParts, setTMinusParts] = useState(deltaPartsWithChange(
    //     deltaToParts(Infinity),
    //     deltaToParts(tMinusFromNow(date))
    // ))

    // useEffect(() => {
    //     const interval = window.setInterval(() => {
    //         const newState = deltaPartsWithChange(
    //             tMinusParts.new,
    //             deltaToParts(tMinusFromNow(date))
    //         )
    //         setTMinusParts(newState)
    //     }, 70)

    //     return () => {
    //         window.clearInterval(interval)
    //     }
    // })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submittinhg...")
    }

    return (
        <div className="dialog">
            <h2 className="dialog__title">Purchase Art_Value Coins:</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Coins
                    <input type="number" placeholder="Amount of coins, > 1" min="1" />
                </label>
                <p>Checkout with:</p>
                <button className="payment-btn" type="submit" value="creditcard">
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

export default PurchaseDialog
