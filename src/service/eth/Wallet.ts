import { ProviderType } from "./ProviderType";
import { provider as Provider } from "web3-core";

export default interface Wallet {
  providerType: ProviderType,
  provider: Provider,
  address: string
}
