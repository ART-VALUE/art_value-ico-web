import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { useTheme } from "styled-components";
import { CHAIN_ID } from "../../constants";
import { txHashToExplorerUrl } from "../../service/eth/networks";
import { weiToEtherStr, weiToGweiStr } from "../../service/eth/util";
import Deposit from "../../service/model/Deposit";
import { fractionlessToString } from "../../service/number";
import { Button } from "../style/button";
import { H2, MonoData, P, Pre, PreItalic, SpanItalic } from "../style/text";

const DepositDetails: FunctionComponent<{
  deposit: Deposit,
  onLaunchVerification: () => void
}> = ({ deposit, onLaunchVerification }) => {
  const theme = useTheme()

  return <>
    <H2>Deposit</H2>
    <P>
      Amount: <MonoData>{fractionlessToString(deposit.amount)}</MonoData><br/>
      Creation time: <MonoData>{(new Date(deposit.timeCreated*1000)).toLocaleString()}</MonoData><br/>
      Deposit price (Ether): <MonoData>{weiToEtherStr(deposit.priceEther)}</MonoData><br/>
      Gas price (Gwei): <MonoData>{weiToGweiStr(deposit.gasPrice)}</MonoData><br/>
      Transaction hash: {deposit.ethTxHash == null
        ? <SpanItalic>Not yet created</SpanItalic>
        : <>
          <MonoData>{deposit.ethTxHash}</MonoData>{' '}
          (<a
            href={txHashToExplorerUrl(CHAIN_ID, deposit.ethTxHash)}
            target="_blank" rel="noreferrer">
            View on etherscan
          </a>)
        </>
      } <br/>
      Verified: {deposit.isVerified
        ? <FontAwesomeIcon icon={faCheck} color={theme.color.success} />
        : <FontAwesomeIcon icon={faTimes} color={theme.color.error} />
      } <br/>
      UUID: <MonoData>{deposit.uuid}</MonoData>
    </P>
    {!deposit.isVerified
       ? <Button onClick={() => onLaunchVerification()}>Verify</Button>
       : ''
    }
  </>
}

export default DepositDetails
