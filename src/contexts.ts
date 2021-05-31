import { createContext, useContext } from "react";
import { Ios } from "./service/api/io";
import { UserDto } from "./service/model/User";
import Wallet from "./service/eth/Wallet";

export const IosContext = createContext<Ios | null>(null)

export function useIos() {
  const ios = useContext(IosContext)
  if (ios == null) throw new Error('IosContext is not initialized')
  return ios
}

export type RestData = {
  base: string
}

export const RestContext = createContext<RestData | null>(null)

export function useRest() {
  const rest = useContext(RestContext)
  if (rest == null) throw new Error('RestContext is not initialized')
  return rest
}

export interface WalletsProviderData {
  wallets: Set<Wallet>,
  setWallets: (setter: (currentWallets: Set<Wallet>) => Set<Wallet>) => void
}

export const WalletsContext = createContext<WalletsProviderData | null>(null)

export function useWallets() {
  const wallets = useContext(WalletsContext)
  if (wallets == null) throw new Error('WalletsContext is not initialized')
  return wallets
}

export interface CurrentUserContextData {
  currentUser: UserDto | null,
  setCurrentUser: (currentUser: UserDto) => void,
  nullCurrentUser: () => void, // To avoid type confusion
  loginByModal: () => void
}

export const CurrentUserContext = createContext<CurrentUserContextData | null>(null)

export function useCurrentUserDetails() {
  const currentUserContext = useContext(CurrentUserContext)
  if (currentUserContext == null) throw new Error('CurrentUserContext is not initialized')
  return currentUserContext
}
