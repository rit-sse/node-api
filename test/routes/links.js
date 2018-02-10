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

describe('INTEGRATION TESTS: LINKS', function () {
  describe('GET /', function () {
    xit('Gets Links by Created At in Descending Order', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('POST /', function () {
    xit('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Creates a Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Lowercases the Short Link in a Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Errors When Insufficient Fields Provided', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /go/:shortlink', function () {
    xit('Redirects a Link by Short Link to the Long Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Is Case Insensitive When Finding a Short Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Does Not Find and Redirect a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /:shortlink', function () {
    xit('Gets a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Is Case Insensitive When Finding a Short Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Does Not Find a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('PUT /:shortlink', function () {
    xit('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Updates a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Lowercases the Short Link when Updating a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Does Not Find and Update a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('DELETE /:shortlink', function () {
    xit('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Deletes a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Is Case Insensitive When Finding a Short Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Does Not Find and Delete a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
