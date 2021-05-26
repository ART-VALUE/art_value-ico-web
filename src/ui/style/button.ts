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
