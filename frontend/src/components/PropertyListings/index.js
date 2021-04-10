import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import QueryResult from "../QueryResult";
import ListingCard from "./ListingCard";

const GET_ALL_PROPERTIES = gql`
  query {
    properties {
      id
      address
      city
      state
      country
      postalCode
      price
      beds
      baths
      bids
      interiorSize
      exteriorSize
      mainImage
      secondaryImage
      owner {
        id
        name
      }
      agent {
        id
        name
      }
      amenities
      features
      parking
      propertyTaxes
    }
  }
`;

const PropertyList = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROPERTIES);
  return (
    <Container grid>
      <QueryResult error={error} data={data} loading={loading}>
        {data?.properties?.map((property) => {
          return <ListingCard key={property.id} property={property} />;
        })}
      </QueryResult>
    </Container>
  );
};

export default PropertyList;

const Container = styled.div`
  display: flex;
  justify-content: ${(p) => (p.grid ? "center" : "top")};
  flex-direction: ${(p) => (p.grid ? "row" : "column")};
  flex-wrap: wrap;
  position: relative;
  align-self: center;
  flex-grow: 1;
  /* display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, 333px);
  grid-gap: 0 40px;
  justify-content: space-around; */

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;
