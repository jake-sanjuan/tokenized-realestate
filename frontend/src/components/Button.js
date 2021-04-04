import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Button = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 40px;
  font-family: aktiv-grotesk, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  color: ${(props) => props.theme.black};
  letter-spacing: 0.03em;
  border: none;
  transition: all 0.3s linear;
  background: ${(props) => props.theme.neon};
  margin: 0;
  width: fit-content;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  
    margin-right: 8px;
  }
  :hover {
    background: ${(props) => props.theme.neon};
    color: ${(props) => props.theme.black};
    box-shadow:
    inset 0 0 60px ${(props) => props.theme.lilac},
    inset 20px 0 80px ${(props) => props.theme.lilac},
    inset -20px 0 80px ${(props) => props.theme.lilac},
    inset 20px 0 300px ${(props) => props.theme.lilac},
    inset -20px 0 300px ${(props) => props.theme.lilac},
    0 0 20px ${(props) => props.theme.lilac},
    -5px 0 40px ${(props) => props.theme.lilac},
    5px 0 40px ${(props) => props.theme.lilac};

  }
  
`;

export default Button;
