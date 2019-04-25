import { ApolloServer } from 'apollo-server-express';

import models from '../models';

import { typeDefs } from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
});

export default server;
