import BN from "bn.js";
import React, { FunctionComponent, useEffect } from "react";
import { useMutation } from "react-query";
import { ETHER_TO_ADDRESS } from "../../../constants";
import { useIos } from "../../../contexts";
import { createDeposit, setDepositEthTxHash } from "../../../service/api/deposit";
import Deposit from "../../../service/model/Deposit";
import { Button } from "../../style/button";
import { ErrorP } from "../../style/error";
import { H2, P } from "../../style/text";
import GenericError from "../GenericError";
import LoadingRing from "../LoadingRing";

const SetDepositEthTxHashSlide: FunctionComponent<{
  deposit: Deposit,
  ethTxHash: string,
  onDepositEthTxHashSet: (deposit: Deposit) => void
}> = ({ deposit, ethTxHash, onDepositEthTxHashSet }) => {
  const { deposit: depositIo } = useIos()
  const qDepositMutation = useMutation(
    () => setDepositEthTxHash(depositIo, deposit, ethTxHash)
  )

  useEffect(() => qDepositMutation.mutate(), [])

  useEffect(() => {
    if (qDepositMutation.isSuccess) {
      onDepositEthTxHashSet(qDepositMutation.data!!)
    }
  }, [qDepositMutation.data])

  return <>
    <H2>Update deposit status</H2>
    {(() => {
      if (qDepositMutation.isLoading) {
        return <>
          <P>Updating deposit status with your transaction's data...</P>
          <LoadingRing />
        </>
      } else if (qDepositMutation.isError) {
        return <>
          <GenericError error={qDepositMutation.error}>
            An error occured while updating the deposit
          </GenericError>
          <Button onClick={() => qDepositMutation.mutate()}>Try again</Button>
        </>
      } else if (qDepositMutation.isSuccess) {
        return <>
          <P>
            Deposit request updated successfully!
          </P>
          <Button
            onClick={() => onDepositEthTxHashSet(qDepositMutation.data!!)}>
            Continue
          </Button>
        </>
      }
    
      return <ErrorP>
        Could not update the deposit
      </ErrorP>
    })()}
  </>
}

export default SetDepositEthTxHashSlide
