import React, { FunctionComponent } from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "../../style/button";
import { P, Pre } from "../../style/text";

const ErrorFallback: FunctionComponent<FallbackProps> = (
  { error, resetErrorBoundary }
) => {
  return (<>
    <P>Something went wrong during your purchase:</P>
    <Pre>{error.message}</Pre>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </>)
}

export default ErrorFallback
