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
import { H2, P } from "../../style/text";
import GenericError from "../GenericError";

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

  if (signUpMutation.isLoading) {
    return <>
      <H2>Signing you up...</H2>
      <LoadingRing />
    </>
  } else if (signUpMutation.isError) {
    return <>
      <GenericError error={signUpMutation.error}>
        An error occured while signing you up
      </GenericError>
      {email != null
        ? <button onClick={() => signUpMutation.mutateAsync(email)}>Try again</button>
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
}

export default SignUpSlide
