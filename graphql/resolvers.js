import { GraphQLDateTime } from 'graphql-iso-date';
import { fromGlobalId } from 'graphql-relay';

const resolvers = {
  DateTime: GraphQLDateTime,
  Committee: {
    async isActive(committee, _, { models }) {
      const numActiveOfficers = models.Officer
        .scope({ method: ['active', new Date()] })
        .count({ where: { committeeName: committee.name } });
      return numActiveOfficers > 0;
    },
  },
  Event: {
    committee(event) {
      return event.getCommittee();
    },
  },
  Query: {
    event(_, { id }, { models }) {
      return models.Event.findOne({
        where: {
          uuid: fromGlobalId(id).id,
        },
      });
    },
  },
};

export default resolvers;
