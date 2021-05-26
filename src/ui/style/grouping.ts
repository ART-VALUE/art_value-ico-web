import styled from "styled-components";

export const Section = styled.section`
  margin-bottom: 2rem;
`

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Main = styled.main`
  padding: 1rem 1.5rem;
  max-width: 60rem;
  width: 100%;

  @media (min-width: 600px) {
    padding: 3rem 5rem;
  }
`

export const HorizontalCenter = styled.div`
  justify-content: center;
  display: flex;
`
