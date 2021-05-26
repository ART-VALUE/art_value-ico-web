import detectEthereumProvider from '@metamask/detect-provider';
import { provider as Provider } from "web3-core";
import { ProviderType } from "./ProviderType";
import Portis from "@portis/web3"

export class BrowserWalletNotFoundException extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'BrowserWalletNotFoundException'
  }
}

export async function createProvider(providerType: ProviderType) {
  if (providerType === 'portis') return createPortisProvider()
  else if (providerType === 'browser') return await createBrowserProvider()
  else throw Error('Unknown ProviderType')
}

export function createPortisProvider() {
  return new Portis(
    `79582b9a-9e5b-4ae6-b7ec-643a28136c09`,
    `rinkeby`, { scope: ['email'] }
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
