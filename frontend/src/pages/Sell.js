import React from "react";
import Container from "../components/Container";
import SellPropertyForm from "../components/SellProperty";

const Sell = () => {
  return (
    <Container green>
      <h1>Sell your property</h1>
      <SellPropertyForm />
    </Container>
  );
};

export default Sell;
