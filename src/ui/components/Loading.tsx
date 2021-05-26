import React, { Children, FunctionComponent } from "react";
import styled from "styled-components";
import { P } from "../style/text";
import LoadingRing from "./LoadingRing";

const LoadingRingContainer = styled.div`
  justify-content: center;
  display: flex;
  margin: 2rem 2rem;
`

const Loading: FunctionComponent<{}> = ({ children }) => {
  const childCount = Children.count(children)
  if (childCount <= 0) {
    throw new Error('Loading components must have at least one child')
  }
  return <div>
    {children},
    <LoadingRingContainer><LoadingRing /></LoadingRingContainer>
  </div>
}

export default Loading
