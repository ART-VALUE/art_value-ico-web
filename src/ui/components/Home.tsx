import { FunctionComponent, useState } from 'react';
import { Stripe } from '@stripe/stripe-js';
import PurchaseSlides from './purchase/PurchaseSlides';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './purchase/ErrorFallback';
import { ButtonBig } from '../style/button';
import { TextClock } from './TextCountdown';
import { A, H1, P, StrongNumber } from '../style/text';
import { Main, MainWrapper } from '../style/grouping';
import AvModal from './AvModal';

const HomeH1 = styled(H1)`
  margin-top: 5rem;
  font-size: 30pt;
  > strong {
    display: block;
    font-size: 60pt;
  }
`

const TextClockContainer = styled.div`
  margin-bottom: 5rem;
`

const Home: FunctionComponent<{
  stripePromise: Promise<Stripe>
}> = ({ stripePromise }) => {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const endDate = 1623275999000 // 9/6/21 23:59:59 CEST https://www.epochconverter.com/

  const handlePurchaseTokenClick = () => {
    setPurchaseDialogOpen(true)
  }

  const closeModal = (success: boolean) => {
    if (!success) {
      const confirmation = window.confirm(
        'Are you sure you want to cancel your deposit?'
        + ' If your payment is currently being submitted to the network you might'
        + ' lose your deposit. Please contact us at info@artvalue.org if you'
        + ' experienced any problems or have any questions. \n'
        + 'Click OK if you\'re sure you want to cancel your deposit.'
      )
      if (!confirmation) return
    }
    setPurchaseDialogOpen(false)
  }

  return (<MainWrapper>
    <Main>
      <HomeH1>
        <strong>Art Value ICO</strong>
        The Art Value ICO presale is now open!
      </HomeH1>
      <P>
        Invest now to secure the <StrongNumber>2X</StrongNumber> ARTS per Euro price during the private ICO.
      </P>
      <P>
        By investing now you will also receive a unique Art Value Number equal to your invested amount.{' '}
        <A href="https://artvalue.org/ico/">Learn more</A>
      </P>
      <TextClockContainer>
        <TextClock date={endDate} />
        <P>...until the presale ends.</P>
      </TextClockContainer>
      <ButtonBig onClick={handlePurchaseTokenClick}>Invest now</ButtonBig>
      <AvModal
        isOpen={purchaseDialogOpen}
        onClose={() => closeModal(false)}
        contentLabel="Coin Purchase Dialog">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PurchaseSlides stripePromise={stripePromise} onClose={success => closeModal(success)} />
        </ErrorBoundary>
      </AvModal>
    </Main>
  </MainWrapper>)
}

export default Home
