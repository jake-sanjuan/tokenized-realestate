import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";
import Investments from "../assets/graphics/investments.svg";
import Discover from "../assets/graphics/eye.svg";
import Faster from "../assets/graphics/faster.svg";
import Registry from "../assets/graphics/registry.svg";

const Home = () => {
  return (
    <Container green>
      <Hero>
        <Line>
          <p>We make it easy to</p>
        </Line>
        <Line>
          <img src={Investments} alt="diverse-investment" />
          <h3>diversify your investments,</h3>
        </Line>
        <Line>
          <h3>discover new properties,</h3>
          <img src={Discover} alt="discover-new" />
        </Line>
        <Line>
          <img src={Faster} alt="faster-processing" />
          <h3>process real estate transactions faster,</h3>
        </Line>
        <Line>
          <p>&</p>
          <h3>maintain a registry of titles.</h3>
          <img src={Registry} alt="protected-registry" />
        </Line>
        <h4>Decentralized. Faster. Lower Cost.</h4>
        <Button to="/buy">Browse Properties</Button>
      </Hero>
    </Container>
  );
};

export default Home;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  p {
    text-transform: uppercase;
    font-family: termina, sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 0.05;
    font-size: 1rem;
    padding: 0;
  }
  img {
    padding: 8px;
    margin: 0 1rem;
  }
  @media only screen and (max-width: 650px) {
    flex-direction: column;
    img {
      height: 2rem;
    }
    :nth-of-type(even) {
      flex-direction: column-reverse;
    }
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  h3 {
    font-size: 3rem;
  }
  h4 {
    margin-bottom: 2rem;
    text-transform: uppercase;
    text-align: center;
  }
  p {
    text-align: center;
  }
  div {
    :last-of-type {
      margin-bottom: 1rem;
    }
    @media only screen and (max-width: 650px) {
      p {
        font-size: clamp(0.6rem, 0.8rem, 1rem);
      }
      h3 {
        font-size: clamp(1.2rem, 1.5rem, 1.8rem);
      }
      h4 {
        font-size: clamp(0.6rem, 0.8rem, 1rem) !important;
      }
    }
  }
`;
