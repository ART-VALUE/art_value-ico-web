import React from "react";
import { FunctionComponent } from "react";
import { P, A } from "../style/text";

const ErrorContactInfo: FunctionComponent<{}> = () => <P>
  Please contact us at{' '}
  <A href={`mailto:info@artvalue.org`}>info@artvalue.org</A>{' '}
  and we will help to resolve the problem.
</P>

export default ErrorContactInfo
