import Portis from "@portis/web3"
import Web3 from "web3"

export const portis = new Portis(
  `79582b9a-9e5b-4ae6-b7ec-643a28136c09`,
  `rinkeby`, { scope: ['email'] }
)

export const web3 = new Web3(portis.provider);

export const getAccounts = async() => { return await web3.eth.getAccounts() };

// export const getContract = async() => { return await buildContractInstance({web3}) };

export const web3networks = {
  "1": {
    name: "Ethereum",
    explorerTx: "https://etherscan.io/tx",
    explorerAddress: "https://etherscan.io/address"
  },
  "3": {
    name: "Ethereum (ropsten)",
    explorerTx: "https://ropsten.etherscan.io/tx",
    explorerAddress: "https://ropsten.etherscan.io/address"
  },
  "4": {
    name: "Ethereum (rinkeby)",
    explorerTx: "https://rinkeby.etherscan.io/tx",
    explorerAddress: "https://rinkeby.etherscan.io/address"
  },
  "5": {
    name: "Ethereum (goerli)",
    explorerTx: "https://blockscout.com/eth/goerli/tx",
    explorerAddress: "https://blockscout.com/eth/goerli/address"
  },
  "42": {
    name: "Ethereum (kovan)",
    explorerTx: "https://blockscout.com/eth/kovan/tx",
    explorerAddress: "https://blockscout.com/eth/kovan/address"
  }
}
