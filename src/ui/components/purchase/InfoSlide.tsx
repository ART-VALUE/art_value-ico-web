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
        During the Art Value ICO presale you can make a deposit to secure 
        the <StrongNumber>0.5</StrongNumber> Euro per ARTS private ICO price 
        (1 Euro per ARTS during the public ICO) and the unique <StrongNumber>Art 
        Value Number NFT</StrongNumber> equal to your invested amount.
      </P>
      <P>
        The deposit is <StrongNumber>20%</StrongNumber> of your total private ICO investment.
      </P>
      <P>
        For example, by investing €200 in the private ICO, you will be charged 
        €40 now and you will need to pay the remaining €160 during the private 
        ICO (in a week or so). After paying this remaining amount you will 
        receive 400 ARTS and the unique '200' Art Value 
        Number NFT.
      </P>
    </Section>
    <Button onClick={() => onContinue()}>Continue</Button>
  </>
}

export default InfoSlide
