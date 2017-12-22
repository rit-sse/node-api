/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';

describe('INTEGRATION TESTS: OFFICERS', function () {
  describe('GET /', function () {
    it('Gets Officers', function () {
      return false;
    });

    it('Filters by Title', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Email', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by User', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Primary', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Filters by Active', function (done) {
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

    it('Creates a New Committee if there is No Officer belonging to that Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Creates a an Officer and assigns them to an Existing Committee', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Errors When Insufficient Fields Provided', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /:id', function () {
    it('Gets a Specific Officer', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find a Non-existent Officer', function (done) {
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

    it('Updates a Specific Officer', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Update a Non-existent Officer', function (done) {
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

    it('Deletes a Specific Officer', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Delete a Non-existent Officer', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
