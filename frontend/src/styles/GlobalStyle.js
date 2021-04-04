import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html, body{
    padding: 0;
    margin: 0;
    font-size: 16px;
    /* box-sizing: border-box; */
  }

  body::-webkit-scrollbar {
    width: 1em;
    background-color: #D5DCFF;
}

body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
    background-color: #2B2B2B;
}
 
  h1 {
    font-family: orpheuspro, serif;
    font-style: italic;
    font-weight: normal;
    font-size: clamp(1.5rem, 6rem, 8rem);
    line-height: 1.4;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media only screen and (max-width:650px) {
      font-size: clamp(1.5rem, 2rem, 4rem);
    }
  }
  h2 {
    font-family: orpheuspro, serif;
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h3 {
    font-family: aktiv-grotesk, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: clamp(2rem, 5rem, 8rem);
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
  }
  h4 {
    font-family: aktiv-grotesk, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 36px;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h5 {
    font-family: aktiv-grotesk, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 24px;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h6 {
    font-family: aktiv-grotesk, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 18px;
    line-height: 1.4;
    text-transform: uppercase;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p{
    font-family: Aktiv Grotesk, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: clamp(1.2rem, 1.5rem, 2.2rem);
    line-height: 1.4;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media only screen and (max-width:650px) {
      font-size: clamp(1rem, 1.2rem, 2rem);
    }
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  span {
    font-family: Aktiv Grotesk, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: clamp(1.2rem, 1.5rem, 2.2rem);
    line-height: 1.4;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media only screen and (max-width:650px) {
      font-size: clamp(1rem, 1.2rem, 1.5rem) !important;
    }
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
