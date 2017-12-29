// Here's how permissions work:
//
// For a User to be able to do one of the actions listed here,
// their permissions level and group assignment have to allow them to do so.
//
// Permission level is 'at least', so someone with
// a 'low' permission cannot do 'high' permisison actions but
// someone with a 'high' permission can do 'low' permission actions.
// Permission level is based on the provider they used to authenticate (eg. Google, Slack).
//
// A User must also be in one of the specified groups to do the action.
// For a User to be in the 'primary' group, they need to be an 'active' Officer w/ 'primaryOfficer' set to 'true'
// For a User to be in the 'officers' group, they need to be an 'active' Officer
// For a User to be in the 'mentors' group, they need to be an 'active' Mentor

const [primary, officers, mentors] = [true, true, true];
const levels = {
  low: 10,
  high: 100,
};

export default {
  levels,
  committees: {
    create: {
      level: levels.high,
      groups: { primary },
    },
    update: {
      level: levels.high,
      groups: { primary },
    },
    destroy: {
      level: levels.high,
      groups: { primary },
    },
  },
  events: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.high,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.high,
      groups: { primary, officers },
    },
  },
  headcounts: {
    create: {
      level: levels.low,
      groups: { primary, officers, mentors },
    },
    update: {
      level: levels.high,
      groups: { primary, officers, mentors },
    },
    destroy: {
      level: levels.high,
      groups: { primary, officers, mentors },
    },
  },
  links: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.high,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.high,
      groups: { primary, officers },
    },
  },
  memberships: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.low,
      groups: { primary },
    },
    destroy: {
      level: levels.high,
      groups: { primary },
    },
    unapproved: {
      level: levels.low,
      groups: { primary },
    },
  },
  mentors: {
    create: {
      level: levels.high,
      groups: { primary, officers },
    },
    update: {
      level: levels.high,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.high,
      groups: { primary, officers },
    },
  },
  officers: {
    create: {
      level: levels.high,
      groups: { primary },
    },
    update: {
      level: levels.high,
      groups: { primary },
    },
    destroy: {
      level: levels.high,
      groups: { primary },
    },
  },
  shifts: {
    create: {
      level: levels.high,
      groups: { primary, officers },
    },
    update: {
      level: levels.high,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.high,
      groups: { primary, officers },
    },
  },
  quotes: {
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.high,
      groups: { primary, officers },
    },
    unapproved: {
      level: levels.low,
      groups: { primary, officers },
    },
  },
  users: {
    update: {
      level: levels.high,
      groups: { primary, officers },
    },
  },
};
