const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query for Buy Page, where all properties are listed"
    properties: [Property!]!
    property(id: ID!): Property!
  }

  "A User can be a Buyer, Seller or Real Estate Agent"
  type User {
    id: ID!
    name: String!
    email: String!
    isAgent: Boolean
    propertiesSelling: [Property]
    propertiesBidding: [Property]
    propertiesBought: [Property]
    propertiesBrokering: [Property]
    "URL for ID"
    proofOfId: String!
    "URL for Real Estate License, if they uploaded one"
    realEstateLicense: String
  }

  type Property {
    id: ID!
    address: String!
    area: String!
    country: String!
    postalCode: String!
    price: Float!
    beds: Float!
    baths: Float!
    interiorSize: Int!
    exteriorSize: Int!
    mainImage: String!
    secondaryImage: String!
    yearBuilt: Int
    "For Sale or Sold"
    status: String!
    amenities: [String]
    features: [String]
    "URL for property title"
    title: String
    owner: User!
    agent: User!
    "Number of bids"
    bids: Int
    parking: String
    propertyTaxes: Int
  }
`;

module.exports = typeDefs;
