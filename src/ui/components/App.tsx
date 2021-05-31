import { Routes } from '../../routes/Routes';
import { Navigation } from './navigation/Navigation';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { IosContext, CurrentUserContextData, CurrentUserContext, WalletsContext, WalletsProviderData, RestContext, RestData } from '../../contexts';
import { createIos } from '../../service/api/io';
import { UserDto } from '../../service/model/User';
import { useAlert } from 'react-alert';
import * as authApi from "../../service/api/auth";
import { NamedApiException } from '../../service/api';
import Wallet from '../../service/eth/Wallet';
import styled, { useTheme } from 'styled-components';
import Modal from 'react-modal';
import LoginSlides from './auth/LoginSlides';
import { sessionHeartbeat } from '../../service/api/session';
import '../style/page.scss';
import { modalStyle } from '../style/modal';
import { isDev } from '../../env';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalCloseButton } from '../style/button';

const apiBase = isDev ? 'http://localhost:3000' : 'https://art-value-ico-api.herokuapp.com'
console.info(`Art Value ICO - ${isDev ? 'dev' : 'prod'} - API base: ${apiBase}`)
const restApiBase = `${apiBase}/api`
const ios = createIos(apiBase)
const rest: RestData = {
  base: restApiBase
}
const SESSION_HEARTBEAT_INTERVAL = 10000

const PageWrapperDiv = styled.div`
  background-color: ${p => p.theme.color.background};
  width: 100%;
  min-height: 100%;
`

const App: FunctionComponent<{}> = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null)
  const [wallets, setWallets] = useState<Set<Wallet>>(new Set())
  const alert = useAlert()
  const theme = useTheme()

  useEffect(() => {
    authApi.getMe(ios.auth).then(meFromApi => {
      if (meFromApi != null) {
        alert.success(`Logged in!`)
        setCurrentUser(meFromApi)
      }
    }).catch(error => {
      if (
        error instanceof NamedApiException
        && error.originalName === 'NotLoggedInException'
      ) return
      console.error(error)
      alert.error(`Failed to login, try again later`)
    })
    setInterval(() => {
      sessionHeartbeat(restApiBase)
    }, SESSION_HEARTBEAT_INTERVAL)
    sessionHeartbeat(restApiBase)
  }, [alert])

  const currentUserContextData: CurrentUserContextData = {
    currentUser: currentUser,
    setCurrentUser: currentUser => {
      setCurrentUser(currentUser)
    },
    nullCurrentUser: () => setCurrentUser(null),
    loginByModal: () => {
      setLoginDialogOpen(true)
    }
  }

  const web3WrapperContextData: WalletsProviderData = {
    wallets,
    setWallets
  }

  const closeLoginModal = () => {
    setLoginDialogOpen(false)
  }

  return (
    <RestContext.Provider value={rest}>
      <IosContext.Provider value={ios}>
        <WalletsContext.Provider value={web3WrapperContextData}>
          <CurrentUserContext.Provider value={currentUserContextData}>
            <PageWrapperDiv>
              <Routes>
                <Navigation />
              </Routes>

              <Modal
                style={modalStyle(theme)}
                isOpen={loginDialogOpen}
                contentLabel="Login Dialog"
                onRequestClose={() => closeLoginModal()}>
                <ModalCloseButton onClick={() => closeLoginModal()}>
                  <FontAwesomeIcon icon={faTimes} size="2x" />
                </ModalCloseButton>
                <LoginSlides onLoggedIn={() => {
                  setLoginDialogOpen(false)
                }} />
              </Modal>
            </PageWrapperDiv>
          </CurrentUserContext.Provider>
        </WalletsContext.Provider>
      </IosContext.Provider>
    </RestContext.Provider>
  );
}

export default App
