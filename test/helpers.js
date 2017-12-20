import jwt from 'jsonwebtoken';
import nconf from '../config';
import bootstrap from '../bootstrap/init';
import sequelize from '../config/sequelize';
import User from '../models/user';
import Officer from '../models/officer';

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
        [User, Officer]
          .map(model => model.destroy({ where: {}, transaction: t }))
      ))
      .then(() => User.create(payload.user))
      .then(user => Officer.create({
        title: 'President',
        email: 'president',
        primaryOfficer: true,
        userDce: user.dce,
        startDate: new Date(),
        endDate: new Date(2020, 0, 12),
      }));
}
