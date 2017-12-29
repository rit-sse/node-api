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

describe('INTEGRATION TESTS: EVENTS', function () {
  describe('GET /', function () {
    it('Returns Events When Accepting JSON', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by an Existing Name', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by an Non-existent Name', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by an Existing Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by an Non-existent Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by an Existing Location', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by an Non-existent Location', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Between', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Before', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by After', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Featured', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Sort', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Returns a Calendar Event When Accepting ICS', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Accept Requests Not Accepting JSON or ICS', function (done) {
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
        .post('/api/v2/events')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      // Need Low Permissions be an Officer or Primary Officer
      const expected = {
        error: 'User does not have permission: create events',
      };

      const eventInput = {
        name: 'A Cool Talk',
        committeeName: 'Talks',
        startDate: '2017-06-12T05:00:00.000Z',
        endDate: '2017-06-12T10:00:00.000Z',
        location: 'The Lab',
      };

      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .send(eventInput)
        .expect(201);
      // Allow Officer w/ Low Permission Token
      const officerLow = request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${lowPermissionOfficerToken}`)
        .send(eventInput)
        .expect(201);

      Promise.all([
        userHigh,
        primaryLow,
        officerLow,
      ]).then(() => {
        done();
      });
    });

    it('Creates an Event', function (done) {
      const expected = {
        name: 'A Cool Talk',
        committeeName: 'Talks',
        startDate: '2017-06-12T05:00:00.000Z',
        endDate: '2017-06-12T10:00:00.000Z',
        location: 'The Lab',
      };

      request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${token}`)
        .send(expected)
        .expect(201)
        .then((response) => {
          delete response.body.id;
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Start Date to be Before End Date', function (done) {
      const expected = {
        error: 'Validation error: Start date must be before the end date',
      };

      request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'A Cool Talk',
          committeeName: 'Talks',
          startDate: '2017-07-12T05:00:00.000Z',
          endDate: '2017-06-12T10:00:00.000Z',
          location: 'The Lab',
        })
        .expect(422)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Errors When Insufficient Fields Provided', function (done) {
      const expected = {
        error: 'notNull Violation: name cannot be null,\nnotNull Violation: startDate cannot be null,\nnotNull Violation: endDate cannot be null,\nnotNull Violation: location cannot be null',
      };

      request(app)
        .post('/api/v2/events')
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
    it('Gets a Specific Event', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find a Non-existent Event', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('PUT /:id', function () {
    it('Requires Authentication', function (done) {
      const expected = {
        error: 'No authorization token was found',
      };

      request(app)
        .put('/api/v2/events/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Updates a Specific Event', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Update a Non-existent Event', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('DELETE /:id', function () {
    it('Requires Authentication', function (done) {
      const expected = {
        error: 'No authorization token was found',
      };

      request(app)
        .delete('/api/v2/events/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Deletes a Specific Event', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Delete a Non-existent Event', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
