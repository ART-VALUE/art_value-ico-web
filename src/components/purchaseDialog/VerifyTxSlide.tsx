import { FunctionComponent, useState } from "react"
import { Socket } from "socket.io-client"
import * as purchaseApi from "../../api/purchase"
import LoadingRing from "../LoadingRing"
import "./VerifyTxSlide.scss"

const VerifyTxSlide: FunctionComponent<{
  io: Socket,
  avTransactionId: string
}> = ({ io, avTransactionId }) => {
  const [processing, setProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mintTx, setMintTx] = useState<string | null>(null)

  purchaseApi.verifyTx(io, avTransactionId)
    .then(({ mintTx: _mintTx }) => {
      setMintTx(_mintTx)
      setProcessing(false)
    })
    .catch((_error) => {
      setProcessing(false)
      setError(_error)
    })

  return (
    <div className="VerifyTxSlide">{processing
      ? <div className="VerifyTxSlide__verifying">
        <p className="VerifyTxSlide__verifying-txt">
          Verifying payment...
        </p>
        <div className="VerifyTxSlide__ring-cont">
          <LoadingRing />
        </div>
      </div>
      : <div>{error
        ? <div>
          <p className="VerifyTxSlide__error-label">
            There was a problem verifying your payment:
          </p>
          <p className="VerifyTxSlide__error-msg">
            {error}
          </p>
        </div>
        : <div>
          <p className="VerifyTxSlide__success">
            Your payment was successfully verified.
            ... Art_Value Coin (AVC) has been transferred to your account
          </p>
          <p className="VerifyTxSlide__extra">
            Ethereum transaction hash:
            {mintTx}
          </p>
        </div>
      }</div>
    }</div>
  )
}

export default VerifyTxSlide
