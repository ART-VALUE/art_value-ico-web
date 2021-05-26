import React, { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useCurrentUserDetails, useIos } from "../../../contexts";
import { UserDto } from "../../../service/model/User";
import * as authApi from "../../../service/api/auth";
import LoadingRing from "../LoadingRing";
import { isNamedApiException, NamedApiException } from "../../../service/api";
import { errorToString, markErrorProcessed } from "../../../util";
import { ErrorP } from "../../style/error";
import { H2, P } from "../../style/text";
import GenericError from "../GenericError";

const LogInUsingSessionSlide: FunctionComponent<{
  onLoggedIn: (user: UserDto) => void,
  onNotLoggedIn: () => void
}> = ({ onLoggedIn, onNotLoggedIn }) => {
  const [callbackCalled, setCallbackCalled] = useState(false)
  const { setCurrentUser } = useCurrentUserDetails()
  const { auth: authIo } = useIos()
  const qMe = useQuery(
    ['auth', 'me'],
    () => authApi.getMe(authIo),
    {
      retry: (count, error) => {
        markErrorProcessed(error)
        if (isNamedApiException(error, 'NotLoggedInException')) return false
        return count < 3
      },
      enabled: !callbackCalled
    }
  )
  
  useEffect(() => {
    if (!callbackCalled) {      
      if (qMe.isSuccess) {
        const userFromApi = qMe.data!!
        setCallbackCalled(true)
        setCurrentUser(userFromApi)
        onLoggedIn(userFromApi)
      } else if (isNamedApiException(qMe.error, 'NotLoggedInException')) {
        setCallbackCalled(true)
        onNotLoggedIn()
      }
    }
  }, [qMe.isSuccess, qMe.error])

  if (qMe.isLoading) {
    return <>
      <H2>Logging you in...</H2>
      <LoadingRing />
    </>
  } else if (qMe.isError) {
    return <>
      <GenericError error={qMe.error}>
        An error occured while logging you in
      </GenericError>
      <button onClick={() => qMe.refetch()}>Try again</button>
    </>
  } else if (qMe.data == null) {
    return <P>Not logged in</P>
  }

  return <P>Logged in as {qMe.data!!.uuid}</P>
}

export default LogInUsingSessionSlide
