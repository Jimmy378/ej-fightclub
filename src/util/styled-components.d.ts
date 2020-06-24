import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colour: {
      primary01: string;
      primary02: string;
      primary03: string;
      primary04: string;
      secondary01: string;
      secondary02: string;
      secondary03: string;
      white: string;
      red: string;
      redDark: string;
    };
    borderRadius: {
      primary: string;
    };
  }
}
