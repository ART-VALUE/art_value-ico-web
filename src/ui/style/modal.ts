import ReactModal from "react-modal";
import { DefaultTheme } from "styled-components";

export const modalStyle = (theme: DefaultTheme) => ({
  content: {
    backgroundColor: theme.color.background,
    position: 'relative',
    inset: 'unset',
    maxWidth: '40rem'
  },
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
} as ReactModal.Styles)
