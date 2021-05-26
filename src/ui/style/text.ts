import styled from "styled-components"
import { BaseText, BaseTitle } from "./base"

export const P = styled.p`
  ${BaseText}
  font-size: 14pt;
`

export const A = styled.a`
  ${BaseText}

  color: ${p => p.theme.color.link};

  &:visited {
    color: ${p => p.theme.color.linkVisited};
  }

  &:hover {
    color: ${p => p.theme.color.linkHover};
  }

  &:active {
    color: ${p => p.theme.color.linkActive};
    border: 1px dashed white;
  }
`

export const H1 = styled.h1`
  ${BaseTitle}
  font-size: 40pt;
`

export const H2 = styled.h2`
  ${BaseTitle}
  font-size: 24pt;
  margin-top: 0.2em;
`

export const H3 = styled.h3`
  ${BaseTitle}
`

export const H4 = styled.h4`
  ${BaseTitle}
`

export const SpanItalic = styled.span`
  font-style: italic;
`

export const MonoData = styled.span`
  font-family: monospace;
  font-size: 12pt;
`

export const Pre = styled.pre`
  color: ${p => p.theme.color.text};
`

export const PreItalic = styled(Pre)`
  font-style: italic;
`

export const StrongNumber = styled.strong`
  font-size: 16pt;
`
