import Web3 from "web3";
import Portis from "@portis/web3"
import { AbstractProvider } from "web3-core";
import { JsonRpcPayload, JsonRpcResponse } from "web3-core-helpers";

export interface Web3Wrapper {
  type: 'portis',
  web3: Web3,
  sendAsync: (payload: JsonRpcPayload) => Promise<JsonRpcResponse>
}

export function createWeb3Wrapper(type: 'portis'): Web3Wrapper {
  if (type === 'portis') {
    const portis = new Portis(
      `79582b9a-9e5b-4ae6-b7ec-643a28136c09`,
      `rinkeby`, { scope: ['email'] }
    )
    const web3 = new Web3(portis.provider)
    const sendAsync = (
      payload: JsonRpcPayload
    ) => new Promise<JsonRpcResponse>((resolve, reject) => {
      (portis.provider as AbstractProvider).sendAsync(
        payload,
        (error, result) => {
          if (error != null) return reject(error)
          resolve(result!!)
        }
      )
    })
    
    return { type, web3, sendAsync }
  } else {
    throw new Error(`Unknown web3 type: "${type}"`)
  }
}
