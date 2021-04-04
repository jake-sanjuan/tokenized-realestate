import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Button = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: center !important;
  text-align: center;
  padding: 1.5rem 2rem;
  font-family: aktiv-grotesk, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: clamp(0.5rem, 1rem, 2rem);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  color: ${(props) => props.theme.black};
  letter-spacing: 0.03em;
  border: none;
  transition: all 0.3s linear;
  background: ${(props) => props.theme.neon};
  margin: 4px;
  max-width: 100%;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  margin-right: 8px;

  :hover {
    background: ${(props) => props.theme.neon};
    color: ${(props) => props.theme.black};
    box-shadow: inset 0 0 60px ${(props) => props.theme.lilac},
      inset 20px 0 80px ${(props) => props.theme.lilac},
      inset -20px 0 80px ${(props) => props.theme.lilac},
      inset 20px 0 300px ${(props) => props.theme.lilac},
      inset -20px 0 300px ${(props) => props.theme.lilac},
      0 0 20px ${(props) => props.theme.neon},
      -5px 0 40px ${(props) => props.theme.neon},
      5px 0 40px ${(props) => props.theme.neon};
  }
  ${(props) =>
    props.primarySmall &&
    css`
      padding: 0.8rem 1.5rem;
      @media only screen and (max-width: 650px) {
        padding: 0.6rem 0.8rem;
      }
    `}
  ${(props) =>
    props.secondarySmall &&
    css`
      padding: 0.8rem 1.5rem;
      background: ${(props) => props.theme.lilac};
      @media only screen and (max-width: 650px) {
        padding: 0.6rem 0.8rem;
      }
      :hover {
        background: ${(props) => props.theme.neon};
        color: ${(props) => props.theme.black};
        box-shadow: none;
      }
    `}
`;

export default Button;
