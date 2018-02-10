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
  highPermissionUserToken,
} from '../helpers';

describe('INTEGRATION TESTS: OFFICERS', function () {
  describe('GET /', function () {
    it('Gets Officers', function (done) {
      const expected = {
        total: 5,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            title: 'President',
            committeeName: null,
            email: 'president',
            primaryOfficer: true,
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            userDce: 'abc1234',
            user: {
              firstName: 'Test',
              lastName: 'User',
              dce: 'abc1234',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
          {
            title: 'Technology Head',
            committeeName: 'Technology',
            email: 'tech',
            primaryOfficer: false,
            userDce: 'ta1111',
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            user: {
              firstName: 'Thomas',
              lastName: 'Anderson',
              dce: 'ta1111',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
          {
            title: 'Mentoring Head',
            committeeName: 'Mentoring',
            email: 'mentoring',
            primaryOfficer: false,
            userDce: 'axy9999',
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            user: {
              firstName: 'Ada',
              lastName: 'Lovelace',
              dce: 'axy9999',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
          {
            title: 'Mentoring Head',
            committeeName: 'Mentoring',
            email: 'mentoring',
            primaryOfficer: false,
            userDce: 'br4321',
            startDate: '2016-06-01T05:00:00.000Z',
            endDate: '2017-01-10T05:00:00.000Z',
            user: {
              firstName: 'Bob',
              lastName: 'Ross',
              dce: 'br4321',
              createdAt: '2016-01-01T05:00:00.000Z',
              updatedAt: '2016-01-01T05:00:00.000Z',
              image: null,
            },
          },
          {
            title: 'Art Head',
            committeeName: 'Art',
            email: 'art',
            primaryOfficer: false,
            userDce: 'br4321',
            startDate: '2016-01-01T05:00:00.000Z',
            endDate: '2016-02-01T05:00:00.000Z',
            user: {
              firstName: 'Bob',
              lastName: 'Ross',
              dce: 'br4321',
              createdAt: '2016-01-01T05:00:00.000Z',
              updatedAt: '2016-01-01T05:00:00.000Z',
              image: null,
            },
          },
        ],
      };

      request(app)
        .get('/api/v2/officers')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((officer) => {
            delete officer.id;
            delete officer.createdAt;
            delete officer.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Title', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            title: 'Art Head',
            committeeName: 'Art',
            email: 'art',
            primaryOfficer: false,
            userDce: 'br4321',
            startDate: '2016-01-01T05:00:00.000Z',
            endDate: '2016-02-01T05:00:00.000Z',
            user: {
              firstName: 'Bob',
              lastName: 'Ross',
              dce: 'br4321',
              createdAt: '2016-01-01T05:00:00.000Z',
              updatedAt: '2016-01-01T05:00:00.000Z',
              image: null,
            },
          },
        ],
      };

      request(app)
        .get(`/api/v2/officers?title=${encodeURIComponent('Art Head')}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((officer) => {
            delete officer.id;
            delete officer.createdAt;
            delete officer.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Email', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            title: 'Art Head',
            committeeName: 'Art',
            email: 'art',
            primaryOfficer: false,
            userDce: 'br4321',
            startDate: '2016-01-01T05:00:00.000Z',
            endDate: '2016-02-01T05:00:00.000Z',
            user: {
              firstName: 'Bob',
              lastName: 'Ross',
              dce: 'br4321',
              createdAt: '2016-01-01T05:00:00.000Z',
              updatedAt: '2016-01-01T05:00:00.000Z',
              image: null,
            },
          },
        ],
      };

      request(app)
        .get('/api/v2/officers?email=art')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((officer) => {
            delete officer.id;
            delete officer.createdAt;
            delete officer.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by User', function (done) {
      const expected = {
        total: 2,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            title: 'Mentoring Head',
            committeeName: 'Mentoring',
            email: 'mentoring',
            primaryOfficer: false,
            userDce: 'br4321',
            startDate: '2016-06-01T05:00:00.000Z',
            endDate: '2017-01-10T05:00:00.000Z',
            user: {
              firstName: 'Bob',
              lastName: 'Ross',
              dce: 'br4321',
              createdAt: '2016-01-01T05:00:00.000Z',
              updatedAt: '2016-01-01T05:00:00.000Z',
              image: null,
            },
          },
          {
            title: 'Art Head',
            committeeName: 'Art',
            email: 'art',
            primaryOfficer: false,
            userDce: 'br4321',
            startDate: '2016-01-01T05:00:00.000Z',
            endDate: '2016-02-01T05:00:00.000Z',
            user: {
              firstName: 'Bob',
              lastName: 'Ross',
              dce: 'br4321',
              createdAt: '2016-01-01T05:00:00.000Z',
              updatedAt: '2016-01-01T05:00:00.000Z',
              image: null,
            },
          },
        ],
      };

      request(app)
        .get('/api/v2/officers?user=br4321')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((officer) => {
            delete officer.id;
            delete officer.createdAt;
            delete officer.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Primary', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            title: 'President',
            committeeName: null,
            email: 'president',
            primaryOfficer: true,
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            userDce: 'abc1234',
            user: {
              firstName: 'Test',
              lastName: 'User',
              dce: 'abc1234',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
        ],
      };

      request(app)
        .get('/api/v2/officers?primary=true')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((officer) => {
            delete officer.id;
            delete officer.createdAt;
            delete officer.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Committee', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            title: 'Technology Head',
            committeeName: 'Technology',
            email: 'tech',
            primaryOfficer: false,
            userDce: 'ta1111',
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            user: {
              firstName: 'Thomas',
              lastName: 'Anderson',
              dce: 'ta1111',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
        ],
      };

      request(app)
        .get('/api/v2/officers?committee=Technology')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((officer) => {
            delete officer.id;
            delete officer.createdAt;
            delete officer.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Active', function (done) {
      const expected = {
        total: 3,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            title: 'President',
            committeeName: null,
            email: 'president',
            primaryOfficer: true,
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            userDce: 'abc1234',
            user: {
              firstName: 'Test',
              lastName: 'User',
              dce: 'abc1234',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
          {
            title: 'Technology Head',
            committeeName: 'Technology',
            email: 'tech',
            primaryOfficer: false,
            userDce: 'ta1111',
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            user: {
              firstName: 'Thomas',
              lastName: 'Anderson',
              dce: 'ta1111',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
          {
            title: 'Mentoring Head',
            committeeName: 'Mentoring',
            email: 'mentoring',
            primaryOfficer: false,
            userDce: 'axy9999',
            startDate: '2017-01-01T05:00:00.000Z',
            endDate: null,
            user: {
              firstName: 'Ada',
              lastName: 'Lovelace',
              dce: 'axy9999',
              createdAt: '2017-01-01T05:00:00.000Z',
              updatedAt: '2017-01-01T05:00:00.000Z',
              image: null,
            },
          },
        ],
      };

      request(app)
        .get(`/api/v2/officers?active=${encodeURIComponent('2017-12-05T05:00:00.000Z')}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((officer) => {
            delete officer.id;
            delete officer.createdAt;
            delete officer.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('POST /', function () {
    it('Requires Authentication', function (done) {
      const expected = {
        error: 'No authorization token was found',
      };

      request(app)
        .post('/api/v2/officers')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need High Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: create officers',
      };

      const officerInput = {
        title: 'Technology Head',
        committeeName: 'Technology',
        email: 'tech',
        userDce: 'ta1111',
        startDate: '2017-01-01T05:00:00.000Z',
        endDate: null,
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .post('/api/v2/officers')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .post('/api/v2/officers')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .post('/api/v2/officers')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .post('/api/v2/officers')
        .set('Authorization', `Bearer ${token}`)
        .send(officerInput)
        .expect(201);

      Promise.all([
        primaryLow,
        userHigh,
        primaryHigh,
        officerHigh,
      ]).then(() => {
        done();
      });
    });

    xit('Creates a New Committee if there is No Officer belonging to that Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Creates a an Officer and assigns them to an Existing Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Errors When Insufficient Fields Provided', function (done) {
      const expected = {
        error: 'notNull Violation: title cannot be null,\nnotNull Violation: email cannot be null',
      };

      request(app)
        .post('/api/v2/officers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          committeeName: 'Technology',
        })
        .expect(422)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('GET /:id', function () {
    it('Gets a Specific Officer', function (done) {
      const expected = {
        id: 2,
        title: 'Technology Head',
        committeeName: 'Technology',
        email: 'tech',
        primaryOfficer: false,
        userDce: 'ta1111',
        startDate: '2017-01-01T05:00:00.000Z',
        endDate: null,
        user: {
          firstName: 'Thomas',
          lastName: 'Anderson',
          dce: 'ta1111',
          createdAt: '2017-01-01T05:00:00.000Z',
          updatedAt: '2017-01-01T05:00:00.000Z',
          image: null,
        },
      };

      request(app)
        .get('/api/v2/officers/2')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Does Not Find a Non-existent Officer', function (done) {
      const expected = {
        error: 'Officer not found',
      };

      request(app)
        .get('/api/v2/officers/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('PUT /:id', function () {
    it('Requires Authentication', function (done) {
      const expected = {
        error: 'No authorization token was found',
      };

      request(app)
        .put('/api/v2/officers/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need High Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: update officers',
      };

      const officerInput = {
        email: 'nottech',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .put('/api/v2/officers/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .put('/api/v2/officers/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .put('/api/v2/officers/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .put('/api/v2/officers/2')
        .set('Authorization', `Bearer ${token}`)
        .send(officerInput)
        .expect(200);

      Promise.all([
        primaryLow,
        userHigh,
        primaryHigh,
        officerHigh,
      ]).then(() => {
        done();
      });
    });

    it('Updates a Specific Officer', function (done) {
      const expected = {
        id: 2,
        title: 'Best Officer',
        committeeName: 'Technology',
        email: 'tech',
        primaryOfficer: false,
        userDce: 'ta1111',
        startDate: '2017-01-01T05:00:00.000Z',
        endDate: null,
        user: {
          firstName: 'Thomas',
          lastName: 'Anderson',
          dce: 'ta1111',
          createdAt: '2017-01-01T05:00:00.000Z',
          updatedAt: '2017-01-01T05:00:00.000Z',
          image: null,
        },
      };

      request(app)
        .put('/api/v2/officers/2')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Best Officer',
        })
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Does Not Find and Update a Non-existent Officer', function (done) {
      const expected = {
        error: 'Officer not found',
      };

      request(app)
        .put('/api/v2/officers/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('DELETE /:id', function () {
    it('Requires Authentication', function (done) {
      const expected = {
        error: 'No authorization token was found',
      };

      request(app)
        .delete('/api/v2/officers/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need High Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: destroy officers',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .delete('/api/v2/officers/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .delete('/api/v2/officers/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .delete('/api/v2/officers/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .delete('/api/v2/officers/2')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      Promise.all([
        primaryLow,
        officerHigh,
        userHigh,
        primaryHigh,
      ]).then(() => {
        done();
      });
    });

    it('Deletes a Specific Officer', function (done) {
      request(app)
        .delete('/api/v2/officers/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .then(() => {
          request(app)
            .get('/api/v2/officers/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
            .then(() => {
              done();
            });
        });
    });

    it('Does Not Find and Delete a Non-existent Officer', function (done) {
      const expected = {
        error: 'Officer not found',
      };

      request(app)
        .delete('/api/v2/officers/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });
});
