import BN from "bn.js";
import React, { FunctionComponent, useEffect } from "react";
import { useMutation } from "react-query";
import { useIos } from "../../../contexts";
import { isNamedApiException } from "../../../service/api";
import { createDeposit } from "../../../service/api/deposit";
import Deposit from "../../../service/model/Deposit";
import { fractionlessToString } from "../../../service/number";
import { Button } from "../../style/button";
import { ErrorP } from "../../style/error";
import { A, H2, P } from "../../style/text";
import GenericError from "../GenericError";
import LoadingRing from "../LoadingRing";

const CreateDepositSlide: FunctionComponent<{
  amount: BN,
  onDepositCreated: (deposit: Deposit) => void
}> = ({ amount, onDepositCreated }) => {
  const { deposit: depositIo } = useIos()
  const qDepositMutation = useMutation(
    () => createDeposit(depositIo, amount)
  )

  useEffect(() => qDepositMutation.mutate(), [amount])

  useEffect(() => {
    if (qDepositMutation.isSuccess) {
      onDepositCreated(qDepositMutation.data!!)
    }
  }, [qDepositMutation.data])

  return <>
    <H2>Deposit request</H2>
    {(() => {
      if (qDepositMutation.isLoading) {
        return <>
          <P>Creating deposit request...</P>
          <LoadingRing />
        </>
      } else if (qDepositMutation.isError) {
        if (isNamedApiException(qDepositMutation.error, 'IsReservedNumberException')) {
          return <>
            <P>Sorry, but {fractionlessToString(amount)} is a reserved number.</P>
            <P>
              Please contact us at{' '}
              <A href={`mailto:info@artvalue.org?subject=Purchase%20of%20${fractionlessToString(amount)}`}>info@artvalue.org</A>{' '}
              if you are interested in buying this exact number.
            </P>
            <P>
              You can go back and select another number. For example {fractionlessToString(amount.add(new BN(10)))} or {fractionlessToString(amount.add(new BN(200)))}.
            </P>
          </>
        } else if (isNamedApiException(qDepositMutation.error, 'AlreadyReservedException')) {
          return <>
            <P>Sorry, but the number {fractionlessToString(amount)} has already been selected by another investor.</P>
            <P>
              Please contact us at{' '}
              <A href={`mailto:info@artvalue.org`}>info@artvalue.org</A>{' '}
              if you have any questions.
            </P>
            <P>
              You can go back and select another number. For example {fractionlessToString(amount.add(new BN(10)))} or {fractionlessToString(amount.add(new BN(200)))}.
            </P>
          </>
        }
        return <>
          <GenericError error={qDepositMutation.error}>
            An error occured trying to create the deposit
          </GenericError>
          <Button onClick={() => qDepositMutation.mutate()}>Try again</Button>
        </>
      } else if (qDepositMutation.isSuccess) {
        return <>
          <P>
            Deposit request created successfully!
          </P>
          <Button
            onClick={() => onDepositCreated(qDepositMutation.data!!)}>
            Continue
          </Button>
        </>
      }
    
      return <ErrorP>
        Could not create the deposit request
      </ErrorP>
    })()}
  </>
}

export default CreateDepositSlide
