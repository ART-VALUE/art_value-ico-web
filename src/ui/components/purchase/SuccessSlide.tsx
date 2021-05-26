import React, { FunctionComponent } from "react";
import { weiToEtherStr } from "../../../service/eth/util";
import Deposit from "../../../service/model/Deposit";
import { fractionlessToString } from "../../../service/number";
import { Button } from "../../style/button";
import { A, H2, P } from "../../style/text";
import ErrorContactInfo from "../ErrorContactInfo";

const SuccessSlide: FunctionComponent<{
  deposit: Deposit,
  onClose: () => void
}> = ({ deposit, onClose }) => {
  return <>
    <H2>Congratulations!</H2>
    <P>
      The {weiToEtherStr(deposit.priceEther)} Ether deposit for your €{fractionlessToString(deposit.amount)} investment was successful.
    </P>
    <P>
      You will receive an email from us confirming the deposit.
    </P>
    <P>
      Do not hesitate to <A href="mailto:info@artvalue.org">contact us</A> at if you have any other questions.
    </P>

    <Button onClick={() => onClose()}>Continue</Button>
  </>
}

export default SuccessSlide
