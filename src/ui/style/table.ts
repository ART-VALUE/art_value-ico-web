import styled, { css } from "styled-components"
import { BaseText } from "./base"

export const Table = styled.table`
  ${BaseText}
  border-collapse: collapse;
`

const thTdCommon = css`
  padding: 0.7em 0.6em;
`

export const Th = styled.th`
  ${thTdCommon}

  border-right: 1px solid white;

  &:last-child {
    border-right: none;
  }
`

export const Tr = styled.tr`
  ${thTdCommon}
  border-bottom: 1px solid white;

  &:last-child {
    border-bottom: none;
  }
`

export const TrHead = styled(Tr)`
  border-bottom: 1px solid white;

  &:last-child {
    border-bottom: 1px solid white;
  }
`

export const Td = styled.td`
  ${thTdCommon}
  border-right: 1px solid white;

  &:last-child {
    border-right: none;
  }
`

export const TdAlignRight = styled(Td)`
  text-align: right;
`
export const TdItalic = styled(Td)`
  font-style: italic;
`

export const TdIconContainer =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
