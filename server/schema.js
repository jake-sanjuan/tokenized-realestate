const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query for Buy Page, where all properties are listed"
    properties: [Property!]!
  }

  "A User can be a Buyer, Seller or Real Estate Agent"
  type User {
    id: ID!
    name: String!
    email: String!
    userType: Int
    propertiesSelling: [Property!]!
    propertiesBidding: [Property!]!
    propertiesBought: [Property!]!
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
    price: Float!
    beds: Float!
    baths: Float!
    interiorSize: Int!
    ExteriorSize: Int!
    mainImage: String!
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
  }
`;

module.exports = typeDefs;
