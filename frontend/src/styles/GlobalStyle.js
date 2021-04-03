import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://use.typekit.net/pgn2kgo.css");
 
  h1 {
    font-family: orpheuspro, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 144px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h2 {
    font-family: orpheuspro, serif;
    font-style: normal;
font-weight: bold;
font-size: 96px;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
  }
  h3 {
    font-family: aktiv-grotesk, sans-serif;
    font-style: normal;
font-weight: 500;
font-size: 64px;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
  }
  h4 {
    font-family: aktiv-grotesk, sans-serif;
font-weight: 500;
font-style: normal;
font-size: 48px;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
  }
  h5 {
    font-family: aktiv-grotesk, sans-serif;
    font-weight: 500;
font-style: normal;
    font-size: 36px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h6 {
    font-family: aktiv-grotesk, sans-serif;
    font-weight: 500;
font-style: normal;
font-size: 18px;
text-transform: uppercase;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
  }

  p{
    font-family: brandon-grotesque, sans-serif;
    font-weight: 400;
font-style: normal;
font-size: 18px;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
