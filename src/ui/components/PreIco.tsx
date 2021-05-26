import { FunctionComponent } from "react";
import styled from "styled-components";
import { TextClock } from "./TextCountdown";

const endDate = Date.now() + 1000000

const PreIco: FunctionComponent<{}> = () => {
  return (
    <div>
      {/* <TextClock date={endDate} />
      <Button>Login</Button> */}
    </div>
  )
}

export default PreIco
