import React, { FunctionComponent, useState } from "react"
import "./WalletSlide.scss"
import { getAccounts } from "../../portis"
import LoadingRing from "../LoadingRing"

type PurchaseDialogProps = {
    onWalletConnected: (address: string) => void
}

const PurchaseDialog: FunctionComponent<PurchaseDialogProps> = ({
    onWalletConnected
}) => {
    const [loadingAccounts, setLoadingAccounts] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(e)
    }

    const portisOnClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        setLoadingAccounts(true)
        const accounts = await getAccounts()
        onWalletConnected(accounts[0])
    }

    return (
        <div>
            <h2 className="dialog__title">Connect Ethereum wallet:</h2>
            { loadingAccounts
                ?
                <div className="WalletSlide__loading-accounts">
                    <p className="WalletSlide__loading-txt">Loading wallet accounts...</p>
                    <div className="WalletSlide__ring-cont">
                        <LoadingRing />
                    </div>
                </div>
                :
                <form className="form" onSubmit={handleSubmit}>
                    <button type="submit" value="portis" onClick={portisOnClick}>
                        Portis
                    </button>
                    <button type="submit" value="crypto">
                        Metamask
                    </button>
                </form>
            }
        </div>
    )
}

export default PurchaseDialog
