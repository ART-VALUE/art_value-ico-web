import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { getAccounts, web3 } from './portis'
import { TransactionConfig } from 'web3-eth'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

const getCurrentGasPrices = async () => {
  const res = await fetch('https://ethgasstation.info/json/ethgasAPI.json')
  const resData = await res.json()
  let prices = {
    low: resData.safeLow / 10,
    medium: resData.average / 10,
    high: resData.fast / 10
  }
 
  console.log (`Current ETH Gas Prices (in GWEI):`)
  console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`)
  console.log(`Standard: ${prices.medium} (transaction completes in < 5 minutes)`)
  console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`)
 
  return prices
}

async function portisTest() {
  const accounts = await getAccounts()
  const account = accounts[0]
  if (account == null) throw Error("No Etherium account found")
  console.log(`Your account: ${account}`)

  const balanceStr = await web3.eth.getBalance(account)
  // let balanceWei = Number.parseInt(balanceStr)
  const myBalance = web3.utils.fromWei(balanceStr, 'ether')
  console.log(`Your wallet balance is currently ${myBalance} ETH`)

  const nonce = await web3.eth.getTransactionCount(account)
  console.log(`The outgoing transaction count for your wallet address is: ${nonce}`)

  const amountToSend = web3.utils.toBN(100000000)
  const ourAddress = "0x87A4E8363AF65FC4a0FFf52D1d70918CC574492D"

  const gasPrices = await getCurrentGasPrices()
  const txDetails: TransactionConfig = {
    "from": account,
    "to": ourAddress,
    "value": web3.utils.toHex(web3.utils.toWei(amountToSend, 'Gwei')),
    "gas": 21000,
    "gasPrice": gasPrices.low * 1000000000, // converts the gwei price to wei
    "nonce": nonce,
    "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
  }
 
  const transaction = await web3.eth.signTransaction(txDetails)
  console.log(transaction)

  console.log("Sending transaction...")
  const transactionEvent = web3.eth.sendSignedTransaction(transaction.raw)
  transactionEvent.on("transactionHash", th => console.log(`Got a th: `, th))
  transactionEvent.on("receipt", receipt => console.log(`Got a receipt: `, receipt))
  transactionEvent.on("confirmation", conf => console.log(`Got confirmation!`))
  transactionEvent.then(receipt => console.log(`Transaction complete :) `, receipt))
  transactionEvent.catch(err => console.log(`Transaction error :( `, err))

  const nonceAfter = await web3.eth.getTransactionCount(account)
  console.log(`The outgoing transaction count for your wallet address is: ${nonceAfter}`)
}

// portisTest()
