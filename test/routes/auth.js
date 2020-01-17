/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';
import { token } from '../helpers';

describe('INTEGRATION TESTS: AUTH', function () {
  describe('GET /', function () {
    it('Denies Unauthenticated Users', function () {
      const expected = {
        error: 'not logged in',
      };

      return request(app)
        .get('/api/v2/auth')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Gets the Current Logged In User', function () {
      const expected = {
        firstName: 'Test',
        lastName: 'User',
        dce: 'abc1234',
      };

      return request(app)
        .get('/api/v2/auth')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });

  describe('GET /googleClientID', function () {
    it('Gets the Google Client ID', function () {
      const expected = {
        token: nconf.get('auth').google.id,
      };

      return request(app)
        .get('/api/v2/auth/googleClientID')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });

  describe('POST /:provider', function () {
    it('Sends a Refresh Token', function () {
      return request(app)
        .post('/api/v2/auth/refresh')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          // There should be a token property, but it should
          // not be the same as the original token.
          expect(response.body.token).to.not.be.undefined; // eslint-disable-line no-unused-expressions
          expect(response.body).to.not.deep.equal({ token });
        });
    });

    it('Does Not Support Unknown Providers', function () {
      const expected = {
        error: 'invalid provider',
      };

      return request(app)
        .post('/api/v2/auth/unknown')
        .set('Authorization', `Bearer ${token}`)
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    xit('Verifies a Google User', function (done) {
      expect(false).to.equal(true); // TODO: Probably need to mock Google
      done();
    });

    xit('Verifies a Slack User', function (done) {
      expect(false).to.equal(true); // TODO: Probably need to mock Slack
      done();
    });

    xit('Does Not Verify Incorrect Credentials', function (done) {
      expect(false).to.equal(true); // TODO
      done();
    });
  });
});
