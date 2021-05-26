import React, { FunctionComponent, useState } from "react";
import { useCurrentUserDetails } from "../../../contexts";
import Wallet from "../../../service/eth/Wallet";
import { UserDto } from "../../../service/model/User";
import Carousel from "../Carousel";
import LogInUsingSessionSlide from "./LogInUsingSessionSlide";
import SelectWalletSlide from "../wallet/SelectWalletSlide";
import LogInUsingWalletSlide from "./LogInUsingWalletSlide";
import SignUpSlide from "./SignUpSlide";
import { ErrorP } from "../../style/error";
import { P } from "../../style/text";

const LoginSlides: FunctionComponent<{
  onLoggedIn: (user: UserDto) => void
}> = ({ onLoggedIn }) => {
  const { currentUser } = useCurrentUserDetails()
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [chosenWallet, setChosenWallet] = useState<Wallet | null>(null)

  if (currentUser != null) {
    onLoggedIn(currentUser)
    return <P>Logged in as {currentUser.uuid}</P>
  }

  return (<Carousel currentIndex={carouselIndex}>{[
    <LogInUsingSessionSlide
      key={LogInUsingSessionSlide.name}
      onLoggedIn={onLoggedIn}
      onNotLoggedIn={() => setCarouselIndex(old => Math.max(old, 1)) } />,
    <SelectWalletSlide
      key={SelectWalletSlide.name}
      onWalletSelected={wallet => {
        setChosenWallet(wallet)
        setCarouselIndex(old => Math.max(old, 2))
      }}>
      Select an Ethereum wallet to log in
    </SelectWalletSlide>,
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
          onSignedUp={user => {
            console.info('Calling LoginSlides.onLoggedIn because signup done', user)
            onLoggedIn(user)
          }} />
      ]
      : [<ErrorP key={"no-wallet-chosen"}>No wallet chosen</ErrorP>]
    )
  ]}</Carousel>)
}

export default LoginSlides
