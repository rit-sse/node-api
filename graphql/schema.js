import { gql } from 'apollo-server-express';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  scalar DateTime

  type Committee {
    name: String!
    description: String
    isActive: Boolean!
  }

  type Event {
    name: String!
    description: String
    startDate: DateTime!
    endDate: DateTime!
    committee: Committee!
  }

  type Query {
    event(id: ID!): Event
  }
`;
