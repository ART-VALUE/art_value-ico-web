import ReactModal from "react-modal";
import styled, { DefaultTheme } from "styled-components";

export const modalStyle = (theme: DefaultTheme) => ({
  content: {
    position: 'relative',
    inset: 'unset',
    maxWidth: '40rem',
    maxHeight: '100%',
    background: 'none',
    padding: '0',
    border: 'none',
    overflowY: 'auto',
    borderRadius: '0'
  },
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    width: '100vw',
    height: '100vh',
    padding: '1rem'
  }
} as ReactModal.Styles)

export const ModalContainer = styled.div`
  background-color: ${p => p.theme.color.background};
  padding: 1.5rem;
  max-height: 100%;
  overflow-y: auto;
  position: relative;
`

export const ModalCloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  padding: 1rem 1rem;
  color: #fff;
  cursor: pointer;
`
