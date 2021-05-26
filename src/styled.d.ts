import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      background: string,
      surface: string,
      border: string,
      text: string,
      success: string,
      info: string,
      error: string,
      link: string,
      linkVisited: string,
      linkHover: string,
      linkActive: string
    }

    font: {
      text: string,
      title: string,
    }
  }
}
