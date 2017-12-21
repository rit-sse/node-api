import jwt from 'jsonwebtoken';
import moment from 'moment';

import nconf from '../config';
import bootstrap from '../bootstrap/init';
import sequelize from '../config/sequelize';

import Committee from '../models/committee';
import Officer from '../models/officer';
import User from '../models/user';

const jwtConfig = nconf.get('auth:jwt');

const payload = {
  user: {
    firstName: 'Test',
    lastName: 'User',
    dce: 'abc1234',
  },
  level: nconf.get('permissions:levels:high'),
};

export const token = jwt.sign(
  payload,
  jwtConfig.secret,
  { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
);

export function beforeHelper() {
  return bootstrap();
}

export function beforeEachHelper() {
  return sequelize
    .transaction(t => Promise.all(
        // Truncate all tables
        [Committee, User, Officer]
          .map(model => model.destroy({ where: {}, transaction: t }))
      ))
      // Create a User we can auth with
      .then(() => User.create({
        ...payload.user,
        createdAt: '2017-01-01T05:00:00.000Z',
        updatedAt: '2017-01-01T05:00:00.000Z',
      }))
      // Make that User a primary officer
      .then(user => Officer.create({
        title: 'President',
        email: 'president',
        primaryOfficer: true,
        userDce: user.dce,
        startDate: '2017-01-01T05:00:00.000Z',
        endDate: moment().add(10, 'years').startOf('day').toISOString(),
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
      ]))
      // Make those Users Officers
      .then(() => Officer.bulkCreate([
        {
          title: 'Technology Head',
          committeeName: 'Technology',
          email: 'tech',
          userDce: 'ta1111',
          startDate: '2017-01-01T05:00:00.000Z',
          endDate: moment().add(10, 'years').startOf('day').toISOString(),
        },
        {
          title: 'Mentoring Head',
          committeeName: 'Mentoring',
          email: 'mentoring',
          userDce: 'axy9999',
          startDate: '2017-01-01T05:00:00.000Z',
          endDate: moment().add(10, 'years').startOf('day').toISOString(),
        },
        {
          title: 'Art Head',
          committeeName: 'Art',
          email: 'art',
          userDce: 'br4321',
          startDate: '2016-01-01T05:00:00.000Z', // A short lived Officer for testing 'active'
          endDate: '2016-02-01T05:00:00.000Z',
        },
      ]));
}
