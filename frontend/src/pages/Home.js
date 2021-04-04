import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";

const Home = () => {
  return (
    <Container green>
      <Hero>
        <h1>
          Buy and sell real estate in a{" "}
          <AccentuatedText>decentralized</AccentuatedText> marketplace
        </h1>
        <Button to="/buy">Browse Properties</Button>
      </Hero>
    </Container>
  );
};

export default Home;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  height: 100vh;
  h1 {
    color: ${(props) => props.theme.white};
  }
`;

const AccentuatedText = styled.span`
  font-family: aktiv-grotesk, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 88px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
