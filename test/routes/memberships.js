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
    it('Gets Memberships by DCE in Descending Order', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by an Existing User', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Active', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Between', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Approved', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /', function () {
    it('Requires Correct Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Reason', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by User', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Active', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Between', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Approved', function (done) {
      expect(false).to.equal(true);
      done();
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

    it('Requires Correct Permissions', function (done) {
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
    it('Requires Correct Permissions', function (done) {
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

    it('Requires Correct Permissions', function (done) {
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

    it('Requires Correct Permissions', function (done) {
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
          done();
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
