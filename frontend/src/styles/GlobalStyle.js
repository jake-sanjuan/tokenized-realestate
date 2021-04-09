import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html, body{
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: #2B2B2B;
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

button {
  border: thin solid #FAFBFF;
  margin: 1rem 0;
    padding: 1rem 2rem;
    background-color: #214536;
    transition: all 0.3s ease;
    text-transform: uppercase;
    color: #FAFBFF;
    font-weight: 600;
    font-family: termina, sans-serif;
    letter-spacing: 0.05em;
    border-radius: 0;
    margin-right: 1rem;
    cursor: pointer;
    :hover{
      outline: none;
    border: thin solid #D7FF83;
    background-color: #D5DCFF;
    color: #214536;
    border-radius: 0;
    }
}
 
  h1 {
    font-family: orpheuspro, serif;
    font-style: italic;
    font-weight: normal;
    font-size: clamp(1.5rem, 6rem, 8rem);
    line-height: 1.4;
    letter-spacing: 0;
    margin: 0;
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
    margin: 0;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h3 {
    font-family: orpheuspro, serif;
    font-style: italic;
    font-weight: 500;
    font-size: clamp(2rem, 5rem, 8rem);
    margin: 0;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media only screen and (max-width:650px) {
      font-size: clamp(1rem, 1.5rem, 2rem);
    }
    
  }
  h4 {
    font-family: termina, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 36px;
    margin: 0;
    line-height: 1.4;
    letter-spacing: 0.05;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media only screen and (max-width:650px) {
      font-size: clamp(0.8rem, 1rem, 1.2rem);
    }
  }
  h5 {
    font-family: termina, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 24px;
    margin: 0;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h6 {
    font-family: termina, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 18px;
    margin: 0;
    line-height: 1.4;
    text-transform: uppercase;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p{
    font-family: termina, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: clamp(1.2rem, 1.5rem, 2.2rem);
    line-height: 1.4;
    margin: 0;
    padding: 0;
    letter-spacing: 0.08em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media only screen and (max-width:650px) {
      font-size: clamp(0.8rem, 1rem, 1.2rem);
    }
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  span {
    font-family: termina, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: clamp(1.2rem, 1.5rem, 2.2rem);
    line-height: 1.4;
    margin: 0;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media only screen and (max-width:650px) {
      font-size: clamp(0.8rem, 1rem, 1.2rem) !important;
    }
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
