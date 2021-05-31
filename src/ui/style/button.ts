import styled from "styled-components";
import { BaseTitle } from "./base";

export const Button = styled.button`
  ${BaseTitle}
  border: 2px solid ${p => p.theme.color.border};
  background-color: ${p => p.theme.color.surface};
  padding: 0.5em 0.6em;
  text-transform: uppercase;
  font-size: 13pt;
  font-weight: 800;
  display: block;
  margin-top: 1rem;
  cursor: pointer;
`

export const ButtonBig = styled(Button)`
  font-size: 20pt;
`

export const ModalCloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  padding: 1rem;
  color: #fff;
  cursor: pointer;
`

export const ImageButton = styled.button`
  width: 5rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 5rem;
  height: 3rem;
  padding: 0.5em;
  margin-right: 0.5rem;
  margin-bottom: 0.3rem;
  box-shadow: 0.25rem 0.25rem #bbb;

  > img {
    max-width: 100%;
    max-height: 100%;
    /* fill: ; */
    padding: 0;
    margin: 0;
  }
`
