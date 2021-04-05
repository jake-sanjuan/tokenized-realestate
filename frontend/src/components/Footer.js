import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <p>© 2021 Bridges</p>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  border-top: thin solid ${(props) => props.theme.white};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  background-color: ${(props) => props.theme.green};
  p {
    margin: 0;
    padding: 0;
    font-size: clamp(1rem, 1.2rem, 2rem);
  }
`;
