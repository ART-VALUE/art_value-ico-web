import React, { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useIos } from "../../../contexts";
import { verifyDeposit } from "../../../service/api/deposit";
import Deposit from "../../../service/model/Deposit";
import { errorToString } from "../../../util";
import { Button } from "../../style/button";
import { ErrorP } from "../../style/error";
import { H2, P } from "../../style/text";
import GenericError from "../GenericError";
import LoadingRing from "../LoadingRing";

const VerifyDepositSlide: FunctionComponent<{
  deposit: Deposit,
  onVerified: (deposit: Deposit) => void
}> = ({ deposit, onVerified }) => {
  const { deposit: depositIo } = useIos()
  const [callbackCalled, setCallbackCalled] = useState(false)
  const qDepositVerification = useQuery(
    ['deposit', 'verify', deposit.uuid],
    () => verifyDeposit(depositIo, deposit)
  )

  useEffect(() => {
    if (!callbackCalled && qDepositVerification.isSuccess) {
      setCallbackCalled(true)
      onVerified(qDepositVerification.data!!)
    }
  }, [qDepositVerification.isSuccess])

  return <>
    <H2>Verify deposit</H2>
    {(() => {
      if (qDepositVerification.isLoading) {
        return <>
          <P>Verifying your deposit...</P>
          <P>
            This can take up to 10 minutes.
            You can check back later in your profile.
          </P>
          <LoadingRing />
        </>
      } else if (qDepositVerification.isError) {
        return <>
          <GenericError error={qDepositVerification.error}>
            An error occured while trying to verify the deposit
          </GenericError>
          <P>
            It is possible that the server and your browser are slightly out of sync.
            You can try verifying the deposit later by going to "My profile".
          </P>
          <Button onClick={() =>qDepositVerification.refetch()}>Try again</Button>
        </>
      }

      return <>
        <P>Verification successful</P>
        <Button onClick={() => onVerified(qDepositVerification.data!!)}>
          Continue
        </Button>
      </>
    })()}
  </>
}

export default VerifyDepositSlide
