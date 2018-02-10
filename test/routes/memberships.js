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

describe('INTEGRATION TESTS: MEMBERSHIPS', function () {
  describe('GET /scoreboard', function () {
    xit('Gets Memberships by DCE in Descending Order', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by an Existing User', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Active', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Between', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Approved', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /', function () {
    it('Gets Approved Memberships', function (done) {
      const expected = {
        total: 2,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            reason: 'Helping Out',
            startDate: '2017-04-15T05:00:00.000Z',
            endDate: '2017-10-15T05:00:00.000Z',
            committeeName: 'Mentoring',
            userDce: 'axy9999',
            approved: true,
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
            reason: 'Giving a Talk',
            startDate: '2017-08-15T05:00:00.000Z',
            endDate: '2017-12-15T05:00:00.000Z',
            committeeName: 'Talks',
            userDce: 'br4321',
            approved: true,
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
        .get('/api/v2/memberships')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((membership) => {
            delete membership.id;
            delete membership.createdAt;
            delete membership.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need Low Permissions be Primary Officer for Pending and Denied
      const expected = {
        error: 'User does not have permission: unapproved memberships',
      };

      // Test Pending Memberships (approved=null)
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .get('/api/v2/memberships?approved=null')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .get('/api/v2/memberships?approved=null')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ Low Permission Token
      const primaryHigh = request(app)
        .get('/api/v2/memberships?approved=null')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(200);

      // Test Denied Memberships (approved=false)
      // Deny Officer w/ High Permission Token
      const officerHigh2 = request(app)
        .get('/api/v2/memberships?approved=false')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh2 = request(app)
        .get('/api/v2/memberships?approved=false')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ Low Permission Token
      const primaryHigh2 = request(app)
        .get('/api/v2/memberships?approved=false')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(200);

      // Test Approved Memberships (default scope)
      // Allow Anyone
      const anyone = request(app)
        .get('/api/v2/memberships')
        .expect(200);

      Promise.all([
        officerHigh,
        userHigh,
        primaryHigh,
        officerHigh2,
        userHigh2,
        primaryHigh2,
        anyone,
      ]).then(() => {
        done();
      });
    });

    it('Filters by Reason', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            reason: 'Giving a Talk',
            startDate: '2017-08-15T05:00:00.000Z',
            endDate: '2017-12-15T05:00:00.000Z',
            committeeName: 'Talks',
            userDce: 'br4321',
            approved: true,
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
        .get(`/api/v2/memberships?reason=${encodeURIComponent('Giving a Talk')}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((membership) => {
            delete membership.id;
            delete membership.createdAt;
            delete membership.updatedAt;
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
            reason: 'Giving a Talk',
            startDate: '2017-08-15T05:00:00.000Z',
            endDate: '2017-12-15T05:00:00.000Z',
            committeeName: 'Talks',
            userDce: 'br4321',
            approved: true,
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
        .get('/api/v2/memberships?committee=Talks')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((membership) => {
            delete membership.id;
            delete membership.createdAt;
            delete membership.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by User', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            reason: 'Helping Out',
            startDate: '2017-04-15T05:00:00.000Z',
            endDate: '2017-10-15T05:00:00.000Z',
            committeeName: 'Mentoring',
            userDce: 'axy9999',
            approved: true,
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
        .get('/api/v2/memberships?user=axy9999')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((membership) => {
            delete membership.id;
            delete membership.createdAt;
            delete membership.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Active (and Approved)', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            reason: 'Giving a Talk',
            startDate: '2017-08-15T05:00:00.000Z',
            endDate: '2017-12-15T05:00:00.000Z',
            committeeName: 'Talks',
            userDce: 'br4321',
            approved: true,
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
        .get(`/api/v2/memberships?active=${encodeURIComponent('2017-11-01T05:00:00.000Z')}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((membership) => {
            delete membership.id;
            delete membership.createdAt;
            delete membership.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Between Start Date (and Approved)', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            reason: 'Giving a Talk',
            startDate: '2017-08-15T05:00:00.000Z',
            endDate: '2017-12-15T05:00:00.000Z',
            committeeName: 'Talks',
            userDce: 'br4321',
            approved: true,
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
        .get(`/api/v2/memberships?between=${encodeURIComponent('2017-05-01T05:00:00.000Z')}/${encodeURIComponent('2017-09-01T05:00:00.000Z')}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((membership) => {
            delete membership.id;
            delete membership.createdAt;
            delete membership.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Pending', function (done) {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            reason: 'Being Awesome',
            startDate: '2017-06-15T05:00:00.000Z',
            endDate: '2017-12-15T05:00:00.000Z',
            committeeName: 'Technology',
            userDce: 'ta1111',
            approved: null,
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
        .get('/api/v2/memberships?approved=null')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((membership) => {
            delete membership.id;
            delete membership.createdAt;
            delete membership.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Filters by Denied', function (done) {
      const expected = {
        total: 0,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [],
      };

      request(app)
        .get('/api/v2/memberships?approved=false')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
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
        .post('/api/v2/memberships')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need Low Permissions be an Officer or Primary Officer
      const expected = {
        error: 'User does not have permission: create memberships',
      };

      const membershipInput = {
        reason: 'A Nice Person',
        startDate: '2017-06-15T05:00:00.000Z',
        endDate: '2017-12-15T05:00:00.000Z',
        committeeName: 'Technology',
        userDce: 'ta1111',
      };

      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .post('/api/v2/memberships')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .post('/api/v2/memberships')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .send(membershipInput)
        .expect(201);
      // Allow Officer w/ Low Permission Token
      const officerLow = request(app)
        .post('/api/v2/memberships')
        .set('Authorization', `Bearer ${lowPermissionOfficerToken}`)
        .send(membershipInput)
        .expect(201);

      Promise.all([
        userHigh,
        primaryLow,
        officerLow,
      ]).then(() => {
        done();
      });
    });

    it('Creates a Membership', function (done) {
      const expected = {
        reason: 'A Nice Person',
        startDate: '2017-06-15T05:00:00.000Z',
        endDate: '2017-12-15T05:00:00.000Z',
        committeeName: 'Technology',
        userDce: 'ta1111',
        approved: null,
        user: {
          firstName: 'Thomas',
          lastName: 'Anderson',
          dce: 'ta1111',
          image: null,
          createdAt: '2017-01-01T05:00:00.000Z',
          updatedAt: '2017-01-01T05:00:00.000Z',
        },
      };

      request(app)
        .post('/api/v2/memberships')
        .set('Authorization', `Bearer ${token}`)
        .send({
          reason: 'A Nice Person',
          startDate: '2017-06-15T05:00:00.000Z',
          endDate: '2017-12-15T05:00:00.000Z',
          committeeName: 'Technology',
          userDce: 'ta1111',
        })
        .expect(201)
        .then((response) => {
          delete response.body.id;
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Errors When Insufficient Fields Provided', function (done) {
      const expected = {
        error: 'notNull Violation: reason cannot be null',
      };

      request(app)
        .post('/api/v2/memberships')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(422)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('GET /:id', function () {
    it('Requires Expected Permissions', function (done) {
      // Need Low Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: unapproved memberships',
      };

      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .get('/api/v2/memberships/1')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .get('/api/v2/memberships/1')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ Low Permission Token
      const primaryHigh = request(app)
        .get('/api/v2/memberships/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      Promise.all([
        officerHigh,
        userHigh,
        primaryHigh,
      ]).then(() => {
        done();
      });
    });

    it('Gets a Specific Membership', function (done) {
      const expected = {
        id: 2,
        reason: 'Helping Out',
        startDate: '2017-04-15T05:00:00.000Z',
        endDate: '2017-10-15T05:00:00.000Z',
        committeeName: 'Mentoring',
        userDce: 'axy9999',
        approved: true,
        user: {
          firstName: 'Ada',
          lastName: 'Lovelace',
          image: null,
          dce: 'axy9999',
          createdAt: '2017-01-01T05:00:00.000Z',
          updatedAt: '2017-01-01T05:00:00.000Z',
        },
      };

      request(app)
        .get('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Does Not Find a Non-existent Membership', function (done) {
      const expected = {
        error: 'Membership not found',
      };

      request(app)
        .get('/api/v2/memberships/100')
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
        .put('/api/v2/memberships/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need Low Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: update memberships',
      };

      const membershipInput = {
        reason: 'Because',
      };

      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .put('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .put('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ Low Permission Token
      const primaryHigh = request(app)
        .put('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .send(membershipInput)
        .expect(200);

      Promise.all([
        officerHigh,
        userHigh,
        primaryHigh,
      ]).then(() => {
        done();
      });
    });

    it('Updates a Specific Membership', function (done) {
      const expected = {
        id: 2,
        reason: 'Because',
        startDate: '2017-04-15T05:00:00.000Z',
        endDate: '2017-10-15T05:00:00.000Z',
        committeeName: 'Mentoring',
        userDce: 'axy9999',
        approved: true,
        user: {
          firstName: 'Ada',
          lastName: 'Lovelace',
          image: null,
          dce: 'axy9999',
          createdAt: '2017-01-01T05:00:00.000Z',
          updatedAt: '2017-01-01T05:00:00.000Z',
        },
      };

      request(app)
        .put('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${token}`)
        .send({
          reason: 'Because',
        })
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Does Not Find and Update a Non-existent Membership', function (done) {
      const expected = {
        error: 'Membership not found',
      };

      request(app)
        .put('/api/v2/memberships/100')
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
        .delete('/api/v2/memberships/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need High Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: destroy memberships',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .delete('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .delete('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .delete('/api/v2/memberships/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .delete('/api/v2/memberships/2')
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

    it('Deletes a Specific Membership', function (done) {
      request(app)
        .delete('/api/v2/memberships/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .then(() => {
          request(app)
            .get('/api/v2/memberships/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
            .then(() => {
              done();
            });
        });
    });

    it('Does Not Find and Delete a Non-existent Membership', function (done) {
      const expected = {
        error: 'Membership not found',
      };

      request(app)
        .delete('/api/v2/memberships/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });
});
