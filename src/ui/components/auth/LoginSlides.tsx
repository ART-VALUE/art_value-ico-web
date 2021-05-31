import React, { FunctionComponent, useEffect, useState } from "react";
import { useCurrentUserDetails } from "../../../contexts";
import Wallet from "../../../service/eth/Wallet";
import { UserDto } from "../../../service/model/User";
import Carousel from "../Carousel";
import LogInUsingSessionSlide from "./LogInUsingSessionSlide";
import SelectWallet from "../wallet/SelectWalletSlide";
import LogInUsingWalletSlide from "./LogInUsingWalletSlide";
import SignUpSlide from "./SignUpSlide";
import { ErrorP } from "../../style/error";
import { H2, P } from "../../style/text";

const LoginSlides: FunctionComponent<{
  onLoggedIn: (user: UserDto) => void
}> = ({ onLoggedIn }) => {
  const { currentUser } = useCurrentUserDetails()
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [chosenWallet, setChosenWallet] = useState<Wallet | null>(null)
  const [callbackCalled, setCallbackCalled] = useState(false)

  useEffect(() => {
    if (!callbackCalled && currentUser != null) {
      setCallbackCalled(true)
      onLoggedIn(currentUser)
    }
  }, [currentUser])

  if (currentUser != null) {
    return <P>Logged in as {currentUser.uuid}</P>
  }

  return (<Carousel currentIndex={carouselIndex}>{[
    <LogInUsingSessionSlide
      key={LogInUsingSessionSlide.name}
      onLoggedIn={() => {}}
      onNotLoggedIn={() => setCarouselIndex(old => Math.max(old, 1)) } />,
    <div key="select-wallet">
      <H2>Select an Ethereum wallet to log in</H2>
      <P>All tokens will be sent to this wallet.</P>
      <SelectWallet
        onWalletSelected={wallet => {
          setChosenWallet(wallet)
          setCarouselIndex(old => Math.max(old, 2))
        }} />
    </div>,
    ...(chosenWallet != null
      ? [
        <LogInUsingWalletSlide
          key={LogInUsingWalletSlide.name}
          wallet={chosenWallet}
          onLoggedIn={onLoggedIn}
          onNoSuchUser={() => setCarouselIndex(old => Math.max(old, 3))} />,
        <SignUpSlide
          key={SignUpSlide.name}
          wallet={chosenWallet}
          onSignedUp={user => onLoggedIn(user)} />
      ]
      : [<ErrorP key={"no-wallet-chosen"}>No wallet chosen</ErrorP>]
    )
  ]}</Carousel>)
}

export default LoginSlides
