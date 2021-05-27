import { FunctionComponent, useEffect } from "react";
import { useMutation } from "react-query";
import { useCurrentUserDetails, useIos, useRest } from "../../../contexts";
import { Button } from "../../style/button";
import { P } from "../../style/text";
import GenericError from "../GenericError";
import LoadingRing from "../LoadingRing";
import * as authApi from "../../../service/api/auth";

const LogOut: FunctionComponent = () => {
  const { base: restApiBase } = useRest()
  const { nullCurrentUser } = useCurrentUserDetails()
  const logOutMutation = useMutation(
    () => authApi.logOut(restApiBase)
  )

  useEffect(() => {
    if (logOutMutation.isSuccess) {
      nullCurrentUser()
    }
  }, [logOutMutation.isSuccess])

  if (logOutMutation.isLoading) {
    return <>
      <P>Logging you out...</P>
      <LoadingRing />
    </>
  } else if (logOutMutation.isError) {
    return <>
      <GenericError error={logOutMutation.error}>
        An error occured while logging out
      </GenericError>
      <Button onClick={() => logOutMutation.mutate()}>Try again</Button>
    </>
  } else if (logOutMutation.isSuccess) {
    return <P>Successfully logged out.</P>
  }
  
  return <form onSubmit={e => {
    e.preventDefault()
    logOutMutation.mutate()
  }}>
    <Button type="submit">
      Log out
    </Button>
  </form>
}

export default LogOut
