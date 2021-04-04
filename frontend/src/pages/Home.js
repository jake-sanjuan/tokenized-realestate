import React from "react";
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
        <p>
          We make it easy to diversify your investments, discover new
          properties, speed up real estate transactions, and maintain registry
          of titles. <span>All at a lower cost.</span>
        </p>
        <Button to="/properties">Browse Properties</Button>
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
  width: clamp(95%, 85%, 100%);
  height: 100vh;
  h1 {
    color: ${(props) => props.theme.white};
    line-height: 1;
    margin: 0;
    margin-top: 4rem;
    margin-bottom: clamp(0.5rem, 1rem, 2rem);
  }
  p {
    color: ${(props) => props.theme.white};
    width: 80%;
    margin: 0;
    margin-bottom: clamp(1rem, 2rem, 4rem);
    opacity: 0.9;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}) {
    span {
      margin-bottom: clamp(0.2rem, 0.5rem, 1rem);
      font-size: clamp(1rem, 2rem, 3rem);
      line-height: clamp(1rem, 2rem, 3rem);
    }
  }
`;

const AccentuatedText = styled.span`
  font-family: aktiv-grotesk, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: clamp(1rem, 5rem, 7rem);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media only screen and (max-width: 650px) {
    font-size: clamp(0.8rem, 1rem, 3rem);
  }
`;
