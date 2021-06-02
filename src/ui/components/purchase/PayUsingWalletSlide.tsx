import BN from "bn.js";
import { FunctionComponent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import Web3 from "web3";
import { ChainId, txHashToExplorerUrl } from "../../../service/eth/networks";
import payUsingWeb3 from "../../../service/eth/pay";
import Wallet from "../../../service/eth/Wallet";
import { TransactionReceipt } from "web3-core";
import { A, H2, MonoData, P, SpanItalic } from "../../style/text";
import { weiToEtherStr } from "../../../service/eth/util";
import Loading from "../Loading";
import { Button } from "../../style/button";
import GenericError from "../GenericError";

const PayUsingWalletSlide: FunctionComponent<{
  wallet: Wallet,
  chainId: ChainId,
  toAddress: string,
  amount: BN,
  gasPrice: BN,
  onPaymentComplete: (receipt: TransactionReceipt) => void
}> = ({ wallet, amount, gasPrice, chainId, toAddress, onPaymentComplete }) => {
  const web3 = new Web3(wallet.provider)
  const [callbackCalled, setCallbackCalled] = useState(false)
  const qPaymentMutation = useMutation(
    () => payUsingWeb3(
      web3, wallet.address, toAddress, amount, gasPrice, chainId
    )
  )

  useEffect(() => {
    if (!callbackCalled && qPaymentMutation.isSuccess) {
      setCallbackCalled(true)
      onPaymentComplete(qPaymentMutation.data!!)
    }
  }, [qPaymentMutation.isSuccess])

  return <>
    <H2>Pay using your Ethereum wallet</H2>
    {(() => {
      if (qPaymentMutation.isLoading) {
        return <>
          <P>
            Your crypto wallet may ask for you permission.<br/>
            If so, accept the prompt to continue.
          </P>
          <Loading><P>Paying...</P></Loading>
          <P><SpanItalic>This may take a while, your wallet needs to submit the transaction to the network.</SpanItalic></P>
        </>
      } else if (qPaymentMutation.isError) {
        return <>
          <GenericError error={qPaymentMutation.error}>
            An error occured while paying using your crypto wallet
          </GenericError>
          <P>
            Only try again if you know the transaction failed!
            To get refunded if the transaction did go through, please contact us.
          </P>
          <Button onClick={() => qPaymentMutation.mutate()}>Try again</Button>
        </>
      } else if (qPaymentMutation.isSuccess) {
        const txHash = qPaymentMutation.data!!.transactionHash
        return <>
          <P>
            Payment successful!<br />
            <A href={txHashToExplorerUrl(chainId, txHash)} target="_blank">
              View on etherscan
            </A>
          </P>
          <Button onClick={() => onPaymentComplete(qPaymentMutation.data!!)}>
            Continue
          </Button>
        </>
      }
    
      return <>
        <P>To pay, you need to approve the following transaction:</P>
        <P>
          From: <MonoData>{wallet.address} (your selected address)</MonoData><br/>
          To: <MonoData>{toAddress} (Art Value's address)</MonoData><br/>
          Amount: <MonoData>{weiToEtherStr(amount)}</MonoData> Ether
        </P>
        <Button onClick={() => qPaymentMutation.mutate()}>Pay</Button>
      </>
    })()}
  </>
}

export default PayUsingWalletSlide
