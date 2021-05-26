import styled from "styled-components";
import { BaseText } from "./base";

export const Label = styled.label`
  ${BaseText}
  font-size: 14pt;
  max-width: 70%;
  display: block;
`

export const Input = styled.input`
  ${BaseText}
  background-color: transparent;
  border: 0.13rem solid ${p => p.theme.color.border};
  padding: 0.5rem;
  display: block;
  width: 100%;
  margin-top: 0.5rem;
`
