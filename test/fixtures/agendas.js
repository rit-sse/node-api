'use strict';
export default {
  one: {
    body: 'Do the thing',
    week: new Date(2015, 9, 20),
    officerId: 1,
    userDce: 'abc1234',
  },

  two: {
    body: 'Do the other thing',
    week: new Date(2015, 9, 20),
    officerId: 1,
    userDce: 'abc1234',
  },

  noWeek: {
    body: 'Do the thing',
    officerId: 1,
  },

  noBody: {
    week: new Date(2015, 9, 20),
    officerId: 1,
  },

  noOfficer: {
    body: 'Do the thing',
    week: new Date(2015, 9, 20),
  },
};
