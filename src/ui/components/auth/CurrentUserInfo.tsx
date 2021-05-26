import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import styled, { useTheme } from "styled-components";
import { useCurrentUserDetails } from "../../../contexts";
import { Button } from "../../style/button";
import { MonoData, P, SpanItalic } from "../../style/text";

const CurrentUserInfo: FunctionComponent<{}> = () => {
  const { currentUser, launchLoginModal } = useCurrentUserDetails()
  const theme = useTheme()

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

  return <>
    <P>You need to be logged in to view your user info.</P>
    <Button onClick={() => launchLoginModal()}>Log in</Button>
  </>
}

export default CurrentUserInfo
