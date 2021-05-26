import { FunctionComponent } from "react"
import styled from "styled-components"

const RingContainer = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible;
  width: 80px;
  height: 80px;

  @keyframes loadingRingKf {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const RingPart = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: loadingRingKf 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const LoadingRing: FunctionComponent<{}> = () => (
  <RingContainer>
    <RingPart />
    <RingPart />
    <RingPart />
    <RingPart />
  </RingContainer>
)

export default LoadingRing
