import React from "react";
import Container from "../components/Container";
import TokenizeForm from "../components/TokenizeProperty/TokenizeForm";

const Tokenize = ({ client }) => {
  return (
    <Container green>
      <TokenizeForm client={client} />
    </Container>
  );
};

export default Tokenize;
