import React, { FunctionComponent, useRef, useState } from "react"
import BN from "bn.js"
import { Input, Label } from "../../style/form"
import { H2, Pre, P, MonoData, SpanItalic } from "../../style/text"
import styled from "styled-components"
import { browserDecimalSeparator, fractionlessToString, fractionlessNumberFromString } from "../../../service/number"
import { ErrorP } from "../../style/error"
import { NumberFormatException } from "../../../service/number/exceptions"
import { ImageButton } from "../../style/button"

const CENT = new BN('100')
const DEPOSIT_PERCENTAGE = new BN('20')
const MINIMUM_ARTS_AMOUNT = new BN('20000')

const ParamsSlide: FunctionComponent<{
  onEtherCheckout: (amount: BN) => void
}> = ({ onEtherCheckout }) => {
  const form = useRef<HTMLFormElement>(null)
  const [amountError, setAmountError] = useState<string | null>(null)
  const [amount, setAmount] = useState<null | BN>(null)
  const [amountText, setAmountText] = useState('')

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmountString = e.target.value
    let parseResult
    try {
      parseResult = fractionlessNumberFromString(newAmountString)
    } catch (error) {
      if (error instanceof NumberFormatException) {
        setAmountError(error.message)
        setAmountText(newAmountString)
        return
      } else throw error
    }
    if (parseResult === null) {
      setAmountError(null)
      setAmountText('')
      setAmount(null)
      return
    }
    const { number: newAmount, withDecimalSeparator } = parseResult
    if (newAmount == null) return
    if (newAmount.lt(MINIMUM_ARTS_AMOUNT)) {
      setAmountError('Amount is too small')
      setAmountText(withDecimalSeparator)
      return
    }
    setAmountError(null)
    setAmount(newAmount)
    setAmountText(withDecimalSeparator)
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
    <P>
      Please enter the exact whole number or two-decimal digit 
      fractional number (482, 787.00, 300.25, 222.44, 420.5 ...)
      you want to receive during the private ICO as a unique
      Art Value NFT Number (along with 2X this amount in ARTS).
      You will be charged {DEPOSIT_PERCENTAGE.toString(10)}% 
      of this amount now as the presale deposit.
      It is possible the number you enter is already reserved
      by someone else. If so, you'll be given the option to choose
      an alternative.
    </P>
    <form onSubmit={e => e.preventDefault()} ref={form}>
      <Label>
        Private ICO investment (EUR, {minimumAmountStr} minimum)
        <Input
          type="text" placeholder={minimumAmountStr}
          onChange={handleAmountChange}
          value={amountText} />
      </Label>
      {amountError != null ? <ErrorP>{amountError}</ErrorP> : <></>}
      <P>
        Amount charged now:{' '}
        <MonoData>{amountChargedNow == null ? '?' : fractionlessToString(amountChargedNow)}</MonoData><br/>
        Amount charged during private ICO:{' '}
        <MonoData>{amountChargedDuringPrivate == null ? '?' : fractionlessToString(amountChargedDuringPrivate)}</MonoData><br />
      </P>
      <P>Checkout with:</P>
      {/* <button className="payment-btn" type="submit" value="creditcard" onClick={onStipeBtnClick}>
        <img src={process.env.PUBLIC_URL + '/icon/mastercard.svg'} alt="mastercard"/>
        <img src={process.env.PUBLIC_URL + '/icon/visa.svg'} alt="visa"/>
        <img src={process.env.PUBLIC_URL + '/icon/americanexpress.svg'} alt="americanexpress"/>
      </button> */}
      <ImageButton
        type="submit"
        onClick={handleEthereumCheckout}
        style={{backgroundColor: '#D3DAF9'}}>
        <img src={process.env.PUBLIC_URL + '/icon/ethereum.svg'} alt="etherum"/>
        {/* <img src={process.env.PUBLIC_URL + '/icon/bitcoin.svg'} alt="bitcoin"/> */}
      </ImageButton>
      <P><SpanItalic>During this stage of the ICO only payment via Ethereum is available.</SpanItalic></P>
      <P><SpanItalic>Your browser uses '{browserDecimalSeparator}' as a decimal separator. We therefore use it in the input field above and to display numbers.</SpanItalic></P>
      <P><SpanItalic>All values above are given in Euro and exclude gas fees.</SpanItalic></P>
    </form>
  </>)
}

export default ParamsSlide
