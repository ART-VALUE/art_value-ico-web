import Web3 from "web3";
import { JsonRpcPayload, JsonRpcResponse } from "web3-core-helpers";
import { ProviderType } from "./ProviderType";


export interface Web3Wrapper {
  type: ProviderType,
  web3: Web3,
  sendAsync: (payload: JsonRpcPayload) => Promise<JsonRpcResponse>
}

// export async function createWeb3Wrapper(provider: Provider): Promise<Web3Wrapper> {
//   const web3 = new Web3(provider)
//   const sendAsync = (
//     payload: JsonRpcPayload
//   ) => new Promise<JsonRpcResponse>((resolve, reject) => {
//     (provider as AbstractProvider).sendAsync(
//       payload,
//       (error, result) => {
//         if (error != null) return reject(error)
//         resolve(result!!)
//       }
//     )
//   })
  
//   return { type, web3, sendAsync }
// }
