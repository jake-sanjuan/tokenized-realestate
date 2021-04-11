import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoLine from "../assets/logo-line.png";
import LogoFilled from "../assets/logo-filled.png";
import Button from "./Button";

const NavBar = ({ client }) => {
  const [hover, setHover] = useState(false);

  return (
    <Nav>
      <LogoLink
        to="/"
        onMouseEnter={() => setHover(!hover)}
        onMouseLeave={() => setHover(!hover)}
      >
        {!hover && <img src={LogoLine} alt="bridge-logo" />}
        {hover && <img src={LogoFilled} alt="bridge-logo" />}
      </LogoLink>

      <LinkGroup>
        <NavLink to="/buy">Buy</NavLink>
        <Button to="/tokenize">Tokenize Property</Button>
      </LinkGroup>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  padding: 10px 40px;
  z-index: 10;
  transition: all 0.3s ease;
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
  align-self: flex-start;
  overflow: hidden;
  background: ${(props) => props.theme.green};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: thin solid ${(props) => props.theme.white};
  @media (max-width: 600px) {
    padding: 5px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px;
  img {
    width: 40px;
    height: 40px;
  }
`;

// const Toggle = styled.button.attrs((props) => ({
//   type: props.type || "button",
// }))`
//   position: absolute;
//   top: 18px;
//   right: 20px;
//   cursor: pointer;
//   color: rgba(255, 255, 255, 0.8);
//   display: none;
//   flex-direction: row;
//   align-items: center;
//   padding: 0.6rem 1.5rem !important;
//   font-family: termina, sans-serif;
//   font-style: normal;
//   font-weight: 700;
//   font-size: 16px;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-transform: uppercase;
//   color: ${(props) => props.theme.black};
//   letter-spacing: 0.03em;
//   border: none;
//   transition: all 0.3s linear;
//   background: ${(props) => props.theme.neon};
//   margin: 0;
//   width: fit-content;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;

//   margin-right: 8px;

//   :hover {
//     background: ${(props) => props.theme.neon};
//     color: ${(props) => props.theme.black};
//     box-shadow: inset 0 0 60px ${(props) => props.theme.lilac},
//       inset 20px 0 80px ${(props) => props.theme.lilac},
//       inset -20px 0 80px ${(props) => props.theme.lilac},
//       inset 20px 0 300px ${(props) => props.theme.lilac},
//       inset -20px 0 300px ${(props) => props.theme.lilac},
//       0 0 20px ${(props) => props.theme.lilac},
//       -5px 0 40px ${(props) => props.theme.lilac},
//       5px 0 40px ${(props) => props.theme.lilac};
//   }

//   @media only screen and (max-width: 600px) {
//     display: ${(props) => (props.expanded === true ? "none" : "flex")};
//   }
// `;

// const ExpandedMenu = styled.nav`
//   display: ${(props) => (props.expanded === true ? "flex" : "none")};
//   flex-direction: column;
//   height: fit-content;
//   position: -webkit-sticky; /* for Safari */
//   position: sticky;
//   top: 0;
//   align-self: flex-start;
//   overflow: hidden;
//   background: ${(props) => props.theme.green};
//   z-index: 11;
//   border-bottom: thin solid ${(props) => props.theme.white};
//   @media only screen and (max-width: 600px) {
//     display: ${(props) => (props.expanded === true ? "flex" : "none")};
//   }
// `;

const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  span {
    font-family: termina, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-transform: uppercase;
    color: ${(props) => props.theme.white};
    letter-spacing: 0.03em;
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.white};
  text-decoration: none;
  font-family: termina, sans-serif;
  font-weight: 700;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: clamp(0.6rem, 1rem, 1.5rem);
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  margin: 0 16px 0 0;
  transition: all 0.3s ease;
  &:hover,
  :active {
    color: ${(props) => props.theme.neon};
  }
  @media (max-width: 600px) {
    margin: 0 8px 0 0;
  }
`;
