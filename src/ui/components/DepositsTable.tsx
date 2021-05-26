import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import styled, { useTheme } from "styled-components";
import { useCurrentUserDetails, useIos } from "../../contexts";
import { getMyDeposits, getMyPaidDeposits } from "../../service/api/deposit";
import { weiToEtherStr, weiToGweiStr } from "../../service/eth/util";
import Deposit from "../../service/model/Deposit";
import LoadingRing from "./LoadingRing";
import Modal from 'react-modal';
import DepositDetails from "./DepositDetails";
import { Button } from "../style/button";
import { ErrorP } from "../style/error";
import { Table, Th, TdAlignRight, Td, TdItalic, TdIconContainer, Tr, TrHead } from "../style/table";
import { A, P } from "../style/text";
import { CHAIN_ID } from "../../constants";
import { txHashToExplorerUrl } from "../../service/eth/networks";
import { modalStyle } from "../style/modal";
import VerifyDepositSlide from "./purchase/VerifyDepositSlide";
import Carousel from "./Carousel";
import ConfirmAndVerifyDepositSlides from "./purchase/ConfirmAndVerifyDepositSlides";
import ErrorContactInfo from "./ErrorContactInfo";
import GenericError from "./GenericError";
import { fractionlessToString } from "../../service/number";

const DepositDetailsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 0.4rem 0;
  margin: 0;
`

const DepositsTable: FunctionComponent<{}> = () => {
  const { deposit: depositIo } = useIos()
  const [currentDepositDetails, setCurrentDepositDetails] = useState<Deposit | null>(null)
  const [showVerifyDepositModal, setShowVerifyDepositModal] = useState(false)
  const { currentUser, launchLoginModal } = useCurrentUserDetails()
  const qDeposits = useQuery(
    ['deposits', getMyPaidDeposits.name],
    () => getMyPaidDeposits(depositIo),
    {
      enabled: currentUser != null
    }
  )
  const theme = useTheme()

  if (qDeposits.isLoading) {
    return <>
      <P>Loading deposits...</P>
      <LoadingRing />
    </>
  }

  if (qDeposits.isError) {
    return <>
      <GenericError error={qDeposits.error}>
        An error occured while trying to fetch your deposits
      </GenericError>
      <button onClick={() => qDeposits.refetch()}>Try again</button>
    </>
  }

  const handleLaunchVerification = () => {
    setShowVerifyDepositModal(true)
  }

  const closeDepositDetailsModal = () => {
    setCurrentDepositDetails(null)
  }

  if (qDeposits.isSuccess) {
    return (<>
      <P>
        To verify an unverified transaction (<FontAwesomeIcon icon={faTimes} color={theme.color.error} />),
        click on the <FontAwesomeIcon icon={faInfoCircle} color="#fff" /> icon.
      </P>
      {qDeposits.data!!.length > 0
        ? <Table>
          <thead>
            <TrHead>
              <Th>Amount</Th>
              <Th>Creation time</Th>
              <Th>Deposit price Ether</Th>
              <Th>Gas price Gwei</Th>
              <Th>Transaction hash</Th>
              <Th>Verified</Th>
              <Th>Details</Th>
            </TrHead>
          </thead>
          <tbody>
            {qDeposits.data!!.map(deposit => (<Tr key={deposit.uuid}>
              <TdAlignRight>{fractionlessToString(deposit.amount)}</TdAlignRight>
              <Td>{(new Date(deposit.timeCreated*1000)).toLocaleString()}</Td>
              <TdAlignRight>{weiToEtherStr(deposit.priceEther)}</TdAlignRight>
              <TdAlignRight>{weiToGweiStr(deposit.gasPrice)}</TdAlignRight>
              {deposit.ethTxHash == null
                ? <TdItalic>Not yet created</TdItalic>
                : <Td><A
                    href={txHashToExplorerUrl(CHAIN_ID, deposit.ethTxHash)}
                    target="_blank" rel="noreferrer">
                      {deposit.ethTxHash.slice(0, 15)}...
                  </A></Td>
              }
              <Td>{deposit.isVerified
                ? <FontAwesomeIcon icon={faCheck} color={theme.color.success} />
                : <FontAwesomeIcon icon={faTimes} color={theme.color.error} />
              }</Td>
              <Td>
                <DepositDetailsButton
                  onClick={() => setCurrentDepositDetails(deposit)}>
                  <FontAwesomeIcon icon={faInfoCircle} color="#fff" />
                </DepositDetailsButton>
              </Td>
            </Tr>))}
          </tbody>
        </Table>
        : <P>You haven't made any presale deposits yet</P>
      }

      <Modal
        style={modalStyle(theme)}
        isOpen={(currentDepositDetails != null && !showVerifyDepositModal)}
        contentLabel="Deposit Details Dialog"
        onRequestClose={closeDepositDetailsModal}>
          {currentDepositDetails != null
            ? <DepositDetails
                deposit={currentDepositDetails}
                onLaunchVerification={() => handleLaunchVerification()} />
            : <ErrorP>No deposit selected</ErrorP>
          }
        <Button onClick={closeDepositDetailsModal}>close</Button>
      </Modal>
      <Modal
        style={modalStyle(theme)}
        isOpen={currentDepositDetails != null && showVerifyDepositModal}
        contentLabel="Deposit Details Dialog"
        onRequestClose={closeDepositDetailsModal}>
          {currentDepositDetails != null
            ? <ConfirmAndVerifyDepositSlides
              chainId={CHAIN_ID}
              deposit={currentDepositDetails}
              onVerified={verifiedDeposit => {
                qDeposits.refetch()
                setCurrentDepositDetails(verifiedDeposit)
                setShowVerifyDepositModal(false)
              }} />
            : <ErrorP>No deposit selected</ErrorP>
          }
        <Button onClick={closeDepositDetailsModal}>close</Button>
      </Modal>
    </>)
  }

  return <>
    <P>You need to be logged in to view your deposits.</P>
    <Button onClick={() => launchLoginModal()}>Log in</Button>
  </>
}

export default DepositsTable