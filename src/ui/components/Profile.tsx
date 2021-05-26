import React from "react"
import { FunctionComponent } from "react"
import { MainWrapper, Main, Section } from "../style/grouping"
import { H1, H2 } from "../style/text"
import CurrentUserInfo from "./auth/CurrentUserInfo"
import DepositsTable from "./DepositsTable"

const Profile: FunctionComponent<{}> = () => {
  return (<MainWrapper>
    <Main>
      <H1>My profile</H1>
      <Section>
        <H2>Details</H2>
        <CurrentUserInfo />
      </Section>
      <Section>
        <H2>Deposits</H2>
        <DepositsTable />
      </Section>
    </Main>
  </MainWrapper>)
}

export default Profile
