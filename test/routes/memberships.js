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
      expect(false).to.equal(true);
      done();
    });

    it('Creates a Membership', function (done) {
      expect(false).to.equal(true);
      done();
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
      expect(false).to.equal(true);
      done();
    });

    it('Gets a Specific Membership', function (done) {
      expect(false).to.equal(true);
      done();
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
      expect(false).to.equal(true);
      done();
    });

    it('Updates a Specific Membership', function (done) {
      expect(false).to.equal(true);
      done();
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
      expect(false).to.equal(true);
      done();
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
