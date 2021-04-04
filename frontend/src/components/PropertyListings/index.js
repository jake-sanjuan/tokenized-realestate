import React from "react";
import styled from "styled-components";
import ListingCard from "./ListingCard";

const PropertyList = () => {
  let property = {
    id: "prop-1",
    price: 1920.14,
    address: "123 Fake Avenue SW",
    area: "Calgary, Alberta",
    country: "Canada",
    beds: 4,
    baths: 5.5,
    lot: "50' X 120'",
    bids: 12,
    lastDay: "April 12 2021",
    url: "/property-1",
  };
  return (
    <Container>
      <ListingCard property={property} key={property.id} />
      <ListingCard property={property} />
      <ListingCard property={property} />
      <ListingCard property={property} />
      <ListingCard property={property} />
      <ListingCard property={property} />
    </Container>
  );
};

export default PropertyList;

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, 333px);
  grid-gap: 0 40px;
  justify-content: space-around;
  @media (max-width: 600px) {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, 4fr);
    grid-gap: 0 3%;
  }
`;
