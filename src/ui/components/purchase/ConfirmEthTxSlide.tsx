import { useEffect } from "react";
import { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import Web3 from "web3";
import { ChainId, txHashToExplorerUrl } from "../../../service/eth/networks";
import { Button } from "../../style/button";
import { A, H2, P, StrongNumber } from "../../style/text";
import LoadingRing from "../LoadingRing";
import { TransactionReceipt } from "web3-core";
import GenericError from "../GenericError";
import config from "../../../config";

class NotConfirmedYetException extends Error {
  confirmations: number;

  constructor(confirmations: number) {
    super()
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
      if (newConfirmations <= config.frontend.minimumConfirmations) {
        throw new NotConfirmedYetException(newConfirmations)
      }
      return newConfirmations
    },
    {
      retry: (_, error) => {
        if (error instanceof NotConfirmedYetException) {
          return true
        }
        return false
      },
      retryDelay: 1000
    }
  )

  useEffect(() => {
    if (!callbackCalled && confirmations >= config.frontend.minimumConfirmations) {
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

      if (confirmations < config.frontend.minimumConfirmations) {
        return <>
          <P>Waiting for at least {config.frontend.minimumConfirmations} confirmations...</P>
          <P>
            This can take up to 10 minutes.
            You can safely close this window and come back later to the "My Profile" page to finish the deposit validation.<br/>
            <A href={txHashToExplorerUrl(chainId, txReceipt.transactionHash)} target="_blank">
              View this transaction on Etherscan
            </A>
          </P>
          <P><StrongNumber>{confirmations}</StrongNumber>/{config.frontend.minimumConfirmations} confirmations</P>
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
