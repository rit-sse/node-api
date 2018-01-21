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
    it('Gets Links by Created At in Descending Order', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('POST /', function () {
    it('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Creates a Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Lowercases the Short Link in a Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Errors When Insufficient Fields Provided', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /go/:shortlink', function () {
    it('Redirects a Link by Short Link to the Long Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Is Case Insensitive When Finding a Short Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Redirect a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('GET /:shortlink', function () {
    it('Gets a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Is Case Insensitive When Finding a Short Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('PUT /:shortlink', function () {
    it('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Updates a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Lowercases the Short Link when Updating a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Update a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });

  describe('DELETE /:shortlink', function () {
    it('Requires Authentication', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Deletes a Specific Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Is Case Insensitive When Finding a Short Link', function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Does Not Find and Delete a Non-existent Link', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
