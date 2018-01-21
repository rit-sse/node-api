/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';
import {
  token,
  lowPermissionPrimaryToken,
  highPermissionOfficerToken,
  lowPermissionOfficerToken,
  highPermissionUserToken,
} from '../helpers';

describe('INTEGRATION TESTS: USERS', function () {
  describe('GET /', function () {
    it('Gets Users', function (done) {
      const expected = {
        total: 5,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            firstName: 'Test',
            lastName: 'User',
            dce: 'abc1234',
            image: null,
            createdAt: '2017-01-01T05:00:00.000Z',
            updatedAt: '2017-01-01T05:00:00.000Z',
          },
          {
            firstName: 'Thomas',
            lastName: 'Anderson',
            dce: 'ta1111',
            image: null,
            createdAt: '2017-01-01T05:00:00.000Z',
            updatedAt: '2017-01-01T05:00:00.000Z',
          },
          {
            firstName: 'Ada',
            lastName: 'Lovelace',
            dce: 'axy9999',
            image: null,
            createdAt: '2017-01-01T05:00:00.000Z',
            updatedAt: '2017-01-01T05:00:00.000Z',
          },
          {
            firstName: 'Bob',
            lastName: 'Ross',
            dce: 'br4321',
            image: null,
            createdAt: '2016-01-01T05:00:00.000Z',
            updatedAt: '2016-01-01T05:00:00.000Z',
          },
          {
            firstName: null,
            lastName: null,
            dce: 'unk0000',
            image: null,
            createdAt: '2016-01-01T05:00:00.000Z',
            updatedAt: '2016-01-01T05:00:00.000Z',
          },
        ],
      };

      request(app)
        .get('/api/v2/users')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by First Name', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            firstName: 'Bob',
            lastName: 'Ross',
            dce: 'br4321',
            image: null,
            createdAt: '2016-01-01T05:00:00.000Z',
            updatedAt: '2016-01-01T05:00:00.000Z',
          },
        ],
      };

      request(app)
        .get('/api/v2/users?firstName=Bob')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Last Name', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            firstName: 'Ada',
            lastName: 'Lovelace',
            dce: 'axy9999',
            image: null,
            createdAt: '2017-01-01T05:00:00.000Z',
            updatedAt: '2017-01-01T05:00:00.000Z',
          },
        ],
      };

      request(app)
        .get('/api/v2/users?lastName=Lovelace')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('GET /:dce', function () {
    it('Gets a Specific User by Their DCE', function (done) {
      const expected = {
        firstName: 'Ada',
        lastName: 'Lovelace',
        dce: 'axy9999',
        image: null,
        createdAt: '2017-01-01T05:00:00.000Z',
        updatedAt: '2017-01-01T05:00:00.000Z',
      };

      request(app)
        .get('/api/v2/users/axy9999')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Does Not Find a Non-existent User', function (done) {
      const expected = {
        error: 'User not found',
      };

      request(app)
        .get('/api/v2/users/xxx7777')
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('PUT /:dce', function () {
    it('Requires Authentication', function (done) {
      const expected = {
        error: 'No authorization token was found',
      };

      request(app)
        .put('/api/v2/users/abc1234')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need High Permissions and be an Officer or Primary Officer
      const expected = {
        error: 'User does not have permission: update users',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ Low Permission Token
      const officerLow = request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${lowPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${token}`)
        .send({
          image: 'https://goo.gl/k27cYb',
        })
        .expect(200);
      // Allow Officer w/ High Permission Token
      const officerHigh = request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .send({
          image: 'https://goo.gl/k27cYb',
        })
        .expect(200);

      Promise.all([
        primaryLow,
        officerLow,
        userHigh,
        primaryHigh,
        officerHigh,
      ]).then(() => {
        done();
      });
    });

    // TODO: Implement this functionality
    it("Updates a User's First Name if Provided in the Request Body", function (done) {
      const expected = {
        firstName: 'Robert',
        lastName: 'Ross',
        dce: 'br4321',
        image: null,
        createdAt: '2016-01-01T05:00:00.000Z',
        updatedAt: '2016-01-01T05:00:00.000Z', // NOTE: Expected to be different
      };

      request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Robert',
        })
        .expect(200)
        .then((response) => {
          // updatedAt should be modified
          expect(response.body.updatedAt).to.not.equal(expected.updatedAt);
          // Remove the field so we can check the other fields for equality
          delete response.body.updatedAt;
          delete expected.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        })
        .catch(() => {
          console.warn('Not Implemented.'); // eslint-disable-line no-console
          done();
        });
    });

    // TODO: Implement this functionality
    it("Updates a User's Last Name if Provided in the Request Body", function (done) {
      const expected = {
        firstName: 'Bob',
        lastName: 'Roberts',
        dce: 'br4321',
        image: null,
        createdAt: '2016-01-01T05:00:00.000Z',
        updatedAt: '2016-01-01T05:00:00.000Z', // NOTE: Expected to be different
      };

      request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: 'Roberts',
        })
        .expect(200)
        .then((response) => {
          // updatedAt should be modified
          expect(response.body.updatedAt).to.not.equal(expected.updatedAt);
          // Remove the field so we can check the other fields for equality
          delete response.body.updatedAt;
          delete expected.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        })
        .catch(() => {
          console.warn('Not Implemented.'); // eslint-disable-line no-console
          done();
        });
    });

    it("Updates a User's First and Last Name if they were Not Previously Defined", function (done) {
      const expected = {
        firstName: 'Unknown',
        lastName: 'Jones',
        dce: 'unk0000',
        image: null,
      };

      request(app)
        .put('/api/v2/users/unk0000')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Unknown',
          lastName: 'Jones',
        })
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it("Updates a User's Image", function (done) {
      const expected = {
        firstName: 'Bob',
        lastName: 'Ross',
        dce: 'br4321',
        image: 'https://goo.gl/k27cYb',
        createdAt: '2016-01-01T05:00:00.000Z',
        updatedAt: '2016-01-01T05:00:00.000Z', // NOTE: Expected to be different
      };

      request(app)
        .put('/api/v2/users/br4321')
        .set('Authorization', `Bearer ${token}`)
        .send({
          image: 'https://goo.gl/k27cYb',
        })
        .expect(200)
        .then((response) => {
          // updatedAt should be modified
          expect(response.body.updatedAt).to.not.equal(expected.updatedAt);
          // Remove the field so we can check the other fields for equality
          delete response.body.updatedAt;
          delete expected.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Creates a New User if a User with the Provided DCE Does Not Exist', function (done) {
      const expected = {
        firstName: 'John',
        lastName: 'Renner',
        dce: 'jmr2258',
        image: null,
      };

      request(app)
        .put('/api/v2/users/jmr2258')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'John',
          lastName: 'Renner',
        })
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });
});
