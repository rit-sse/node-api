'use strict';

const [primary, officers, mentors] = [true, true, true];
const levels = {
  low: 10,
  low: 100,
};

export default {
  levels,
  agendas: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.low,
      groups: { primary, officers },
    },
  },
  committees: {
    create: {
      level: levels.low,
      groups: { primary },
    },
    update: {
      level: levels.low,
      groups: { primary },
    },
    destroy: {
      level: levels.low,
      groups: { primary },
    },
  },
  events: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.low,
      groups: { primary, officers },
    },
  },
  headcounts: {
    create: {
      level: levels.low,
      groups: { primary, officers, mentors },
    },
    update: {
      level: levels.low,
      groups: { primary, officers, mentors },
    },
    destroy: {
      level: levels.low,
      groups: { primary, officers, mentors },
    },
  },
  lingo: {
    update: {
      level: levels.low,
      groups: { primary },
    },
    destroy: {
      level: levels.low,
      groups: { primary },
    },
    unapproved: {
      level: levels.low,
      groups: { primary },
    },
  },
  links: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.low,
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
      level: levels.low,
      groups: { primary },
    },
    unapproved: {
      level: levels.low,
      groups: { primary },
    },
  },
  mentors: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.low,
      groups: { primary, officers },
    },
  },
  officers: {
    create: {
      level: levels.low,
      groups: { primary },
    },
    update: {
      level: levels.low,
      groups: { primary },
    },
    destroy: {
      level: levels.low,
      groups: { primary },
    },
  },
  shifts: {
    create: {
      level: levels.low,
      groups: { primary, officers },
    },
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.low,
      groups: { primary, officers },
    },
  },
  quotes: {
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.low,
      groups: { primary, officers },
    },
    unapproved: {
      level: levels.low,
      groups: { primary, officers },
    },
  },
  tips: {
    update: {
      level: levels.low,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.low,
      groups: { primary, officers },
    },
    unapproved: {
      level: levels.low,
      groups: { primary, officers },
    },
  },
};
