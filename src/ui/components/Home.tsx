import React, { FunctionComponent, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
import { useCurrentUserDetails } from '../../contexts';
import Wallet from '../../service/eth/Wallet';
import PurchaseSlides from './purchase/PurchaseSlides';
import styled, { useTheme } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './purchase/ErrorFallback';
import { Button, ButtonBig } from '../style/button';
import { modalStyle } from '../style/modal';
import { TextClock } from './TextCountdown';
import { A, H1, H2, P, StrongNumber } from '../style/text';
import { Main, MainWrapper } from '../style/grouping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

const ModalCloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  padding: 1rem;
  color: #fff;
  cursor: pointer;
`

const Home: FunctionComponent<{
  stripePromise: Promise<Stripe>
}> = ({ stripePromise }) => {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const endDate = 1622465999000 // 31/05/21 23:59:59 https://www.epochconverter.com/
  const currentUserDetails = useCurrentUserDetails()
  const theme = useTheme()

  const handlePurchaseTokenClick = () => {
    setPurchaseDialogOpen(true)
  }

  const handleWalletSelected = (wallet: Wallet) => {
    console.info(wallet)
    setPurchaseDialogOpen(false)
  }

  const closeModal = () => {
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
        <P>...days until the presale ends.</P>
      </TextClockContainer>
      <ButtonBig onClick={handlePurchaseTokenClick}>Invest now</ButtonBig>
      <Modal
        style={modalStyle(theme)}
        isOpen={purchaseDialogOpen}
        contentLabel="Coin Purchase Dialog"
        onRequestClose={closeModal}>
        <ModalCloseButton onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </ModalCloseButton>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PurchaseSlides stripePromise={stripePromise} onClose={() => closeModal()} />
        </ErrorBoundary>
      </Modal>
    </Main>
  </MainWrapper>)
}

export default Home
