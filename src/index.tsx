import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './ui/components/App'
import { QueryClient, QueryClientProvider, setLogger as setQueryLogger } from 'react-query'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import AlertTemplate from './ui/components/AlertTemplate'
import { AlertProviderProps, positions, transitions, Provider as AlertProvider } from 'react-alert'
import { darken, lighten } from 'polished'
import { isErrorProcessed } from './util'
import { loadStripe } from '@stripe/stripe-js'
import Modal from "react-modal";

const colorBackground = '#0a0a0a';

const theme: DefaultTheme = {
	color: {
		background: colorBackground,
		surface: lighten(0.2, colorBackground),
		border: lighten(0.4, colorBackground),
		text: darken(0.1, '#fff'),
    info: '#2c90be',
    success: '#53b953',
    error: '#a73e3e',
    link: '#2c90be',
    linkVisited: '#1d5975',
    linkHover: '#5695b3',
    linkActive: '#367ea0',
	},
	font: {
		text: 'Avenir95Light',
		title: 'Avenir95Black',
	},
}

const stripePromise = loadStripe(
  'pk_test_51ITna8JcDKL67QxNOgLJSMRVqFGagqi7pcHXCtewhqPyxqsWt5QrIWLeCoWXTZlZIi2gOhNSh3JE4M6Rr40VFhSJ00cmqxUD2d'
)

Modal.setAppElement('#root')

const queryClient = new QueryClient()
setQueryLogger({
  error: (...args) => {
    if (!isErrorProcessed(args[0])) console.error.apply(console, args)
  },
  log: console.log,
  warn: console.warn
})

interface AlertProviderOptions extends Omit<AlertProviderProps, 'template'> { }

const alertOptions: AlertProviderOptions = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


// async function portisTest() {
//   const accounts = await getAccounts()
//   const account = accounts[0]
//   if (account == null) throw Error("No Etherium account found")
//   console.log(`Your account: ${account}`)

//   const balanceStr = await web3.eth.getBalance(account)
//   // let balanceWei = Number.parseInt(balanceStr)
//   const myBalance = web3.utils.fromWei(balanceStr, 'ether')
//   console.log(`Your wallet balance is currently ${myBalance} ETH`)

//   const nonce = await web3.eth.getTransactionCount(account)
//   console.log(`The outgoing transaction count for your wallet address is: ${nonce}`)

//   const amountToSend = web3.utils.toBN(100000000)
//   const ourAddress = "0x87A4E8363AF65FC4a0FFf52D1d70918CC574492D"

//   const gasPrices = await getCurrentGasPrices()
//   const txDetails: TransactionConfig = {
//     "from": account,
//     "to": ourAddress,
//     "value": web3.utils.toHex(web3.utils.toWei(amountToSend, 'Gwei')),
//     "gas": 21000,
//     "gasPrice": gasPrices.low * 1000000000, // converts the gwei price to wei
//     "nonce": nonce,
//     "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
//   }
 
//   const transaction = await web3.eth.signTransaction(txDetails)
//   console.log(transaction)

//   console.log("Sending transaction...")
//   const transactionEvent = web3.eth.sendSignedTransaction(transaction.raw)
//   transactionEvent.on("transactionHash", th => console.log(`Got a th: `, th))
//   transactionEvent.on("receipt", receipt => console.log(`Got a receipt: `, receipt))
//   transactionEvent.on("confirmation", conf => console.log(`Got confirmation!`))
//   transactionEvent.then(receipt => console.log(`Transaction complete :) `, receipt))
//   transactionEvent.catch(err => console.log(`Transaction error :( `, err))

//   const nonceAfter = await web3.eth.getTransactionCount(account)
//   console.log(`The outgoing transaction count for your wallet address is: ${nonceAfter}`)
// }

// portisTest()
