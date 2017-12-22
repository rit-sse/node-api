/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';

describe('INTEGRATION TESTS: USERS', function () {
  describe('GET /', function () {
    it('Gets Users', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by First Name', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Last Name', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /:dce', function () {
    it('Gets a Specific User by Their DCE', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find a Non-existent User', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('PUT /:dce', function () {
    it('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Requires Correct Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Updates a Specific User', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Update a Non-existent User', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
