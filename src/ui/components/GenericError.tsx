import React, { FunctionComponent } from "react";
import { errorToString } from "../../util";
import { ErrorP } from "../style/error";
import { P } from "../style/text";
import ErrorContactInfo from "./ErrorContactInfo";

const GenericError: FunctionComponent<{
  error: any
}> = ({ error, children }) => <>
  <P>{children}</P>
  <ErrorP>{errorToString(error)}</ErrorP>
  <ErrorContactInfo />
</>

export default GenericError
