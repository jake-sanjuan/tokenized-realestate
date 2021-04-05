import React from "react";
import Container from "../components/Container";
import PropertyList from "../components/PropertyListings";

const Buy = () => {
  return (
    <Container>
      <h1 style={{ alignSelf: "center" }}>Find your future home.</h1>
      <PropertyList />
    </Container>
  );
};

export default Buy;
