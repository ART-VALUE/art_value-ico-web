import React, { FunctionComponent, useState } from "react"
import { useWallets } from "../../../contexts"
import Wallet from "../../../service/eth/Wallet"
import { Button } from "../../style/button"
import { Label } from "../../style/form"
import { P } from "../../style/text"

const SelectExistingWalletForm: FunctionComponent<{
  onWalletSelected: (wallet: Wallet) => void
}> = ({ onWalletSelected }) => {
  const { wallets: walletsSet, setWallets } = useWallets()
  const wallets = Array.from(walletsSet)
  const firstWallet = wallets[0]
  const [chosenWallet, setChosenWallet] = useState(firstWallet)

  if (wallets.length === 0) {
    return (<P>No wallets to choose from</P>)
  }  else {
    return (<form onSubmit={e => {
      e.preventDefault()
      setWallets(currentWallets => new Set([...currentWallets, chosenWallet]))
      onWalletSelected(chosenWallet)
    }}>
      {wallets.map(wallet => {
        const key = wallet.providerType + wallet.address
        return (<Label key={key}>
          <input
            type="radio"
            name="account"
            value={wallet.providerType + wallet.address}
            defaultChecked={wallet === firstWallet}
            onChange={() => setChosenWallet(wallet)} />
          {wallet.providerType}: {wallet.address}
        </Label>)
      })}
      <Button type="submit" value="portis">
        Use this address
      </Button>
    </form>)
  }
}

export default SelectExistingWalletForm
