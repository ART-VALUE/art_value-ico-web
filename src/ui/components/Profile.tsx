import React from "react"
import { FunctionComponent } from "react"
import styled from "styled-components"
import { useCurrentUserDetails } from "../../contexts"
import { Button } from "../style/button"
import { MainWrapper, Main, Section } from "../style/grouping"
import { H1, H2, P } from "../style/text"
import CurrentUserInfo from "./auth/CurrentUserInfo"
import LogOut from "./auth/LogOut"
import DepositsTable from "./DepositsTable"

const LogoutSection = styled(Section)`
  margin-top: 5rem;
`

const Profile: FunctionComponent<{}> = () => {
  const { currentUser, loginByModal } = useCurrentUserDetails()

  return <MainWrapper>
    <Main>
      <H1>My profile</H1>
      {currentUser != null
        ? <>
          <Section>
            <H2>Details</H2>
            <CurrentUserInfo />
          </Section>
          <Section>
            <H2>Deposits</H2>
            <DepositsTable />
          </Section>
          <LogoutSection>
            <LogOut />
          </LogoutSection>
        </>
        : <>
          <P>You need to be logged in to view your profile.</P>
          <Button onClick={() => loginByModal()}>Log in</Button>
        </>
      }
    </Main>
  </MainWrapper>
}

export default Profile
