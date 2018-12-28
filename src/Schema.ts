const { buildSchema } = require('graphql');

export const GraphQLSchema = buildSchema(`

    type Location {
        _id: ID
        longitude: String!
        latitude: String!
    }

    type User {
        _id: ID
        name: String!
    }

    input LocationInput {
        longitude: String!
        latitude: String!
    }

    type RootMutation {
        createLocation(locationInput : LocationInput!): Location
    }

    type RootQuery {
        locations: [Location!]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`)