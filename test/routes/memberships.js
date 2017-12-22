/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';

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
      expect(false).to.equal(true);
      done();
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
      expect(false).to.equal(true);
      done();
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
      expect(false).to.equal(true);
      done();
    });
  });

  describe('PUT /:id', function () {
    it('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
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
      expect(false).to.equal(true);
      done();
    });
  });

  describe('DELETE /:id', function () {
    it('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Requires Correct Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Deletes a Specific Membership', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Delete a Non-existent Membership', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
