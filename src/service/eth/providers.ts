import detectEthereumProvider from '@metamask/detect-provider';
import { provider as Provider } from "web3-core";
import { ProviderType } from "./ProviderType";
import Portis from "@portis/web3"
import { ChainId, web3networks } from './networks';

export class BrowserWalletNotFoundException extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'BrowserWalletNotFoundException'
  }
}

export async function createProvider(providerType: ProviderType, chainId: ChainId) {
  if (providerType === 'portis') return createPortisProvider(chainId)
  else if (providerType === 'browser') return await createBrowserProvider()
  else throw Error('Unknown ProviderType')
}

export function createPortisProvider(chainId: ChainId) {
  return new Portis(
    `79582b9a-9e5b-4ae6-b7ec-643a28136c09`,
    web3networks[chainId].portisName, { scope: ['email'] }
  ).provider as Provider
}

export async function createBrowserProvider(): Promise<Provider> {
  const provider = (await detectEthereumProvider({
    silent: true,
    timeout: 2000
  })) as Provider | null
  if (provider === null) throw new BrowserWalletNotFoundException()
  await (provider as any).request({ method: 'eth_requestAccounts' });
  return provider
}
