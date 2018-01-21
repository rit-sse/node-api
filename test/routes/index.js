/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import request from 'supertest';

import app from '../../app';

describe('INTEGRATION TESTS: INDEX', function () {
  describe('GET /unknown', function () {
    it('Returns 404 for Unknown Routes', function (done) {
      request(app)
        .get('/unknown/')
        .expect(404, done);
    });
  });
});
