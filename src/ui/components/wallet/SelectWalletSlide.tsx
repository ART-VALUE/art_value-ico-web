import React, { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Web3 from "web3";
import { useWallets } from "../../../contexts";
import { createProvider, BrowserWalletNotFoundException } from "../../../service/eth/providers";
import { ProviderType } from "../../../service/eth/ProviderType";
import Wallet from "../../../service/eth/Wallet";
import { Button } from "../../style/button";
import { ErrorP } from "../../style/error";
import { A, H2, H3, P } from "../../style/text";
import Loading from "../Loading";
import LoadingRing from "../LoadingRing";
import SelectExistingWalletForm from "./SelectExistingWalletForm";
import SelectNewWalletAddressForm from "./SelectNewWalletAddressForm";

const WalletButton = styled.button`
  width: 5rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 5rem;
  height: 3rem;
  padding: 0.5em;
  margin-right: 0.5rem;

  > img {
    max-width: 100%;
    max-height: 100%;
    /* fill: ; */
    padding: 0;
    margin: 0;
  }
`

const SelectWalletSlide: FunctionComponent<{
  onWalletSelected: (wallet: Wallet) => void
}> = ({ onWalletSelected, children }) => {
  if (children == null) throw new Error("SelectWalletSlide must have children")
  
  const { wallets: walletsSet, setWallets } = useWallets()
  const wallets = Array.from(walletsSet.values())
  const [newWalletProviderType, setNewWalletProviderType] = useState<ProviderType | null>(null)
  const qNewWalletProvider = useQuery(
    ['provider', newWalletProviderType],
    () => createProvider(newWalletProviderType!!),
    { enabled: newWalletProviderType != null, retry: false }
  )
  const web3 = qNewWalletProvider.data == null ? null : new Web3(qNewWalletProvider.data)
  const qAccounts = useQuery(
    ['provider', newWalletProviderType, 'account'],
    () => web3!!.eth.getAccounts(),
    { enabled: web3 != null }
  )

  const handlePortisClick = () => setNewWalletProviderType('portis')
  const handleBrowserWalletClick = () => setNewWalletProviderType('browser')
  const handleSelectDifferent = () => setNewWalletProviderType(null)

  return (<>
    <H2>{children}</H2>
    {wallets.length > 0
      ? <>
        <H3>Choose an existing wallet</H3>
        <SelectExistingWalletForm onWalletSelected={onWalletSelected} />
      </>
      : <P>You don't have any existing wallets</P>
    }
    <H3>Connect a new wallet</H3>
    {newWalletProviderType == null
      ? <form onSubmit={e => e.preventDefault()}>
        <WalletButton type="submit" value="portis" onClick={handlePortisClick}>
          <img src={process.env.PUBLIC_URL + '/icon/portis.png'} alt="Portis" />
        </WalletButton>
        <WalletButton type="submit" value="crypto" onClick={handleBrowserWalletClick}>
          <img src={process.env.PUBLIC_URL + '/icon/metamask.svg'} alt="Metamask" />
        </WalletButton>
        <WalletButton type="submit" value="crypto" onClick={handleBrowserWalletClick}>
        <img src={process.env.PUBLIC_URL + '/icon/globe.svg'} alt="Other browser wallet" />
        </WalletButton>
      </form>
      : <>
        {qNewWalletProvider.isLoading
          ? <>
            <P>Loading provider…</P>
            <LoadingRing />
          </>
          : qNewWalletProvider.isError
            ? <ErrorP>
              Error loading provider: <br/>
              {qNewWalletProvider.error instanceof BrowserWalletNotFoundException
                ? <span>
                  Browser wallet could not be found, try {' '}
                  <A target="_blank" href="https://metamask.io/">installing metamask</A> 
                  {' '} and reloading the page.
                </span>
                : String(qNewWalletProvider.error)
              }
            </ErrorP>
            : qAccounts.isLoading
              ? <Loading><P>
                Loading accounts for {newWalletProviderType}…
              </P></Loading>
              : qAccounts.isError
                ? <ErrorP>
                  Error loading accounts: {String(qNewWalletProvider.error)}
                </ErrorP>
                : <SelectNewWalletAddressForm 
                  addresses={qAccounts.data!!}
                  onAddressSelected={address => {
                    setNewWalletProviderType(null)
                    const wallet: Wallet = {
                      providerType: newWalletProviderType,
                      provider: qNewWalletProvider.data!!,
                      address
                    }
                    setWallets((currentWallets: Set<Wallet>) => new Set([...currentWallets, wallet]))
                    onWalletSelected(wallet)
                  }} />
        }
        <Button onClick={handleSelectDifferent}>
          Use a different provider
        </Button>
      </>
    }
  </>)
}

export default SelectWalletSlide
