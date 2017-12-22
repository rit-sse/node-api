/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';
import { token } from '../helpers';

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
        .post('/api/v2/events/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Creates an Event', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Creates an Event', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Errors When Insufficient Fields Provided', function (done) {
      expect(false).to.equal(true);
      done();
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

    it('Destroys a Specific Event', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Delete a Non-existent Event', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
