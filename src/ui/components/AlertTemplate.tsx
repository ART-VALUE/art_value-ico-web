import { faCheck, faExclamation, faInfo, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FunctionComponent } from "react"
import { AlertComponentPropsWithStyle } from "react-alert"
import styled, { useTheme } from "styled-components"

const AlertContainerDiv = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 0.7rem 0.9rem;
`

const AlertCloseButton = styled.button`
  padding: 0.3rem;
  cursor: pointer;
  margin-left: 0.5rem;
  background: none;
  border: none;
`

const AlertIconSpan = styled.span`
  margin-right: 0.5rem;
`

const AlertTemplate: FunctionComponent<AlertComponentPropsWithStyle> = ({
  style, options, message, close
}) => {
  const theme = useTheme()

  return (<AlertContainerDiv style={style}>
    <AlertIconSpan>{options.type == null ? '' : ({
      info: <FontAwesomeIcon icon={faInfo} size="lg" color={theme.color.info} />,
      success: <FontAwesomeIcon icon={faCheck} size="lg" color={theme.color.success} />,
      error: <FontAwesomeIcon icon={faExclamation} size="lg" color={theme.color.error} />
    })[options.type]}</AlertIconSpan>
    {message}
    <AlertCloseButton onClick={close}><FontAwesomeIcon icon={faTimes} size="lg" /></AlertCloseButton>
  </AlertContainerDiv>)
}

export default AlertTemplate
