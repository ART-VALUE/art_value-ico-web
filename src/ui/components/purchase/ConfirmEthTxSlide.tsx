import React from "react";
import { useEffect } from "react";
import { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import Web3 from "web3";
import { PromiEvent, Transaction } from "web3-core";
import { MINIMUM_CONFIRMATIONS } from "../../../constants";
import { ChainId, txHashToExplorerUrl } from "../../../service/eth/networks";
import { EthPaymentTxResult } from "../../../service/eth/pay";
import Deposit from "../../../service/model/Deposit";
import { Button } from "../../style/button";
import { ErrorP } from "../../style/error";
import { A, H2, P, StrongNumber } from "../../style/text";
import Loading from "../Loading";
import LoadingRing from "../LoadingRing";
import { TransactionReceipt } from "web3-core";
import { setTokenSourceMapRange } from "typescript";
import GenericError from "../GenericError";

const RECHECK_TIMEOUT = 2000

class NotConfirmedYetSignal {
  confirmations: number;

  constructor(confirmations: number) {
    this.confirmations = confirmations
  }
}

const ConfirmEthTxSlide: FunctionComponent<{
  web3: Web3,
  chainId: ChainId,
  txReceipt: TransactionReceipt,
  onTransactionConfirmed: () => void
}> = ({ web3, chainId, txReceipt, onTransactionConfirmed }) => {
  const [callbackCalled, setCallbackCalled] = useState(false)
  const [confirmations, setConfirmations] = useState(0)
  const qBlockNumber = useQuery(
    ['web3', web3.eth.getBlockNumber.name],
    async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      const newConfirmations = blockNumber - txReceipt.blockNumber
      setConfirmations(newConfirmations)
      if (newConfirmations <= MINIMUM_CONFIRMATIONS) {
        throw new NotConfirmedYetSignal(newConfirmations)
      }
      return newConfirmations
    },
    {
      retry: (_, error) => {
        if (error instanceof NotConfirmedYetSignal) {
          return true
        }
        return false
      },
      retryDelay: 1000
    }
  )

  useEffect(() => {
    if (!callbackCalled && confirmations >= MINIMUM_CONFIRMATIONS) {
      setCallbackCalled(true)
      onTransactionConfirmed()
    }
  }, [confirmations])

  return <>
    <H2>Confirm transaction</H2>
    {(() => {
      if (qBlockNumber.isError) {
        return <>
          <GenericError error={qBlockNumber.error}>
            An error occured while confirming the transaction
          </GenericError>
          <Button onClick={() => qBlockNumber.refetch()}>Try again</Button>
        </>
      }

      if (confirmations < MINIMUM_CONFIRMATIONS) {
        return <>
          <P>Waiting for at least {MINIMUM_CONFIRMATIONS} confirmations...</P>
          <P>
            This can take up to 10 minutes.
            You can safely close this window and come back later to the "My Profile" page to finish the deposit validation.<br/>
            <A href={txHashToExplorerUrl(chainId, txReceipt.transactionHash)} target="_blank">
              View this transaction on Etherscan
            </A>
          </P>
          <P><StrongNumber>{confirmations}</StrongNumber>/{MINIMUM_CONFIRMATIONS} confirmations</P>
          <LoadingRing />
        </>
      }

      return (<>
        <P>Transaction confirmed!</P>
        <Button
          onClick={() => onTransactionConfirmed()}>
          Continue
        </Button>
      </>)

    })()}
  </>
}

export default ConfirmEthTxSlide
