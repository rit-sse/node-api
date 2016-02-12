'use strict';

const [primary, officers, mentors] = [true, true, true];
const levels = {
  low: 10,
  high: 100,
};

export default {
  levels,
  agendas: {
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
  lingo: {
    update: {
      level: levels.high,
      groups: { primary },
    },
    destroy: {
      level: levels.high,
      groups: { primary },
    },
    unapproved: {
      level: levels.high,
      groups: { primary },
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
      level: levels.high,
      groups: { primary, officers },
    },
    update: {
      level: levels.high,
      groups: { primary },
    },
    destroy: {
      level: levels.high,
      groups: { primary },
    },
    unapproved: {
      level: levels.high,
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
  tips: {
    update: {
      level: levels.high,
      groups: { primary, officers },
    },
    destroy: {
      level: levels.high,
      groups: { primary, officers },
    },
    unapproved: {
      level: levels.high,
      groups: { primary, officers },
    },
  },
};
