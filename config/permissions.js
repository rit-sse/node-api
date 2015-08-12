var primary, officers, mentors = true;
var levels = {
  low: 10,
  high: 100
};

export var permissions =  {
  levels,
  agenda: {
    create: {
      levels: levels.low,
      groups: { primary, officers }
    },
    update: {
      levels: levels.high,
      groups: { primary, officers }
    },
    destroy: {
      levels: levels.high,
      groups: { primary, officers }
    },
  },
  events: {
    create: {
      levels: levels.low,
      groups: { primary, officers }
    },
    update: {
      levels: levels.high,
      groups: { primary, officers }
    },
    destroy: {
      levels: levels.high,
      groups: { primary, officers }
    }
  },
  committees: {
    create: {
      levels: levels.high,
      groups: { primary }
    },
    update: {
      levels: levels.high,
      groups: { primary }
    },
    destroy: {
      levels: levels.high,
      groups: { primary }
    }
  },
  headcounts: {
    create: {
      levels: levels.low,
      groups: { primary, officers, mentors }
    },
    update: {
      levels: levels.high,
      groups: { primary, officers, mentors }
    },
    destroy: {
      levels: levels.high,
      groups: { primary, officers, mentors }
    }
  },
  lingo: {
    update: {
      levels: levels.high,
      groups: { primary }
    },
    destroy: {
      levels: levels.high,
      groups: { primary }
    },
    unapproved: {
      levels: levels.high,
      groups: { primary }
    }
  },
  links: {
    create: {
      levels: levels.low,
      groups: { primary, officers }
    },
    update: {
      levels: levels.high,
      groups: { primary, officers }
    },
    destroy: {
      levels: levels.high,
      groups: { primary, officers }
    }
  },
  memberships: {
    create: {
      levels: levels.high,
      groups: { primary }
    },
    update: {
      levels: levels.high,
      groups: { primary }
    },
    destroy: {
      levels: levels.high,
      groups: { primary }
    },
    unapproved: {
      levels: levels.high,
      groups: { primary }
    }
  },
  mentors: {
    create: {
      levels: levels.high,
      groups: { primary, officers }
    },
    update: {
      levels: levels.high,
      groups: { primary, officers }
    },
    destroy: {
      levels: levels.high,
      groups: { primary, officers }
    }
  },
  officers: {
    create: {
      levels: levels.high,
      groups: { primary }
    },
    update: {
      levels: levels.high,
      groups: { primary }
    },
    destroy: {
      levels: levels.high,
      groups: { primary }
    }
  },
  quotes: {
    update: {
      levels: levels.high,
      groups: { primary, officers }
    },
    destroy: {
      levels: levels.high,
      groups: { primary, officers }
    },
    unapproved: {
      levels: levels.high,
      groups: { primary, officers}
    }
  },
  tips: {
    update: {
      levels: levels.high,
      groups: { primary, officers }
    },
    destroy: {
      levels: levels.high,
      groups: { primary, officers }
    },
    unapproved: {
      levels: levels.high,
      groups: { primary, officers}
    }
  }
};
