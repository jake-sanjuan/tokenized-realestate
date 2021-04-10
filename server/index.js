const { ApolloServer, MockList } = require("apollo-server");
const typeDefs = require("./schema");

const mocks = {
  Query: () => ({
    properties: () => new MockList([6, 9]),
    property: () => Property,
  }),
  Property: () => ({
    id: () => "property-1",
    address: () => "123 Fake Avenue",
    city: () => "Calgary",
    state: () => "Alberta",
    country: () => "Canada",
    postalCode: () => "X1X 1X1",
    price: () => 1234.56,
    beds: () => 5,
    baths: () => 6.5,
    interiorSize: () => 123456,
    exteriorSize: () => 78910,
    mainImage: () =>
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    secondaryImage: () =>
      "https://images.pexels.com/photos/6315797/pexels-photo-6315797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    yearBuilt: () => 2021,
    status: () => "For Sale",
    amenities: () => [
      "Barn",
      "Deck",
      "Granite Countertops",
      "Guest House",
      "Horse Facilities",
      "Library",
      "Security System",
      "Tennis Court",
      "walk-in closet(s)",
      "Billiards Room",
      "Hardwood Flooring",
      "Indoor Pool",
      "In-Home Fitness Center",
      "Media Room / Home Theater",
      "Stables",
      "Staff Quarters",
      "Steam Room",
      "Underground Lawn Sprinkler",
      "Marble Flooring",
      "Courtyard",
      "Caretaker House",
      "4+ Fireplaces",
      "Vaulted Ceilings",
      "in-law suite",
    ],
    features: () => ["Mountain Views, Scenic View"],
    owner: () => "user-01",
    agent: () => "user-01",
    propertyTaxes: () => 31667,
    parking: () => "garage",
    bids: () => 21,
  }),
  User: () => ({
    id: () => "user-1",
    name: () => "John Doe",
    tokenizedProperties: () => ["property-1"],
  }),
};

const server = new ApolloServer({
  typeDefs,
  mocks,
});

server.listen().then(() => {
  console.log(`
          🚀 Server is running!
          🔉 Listening on port 4000
          📭 Query at https://studio.apollographql.com/dev
      `);
});
