import React, { FunctionComponent } from "react";
import { Button } from "../../style/button";
import { Section } from "../../style/grouping";
import { H2, P, StrongNumber } from "../../style/text";

const InfoSlide: FunctionComponent<{
  onContinue: () => void
}> = ({ onContinue }) => {
  return <>
    <Section>
      <H2>Invest in the Art Value ICO presale</H2>
      <P>
        During the Art Value ICO presale you can make a deposit to secure the <StrongNumber>0.5</StrongNumber> EUR per ARTS private ICO price and a unique <StrongNumber>Art Value Number</StrongNumber> (numerically equal to your invested amount).
      </P>
      <P>
        The deposit is <StrongNumber>20%</StrongNumber> of your total private ICO investment.
      </P>
      <P>
        For example, by investing €200 in the private ICO, you will be charged €40 now and you will need to pay the remaining €160 during the private ICO.
        After paying this remaining amount you will receive the 400 ARTS (for this example) and your unique Art Value Number.
      </P>
    </Section>
    <Button onClick={() => onContinue()}>Continue</Button>
  </>
}

export default InfoSlide
