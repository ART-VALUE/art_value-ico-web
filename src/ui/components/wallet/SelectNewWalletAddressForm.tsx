import React, { FunctionComponent, useState } from "react";
import { Button } from "../../style/button";
import { Label } from "../../style/form";
import { P } from "../../style/text";
import styled from "styled-components";

const UseAddressButton = styled(Button)`
  margin-top: 2rem;
`

const SelectNewWalletAddressForm: FunctionComponent<{
  addresses: string[],
  onAddressSelected: (address: string) => void
}> = ({ addresses, onAddressSelected }) => {
  const firstAddress = addresses[0]
  const [selectedAddress, setSelectedAddress] = useState(firstAddress)
  if (firstAddress == null) return (<>
    <P>
      No wallets found, initialize your selected provider 
      with an Ethereum wallet and try again.
    </P>
  </>)
  return (<form onSubmit={e => {
    e.preventDefault()
    onAddressSelected(selectedAddress)
  }}>
    {addresses.map((address) => (
      <Label key={address}>
        <input
          type="radio"
          name="account"
          value={address}
          defaultChecked={address === firstAddress}
          onChange={() => setSelectedAddress(address)} />
        {address}
      </Label>
    ))}
    <UseAddressButton type="submit" value="portis">
      Use this address
    </UseAddressButton>
  </form>)
}

export default SelectNewWalletAddressForm
