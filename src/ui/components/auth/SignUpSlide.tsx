import React, { FunctionComponent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useCurrentUserDetails, useIos } from "../../../contexts";
import { UserDto } from "../../../service/model/User";
import * as authApi from "../../../service/api/auth";
import LoadingRing from "../LoadingRing";
import Wallet from "../../../service/eth/Wallet";
import Web3 from "web3";
import SignupForm from "./SignupForm";
import { ErrorP } from "../../style/error";
import { H2, P, SpanItalic } from "../../style/text";
import GenericError from "../GenericError";
import { Button } from "../../style/button";

const SignUpSlide: FunctionComponent<{
  wallet: Wallet,
  onSignedUp: (user: UserDto) => void
}> = ({ wallet, onSignedUp }) => {
  const { setCurrentUser } = useCurrentUserDetails()
  const { auth: authIo } = useIos()
  const web3 = new Web3(wallet.provider)
  const [email, setEmail] = useState<string | null>(null)
  const signUpMutation = useMutation(
    (email: string) => authApi.signUp(authIo, web3, wallet, email)
  )
  
  useEffect(() => {
    if (signUpMutation.isSuccess) {
      const userFromApi = signUpMutation.data!!
      setCurrentUser(userFromApi)
      onSignedUp(userFromApi)
    }
  }, [signUpMutation])

  return <>
    <H2>Sign up</H2>
    <P>
      Your Ethereum wallet isn't connected to an Art Value account yet.
      Enter your email address to create an account.
    </P>
    <P>
      All future assets (like ARTS or Number NFT's) will
      be send to this wallet's address ({wallet.address}).
    </P>
    {(() => {
      if (signUpMutation.isLoading) {
        return <>
          <P>Signing you up...</P>
          <P><SpanItalic>
            Your crypto wallet may ask for your permission. If so, accept the prompt.
          </SpanItalic></P>
          <LoadingRing />
        </>
      } else if (signUpMutation.isError) {
        return <>
          <GenericError error={signUpMutation.error}>
            An error occured while signing you up
          </GenericError>
          {email != null
            ? <Button onClick={() => signUpMutation.mutateAsync(email)}>Try again</Button>
            : <></>
          }
        </>
      } else if (signUpMutation.isSuccess) {
        return <P>Logged in as {signUpMutation.data!!.uuid}</P>
      }
      
      return <SignupForm onFormComplete={email => {
        setEmail(email)
        signUpMutation.mutateAsync(email)
      }} />
    })()}
  </>
}

export default SignUpSlide
