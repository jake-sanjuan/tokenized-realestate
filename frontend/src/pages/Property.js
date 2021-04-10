import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import QueryResult from "../components/QueryResult";

const GET_A_PROPERTY = gql`
  query {
    properties {
      id
      address
      area
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

const Property = ({ property, id }) => {
  const { loading, error, data } = useQuery(GET_A_PROPERTY);
  const {
    address,
    area,
    country,
    postalCode,
    price,
    beds,
    baths,
    bids,
    interiorSize,
    exteriorSize,
    mainImage,
    secondaryImage,
    owner,
    agent,
    amenities,
    features,
    parking,
    propertyTaxes,
  } = property;

  return (
    <Container>
      <MainImage src={mainImage} alt={`property-${id}-image-1`} />
      <SecondaryImage src={secondaryImage} alt={`property-${id}-image-2`} />
    </Container>
  );
};

export default Property;

const Container = styled.article`
  display: flex;
  flex-direction: column;
`;

const MainDetails = styled.section`
  display: flex;
  flex-direction: column;
  order: 2;
  width: 100%;
  height: 100vh;
`;

const SecondaryDetails = styled.section`
  display: flex;
  flex-direction: column;
  order: 3;
`;

const MainImage = styled.img`
  order: 1;
`;

const SecondaryImage = styled.img`
  order: 4;
`;
