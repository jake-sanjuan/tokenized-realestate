const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query for Buy Page, where all properties are listed"
    properties: [Property!]!
    property(id: ID!): Property!
    walletAddress: WalletAddress!
  }

  type WalletAddress {
    id: ID!
    address: String!
  }

  "A User can be a Buyer, Seller or Real Estate Agent"
  type User {
    id: ID!
    name: String!
    tokenizedProperties: [TokenizedProperty!]!
    # "email: String!"
    # "isAgent: Boolean!"
    # "propertiesTokenized: [String]"
    # "propertiesSelling: [Property]"
    # "propertiesBidding: [Property]"
    # "propertiesBought: [Property]"
    # "propertiesBrokering: [Property]"
    # "URL for ID"
    # "proofOfId: String!"
    # "URL for Real Estate License, if they uploaded one"
    # "realEstateLicense: String"
  }

  type TokenizedProperty {
    tokenId: ID!
  }

  type Property {
    id: ID!
    address: String!
    city: String!
    state: String!
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
