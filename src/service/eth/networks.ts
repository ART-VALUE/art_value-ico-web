export type ChainId = keyof typeof web3networks

export const web3networks = {
  1: {
    name: "Ethereum",
    portisName: 'mainnet',
    explorerTx: "https://etherscan.io/tx",
    explorerAddress: "https://etherscan.io/address"
  },
  3: {
    name: "Ethereum (ropsten)",
    portisName: 'ropsten',
    explorerTx: "https://ropsten.etherscan.io/tx",
    explorerAddress: "https://ropsten.etherscan.io/address"
  },
  4: {
    name: "Ethereum (rinkeby)",
    portisName: 'rinkeby',
    explorerTx: "https://rinkeby.etherscan.io/tx",
    explorerAddress: "https://rinkeby.etherscan.io/address"
  },
  5: {
    name: "Ethereum (goerli)",
    portisName: 'goerli',
    explorerTx: "https://blockscout.com/eth/goerli/tx",
    explorerAddress: "https://blockscout.com/eth/goerli/address"
  },
  42: {
    name: "Ethereum (kovan)",
    portisName: 'kovan',
    explorerTx: "https://blockscout.com/eth/kovan/tx",
    explorerAddress: "https://blockscout.com/eth/kovan/address"
  }
}

export function txHashToExplorerUrl(chainId: ChainId, txHash: string) {
  const networkInfo = web3networks[chainId]
  return `${networkInfo.explorerTx}/${txHash}`
}
