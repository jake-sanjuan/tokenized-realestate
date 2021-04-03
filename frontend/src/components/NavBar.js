import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Logo from "../assets/logo192.png";

const Header = ({ siteTitle }) => {
  return (
    <Nav>
      <LogoLink to="/">
        <img src={Logo} alt="bridge-logo" />
      </LogoLink>
      <LinkGroup>
        <NavLink to="/buy">Buy</NavLink>
        <NavLink to="/sell">Sell</NavLink>
        <NavLink to="/agents">Agents</NavLink>
        <NavLink to="/account">Account</NavLink>
      </LinkGroup>
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  background: ${(props) => props.theme.green};
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: thin solid ${(props) => props.theme.white};
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

const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  a {
    color: ${(props) => props.theme.white};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    padding: 0 16px 0 0;
    transition: all 0.3s ease;
    :hover {
      color: ${(props) => props.theme.neon};
    }
  }
`;
const NavLink = styled(Link)`
  color: ${(props) => props.theme.white};
  text-decoration: none;
  font-family: aktiv-grotesk, sans-serif;
  font-weight: 500;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  padding: 0 16px 0 0;
  transition: all 0.3s ease;
  &:hover,
  :active {
    color: ${(props) => props.theme.neon};
  }
`;
