import React, { FunctionComponent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useCurrentUserDetails, useIos } from "../../../contexts";
import { UserDto } from "../../../service/model/User";
import * as authApi from "../../../service/api/auth";
import LoadingRing from "../LoadingRing";
import Wallet from "../../../service/eth/Wallet";
import Web3 from "web3";
import { isNamedApiException } from "../../../service/api";
import { markErrorProcessed } from "../../../util";
import { ErrorP } from "../../style/error";
import { H2, P } from "../../style/text";
import { Button } from "../../style/button";
import GenericError from "../GenericError";

const LogInUsingWalletSlide: FunctionComponent<{
  wallet: Wallet,
  onLoggedIn: (user: UserDto) => void,
  onNoSuchUser: () => void
}> = ({ wallet, onLoggedIn, onNoSuchUser }) => {
  const { setCurrentUser } = useCurrentUserDetails()
  const { auth: authIo } = useIos()
  const web3 = new Web3(wallet.provider)
  const qAuthenticateMutation = useMutation(
    ['auth', authApi.authenticateThroughWeb3.name, wallet.providerType, wallet.address],
    () => authApi.authenticateThroughWeb3(authIo, web3, wallet.address),
    {
      retry: (count, error) => {
        markErrorProcessed(error)
        if (error instanceof authApi.SigningDeniedException) return false
        if (isNamedApiException(error, 'NotFoundException')) return false
        return count < 3
      },
    }
  )
  
  useEffect(() => {
    if (qAuthenticateMutation.isSuccess) {
      const userFromApi = qAuthenticateMutation.data!!
      setCurrentUser(userFromApi)
      onLoggedIn(userFromApi)
    } else if (isNamedApiException(qAuthenticateMutation.error, 'NotFoundException')) {
      onNoSuchUser()
    }
  }, [qAuthenticateMutation.isSuccess, qAuthenticateMutation.error])

  return <>
    <H2>Sign the authentication code to log in</H2>
    <P>
      By signing the authentication code make sure you control 
      this crypto wallet. This way we know any tokens you purchase will 
      be sent to the right wallet.
    </P>
    {(() => {
      if (qAuthenticateMutation.isLoading) {
        return <>
          <P>Signing authentication code...</P>
          <P>
            Your crypto wallet may ask for you permission.<br/>
            If so, accept the prompt to continue.
          </P>
          <LoadingRing />
        </>
      } else if (qAuthenticateMutation.isError) {
        return <>
          <GenericError error={qAuthenticateMutation.error}>
            An error occured while trying to log in using your wallet
          </GenericError>
          <button onClick={() => qAuthenticateMutation.mutate()}>Try again</button>
        </>
      } else if (qAuthenticateMutation.isSuccess) {
        return <P>
          Logged in as {qAuthenticateMutation.data!!.uuid}
        </P>
      }
    
      return <>
        <P>
          Sign the Art Value authentication code to log in using your 
          Ethereum wallet.
        </P>
        <Button onClick={() => qAuthenticateMutation.mutate()}>Sign</Button>
      </>
    })()}
  </>
}

export default LogInUsingWalletSlide
