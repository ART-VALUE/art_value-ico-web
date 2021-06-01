import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useRef } from "react";
import Modal from "react-modal";
import { useTheme } from "styled-components";
import { modalStyle, ModalContainer, ModalCloseButton } from "../style/modal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import ReactModal from "react-modal";

const AvModal: FunctionComponent<{
  isOpen: boolean,
  onClose: () => void,
  contentLabel: string
}> = ({ isOpen, onClose, contentLabel, children }) => {
  const theme = useTheme()
  const modalRef = useRef<ReactModal>(null)

  const refAsElement = modalRef.current == null ? null : modalRef.current as unknown as HTMLElement

  return <Modal
    style={modalStyle(theme)}
    isOpen={isOpen}
    contentLabel={contentLabel}
    onRequestClose={onClose}
    ref={modalRef}
    onAfterOpen={() => {
      if (refAsElement != null) disableBodyScroll(refAsElement)
    }}
    onAfterClose={() => {
      if (refAsElement != null) enableBodyScroll(refAsElement)
    }}>
    <ModalContainer>
      <ModalCloseButton onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </ModalCloseButton>
      {children}
    </ModalContainer>
  </Modal>
}

export default AvModal
