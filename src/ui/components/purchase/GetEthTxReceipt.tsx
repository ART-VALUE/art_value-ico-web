import { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Web3 from "web3";
import Wallet from "../../../service/eth/Wallet";
import Deposit from "../../../service/model/Deposit";
import { errorToString } from "../../../util";
import { Button } from "../../style/button";
import { ErrorP } from "../../style/error";
import { H2, P } from "../../style/text";
import Loading from "../Loading";
import { TransactionReceipt } from "web3-core";
import GenericError from "../GenericError";

const GetEthTxReceipt: FunctionComponent<{
  wallet: Wallet,
  deposit: Deposit,
  onGotEthTxReceipt: (receipt: TransactionReceipt) => void
}> = ({ wallet, deposit, onGotEthTxReceipt }) => {
  const ethTxHash = deposit.ethTxHash
  if (ethTxHash == null) {
    throw new Error('GetTransactionReceipt requires a paid deposit')
  }
  const web3 = new Web3(wallet.provider)
  const qEthTx = useQuery(
    ['web3', web3.eth.getTransactionReceipt.name, ethTxHash],
    () => web3.eth.getTransactionReceipt(ethTxHash)
  )
  const [callbackCalled, setCallbackCalled] = useState(false)

  useEffect(() => {
    if (!callbackCalled && qEthTx.isSuccess) {
      setCallbackCalled(true)
      onGotEthTxReceipt(qEthTx.data!!)
    }
  }, [qEthTx.isSuccess])

  return <>
    <H2>Retrieve transaction info</H2>
    {(() => {
      if (qEthTx.isLoading) {
        return <Loading><P>Retrieving transaction info...</P></Loading>
      }

      if (qEthTx.isError) {
        return <>
          <GenericError error={qEthTx.error}>
            An error occured while retrieving the transaction info
          </GenericError>
          <Button onClick={() => qEthTx.refetch()}>Try again</Button>
        </>
      }

      return (<>
        <P>Got transaction info!</P>
        <Button
          onClick={() => onGotEthTxReceipt(qEthTx.data!!)}>
          Continue
        </Button>
      </>)

    })()}
  </>
}

export default GetEthTxReceipt
