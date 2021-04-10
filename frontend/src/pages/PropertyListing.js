import { gql, useQuery } from "@apollo/client";
import React from "react";
import QueryResult from "../components/QueryResult";
import Container from "../components/Container";
import { useParams } from "react-router";
import Property from "../components/Property/Property";

const PropertyListing = () => {
  const params = useParams();
  const currentProperty = params.id;
  console.log(params.id);

  const GET_A_PROPERTY = gql`
    query {
      property(id: "property-1") {
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
  const { loading, error, data } = useQuery(GET_A_PROPERTY);
  return (
    <Container grid>
      <QueryResult error={error} data={data} loading={loading}>
        {data?.properties?.map((property) => {
          return <Property key={currentProperty} property={property} />;
        })}
      </QueryResult>
    </Container>
  );
};

export default PropertyListing;
