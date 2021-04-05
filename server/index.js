const { ApolloServer, MockList } = require("apollo-server");
const typeDefs = require("./schema");

const mocks = {
  Query: () => ({
    properties: () => new MockList([6, 9]),
  }),
  Property: () => ({
    id: () => "property-01",
    address: () => "123 Fake Avenue",
    area: () => "Calgary, Alberta",
    country: () => "Canada",
    price: () => 1234.56,
    beds: () => 5,
    baths: () => 6.5,
    interiorSize: () => 123456,
    ExteriorSize: () => "78910",
    mainImage: () =>
      "https://source.unsplash.com/featured/300x300?luxury,house",
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
    agent: () => "user-02",
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
