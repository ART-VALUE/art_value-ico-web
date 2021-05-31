import { FunctionComponent } from "react";
import { useCurrentUserDetails } from "../../../contexts";
import { ErrorP } from "../../style/error";
import { MonoData, P, SpanItalic } from "../../style/text";

const CurrentUserInfo: FunctionComponent<{}> = () => {
  const { currentUser } = useCurrentUserDetails()

  if (currentUser != null) {
    return <>
      <P>
        Email address: <MonoData>{currentUser.email}</MonoData><br/>
        <SpanItalic>We only use your email address to send transactional emails.</SpanItalic>
      </P>
      <P>
        Ethereum address: <MonoData>{currentUser.ethAddress}</MonoData><br/>
        All investment rewards for the ICO will be sent to this address.
      </P>
    </>
  }

  return <ErrorP>You need to be logged in to view your user info.</ErrorP>
}

export default CurrentUserInfo
