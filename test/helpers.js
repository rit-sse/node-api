import jwt from 'jsonwebtoken';

import nconf from '../config';
import bootstrap from '../bootstrap/init';
import sequelize from '../config/sequelize';

import Committee from '../models/committee';
import Event from '../models/event';
import Officer from '../models/officer';
import User from '../models/user';

const jwtConfig = nconf.get('auth:jwt');

const highPermissionPrimary = {
  user: {
    firstName: 'Test',
    lastName: 'User',
    dce: 'abc1234',
  },
  level: nconf.get('permissions:levels:high'), // Is a primary officer so part of 'primary' group
};

const lowPermissionPrimary = {
  user: {
    firstName: 'Test',
    lastName: 'User',
    dce: 'abc1234',
  },
  level: nconf.get('permissions:levels:low'), // Is a primary officer so part of 'primary' group
};

const highPermissionOfficer = {
  user: {
    firstName: 'Thomas',
    lastName: 'Anderson',
    dce: 'ta1111',
  },
  level: nconf.get('permissions:levels:high'), // Is Technology Head, so also part of 'officers' group
};

const lowPermissionOfficer = {
  user: {
    firstName: 'Thomas',
    lastName: 'Anderson',
    dce: 'ta1111',
  },
  level: nconf.get('permissions:levels:low'), // Is Technology Head, so also part of 'officers' group
};

const highPermissionUser = {
  user: {
    firstName: null,
    lastName: null,
    dce: 'unk0000',
  },
  level: nconf.get('permissions:levels:high'), // Not part of any groups
};

const lowPermissionUser = {
  user: {
    firstName: null,
    lastName: null,
    dce: 'unk0000',
  },
  level: nconf.get('permissions:levels:low'), // Not part of any groups
};

// NOTE: Use this token for testing when not explicitly testing permissions
export const token = jwt.sign(
  highPermissionPrimary,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
);

export const lowPermissionPrimaryToken = jwt.sign(
  lowPermissionPrimary,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
);

export const highPermissionOfficerToken = jwt.sign(
  highPermissionOfficer,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
);

export const lowPermissionOfficerToken = jwt.sign(
  lowPermissionOfficer,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
);

export const highPermissionUserToken = jwt.sign(
  highPermissionUser,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
);

export const lowPermissionUserToken = jwt.sign(
  lowPermissionUser,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
);

export const users = [

];

export const officers = [

];

export const committees = [

];

export const events = [

];

export function beforeHelper() {
  return bootstrap();
}

export function beforeEachHelper() {
  return sequelize
    .transaction(t => Promise.all(
        // Truncate all tables
        [Event, Committee, User, Officer]
          .map(model => model.destroy({
            truncate: true,
            transaction: t,
          }))
      ))
      // Create a User we can auth with
      .then(() => User.create({
        ...highPermissionPrimary.user,
        createdAt: '2017-01-01T05:00:00.000Z',
        updatedAt: '2017-01-01T05:00:00.000Z',
      }, {
        silent: true,
      }))
      // Make that User a primary officer
      .then(user => Officer.create({
        title: 'President',
        email: 'president',
        primaryOfficer: true,
        userDce: user.dce,
        startDate: '2017-01-01T05:00:00.000Z',
        endDate: null,
      }))
      // Make some Committees
      .then(() => Committee.bulkCreate([
        {
          name: 'Technology',
          description: 'tech',
          createdAt: '2017-12-01T05:00:00.000Z',
          updatedAt: '2017-12-01T05:00:00.000Z',
        },
        {
          name: 'Mentoring',
          description: 'mentoring',
          createdAt: '2017-12-10T05:00:00.000Z',
          updatedAt: '2017-12-10T05:00:00.000Z',
        },
        {
          name: 'Talks',
          description: 'talks',
          createdAt: '2017-12-20T05:00:00.000Z',
          updatedAt: '2017-12-20T05:00:00.000Z',
        },
        {
          name: 'Art',
          description: 'art',
          createdAt: '2016-01-01T05:00:00.000Z',
          updatedAt: '2016-01-01T05:00:00.000Z',
        },
      ]))
      // Make some additional Users
      .then(() => User.bulkCreate([
        {
          firstName: 'Thomas',
          lastName: 'Anderson',
          dce: 'ta1111',
          createdAt: '2017-01-01T05:00:00.000Z',
          updatedAt: '2017-01-01T05:00:00.000Z',
        },
        {
          firstName: 'Ada',
          lastName: 'Lovelace',
          dce: 'axy9999',
          createdAt: '2017-01-01T05:00:00.000Z',
          updatedAt: '2017-01-01T05:00:00.000Z',
        },
        {
          firstName: 'Bob',
          lastName: 'Ross',
          dce: 'br4321',
          createdAt: '2016-01-01T05:00:00.000Z',
          updatedAt: '2016-01-01T05:00:00.000Z',
        },
        {
          dce: 'unk0000',
          createdAt: '2016-01-01T05:00:00.000Z',
          updatedAt: '2016-01-01T05:00:00.000Z',
        },
      ]))
      // Make those Users Officers
      .then(() => Officer.bulkCreate([
        {
          title: 'Technology Head',
          committeeName: 'Technology',
          email: 'tech',
          userDce: 'ta1111',
          startDate: '2017-01-01T05:00:00.000Z',
          endDate: null,
        },
        {
          title: 'Mentoring Head',
          committeeName: 'Mentoring',
          email: 'mentoring',
          userDce: 'axy9999',
          startDate: '2017-01-01T05:00:00.000Z',
          endDate: null,
        },
        {
          title: 'Mentoring Head',
          committeeName: 'Mentoring',
          email: 'mentoring',
          userDce: 'br4321',
          startDate: '2016-06-01T05:00:00.000Z',
          endDate: '2017-01-10T05:00:00.000Z', // A date which overlaps the 'startDate' of the above Mentoring Head to test for 'active' duplicates
        },
        {
          title: 'Art Head',
          committeeName: 'Art',
          email: 'art',
          userDce: 'br4321',
          startDate: '2016-01-01T05:00:00.000Z', // A short lived Officer for testing 'active'
          endDate: '2016-02-01T05:00:00.000Z',
        },
      ]))
      .then(() => Event.bulkCreate([
        {
          id: 1,
          name: 'Review Session',
          committeeName: 'Mentoring',
          startDate: '2017-10-12T05:00:00.000Z',
          endDate: '2017-10-12T05:00:00.000Z',
          location: 'GOL-1440',
          link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          id: 2,
          name: 'Microtalks',
          committeeName: 'Talks',
          startDate: '2017-06-12T05:00:00.000Z',
          endDate: '2017-06-12T10:00:00.000Z',
          location: 'The Lab',
          link: null,
        },
        {
          id: 3,
          name: 'Intro to Bitcoin',
          committeeName: 'Talks',
          startDate: '2017-12-15T05:00:00.000Z',
          endDate: '2017-12-15T10:00:00.000Z',
          location: 'The Lab',
          link: null,
        },
      ]));
}
