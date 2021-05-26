import React, { FunctionComponent, useRef, useState } from "react"
import BN from "bn.js"
import { Input, Label } from "../../style/form"
import { H2, Pre, P, MonoData, SpanItalic } from "../../style/text"
import styled from "styled-components"
import { AMOUNT_TO_FRACTIONLESS_FACTOR, browserDecimalSeparator, fractionlessToString, fractionlessNumberFromString, NumberFormatException } from "../../../service/number"
import { ErrorP } from "../../style/error"

const CENT = new BN('100')
const DEPOSIT_PERCENTAGE = new BN('20')
const MINIMUM_ARTS_AMOUNT = new BN('20000')

const PaymentButton = styled.button`
  width: 5rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  > img {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`

const ParamsSlide: FunctionComponent<{
  onEtherCheckout: (amount: BN) => void
}> = ({ onEtherCheckout }) => {
  const form = useRef<HTMLFormElement>(null)
  const [amountError, setAmountError] = useState<string | null>(null)
  const [amount, setAmount] = useState<null | BN>(null)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmountString = e.target.value
    let newAmount
    try {
      newAmount = fractionlessNumberFromString(newAmountString)
    } catch (error) {
      if (error instanceof NumberFormatException) {
        setAmountError(error.message)
        return
      } else throw error
    }
    setAmountError(null)
    if (newAmount == null) return
    if (newAmount.lt(MINIMUM_ARTS_AMOUNT)) {
      setAmountError('Amount is too small')
      return
    }
    setAmount(newAmount)
  }

  const handleEthereumCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (form.current?.checkValidity() !== true) return
    if (amount == null) {
      setAmountError('Please specify an amount')
      return
    }
    onEtherCheckout(amount)
  }

  const minimumAmountStr = fractionlessToString(MINIMUM_ARTS_AMOUNT)
  const amountChargedNow = amount == null ? null : amount.mul(DEPOSIT_PERCENTAGE).div(CENT)
  const amountChargedDuringPrivate = amountChargedNow == null || amount == null ? null : amount.sub(amountChargedNow)

  return (<>
    <H2>Select investment amount</H2>
    <form onSubmit={e => e.preventDefault()} ref={form}>
      <Label>
        Private ICO investment (EUR, {minimumAmountStr} minimum, you will be charged {DEPOSIT_PERCENTAGE.toString(10)}% of this amount now)
        <Input
          type="number" step="0.01" placeholder={minimumAmountStr} min={minimumAmountStr}
          onChange={handleAmountChange}
        />
      </Label>
      {amountError != null ? <ErrorP>{amountError}</ErrorP> : <></>}
      <P>
        Amount charged now (EUR, excluding transaction fees):{' '}
        <MonoData>{amountChargedNow == null ? '?' : fractionlessToString(amountChargedNow)}</MonoData><br/>
        Amount charged during private ICO:{' '}
        <MonoData>{amountChargedDuringPrivate == null ? '?' : fractionlessToString(amountChargedDuringPrivate)}</MonoData>
      </P>
      <P>Checkout with:</P>
      {/* <button className="payment-btn" type="submit" value="creditcard" onClick={onStipeBtnClick}>
        <img src={process.env.PUBLIC_URL + '/icon/mastercard.svg'} alt="mastercard"/>
        <img src={process.env.PUBLIC_URL + '/icon/visa.svg'} alt="visa"/>
        <img src={process.env.PUBLIC_URL + '/icon/americanexpress.svg'} alt="americanexpress"/>
      </button> */}
      <PaymentButton type="submit" onClick={handleEthereumCheckout}>
        <img src={process.env.PUBLIC_URL + '/icon/ethereum.svg'} alt="etherum"/>
        {/* <img src={process.env.PUBLIC_URL + '/icon/bitcoin.svg'} alt="bitcoin"/> */}
      </PaymentButton>
      <P><SpanItalic>During this stage of the ICO only payment via Ethereum is available.</SpanItalic></P>
      <P><SpanItalic>Your browser uses '{browserDecimalSeparator}' as a decimal seperator. We will try to use that choice wherever possible.</SpanItalic></P>
    </form>
  </>)
}

export default ParamsSlide
