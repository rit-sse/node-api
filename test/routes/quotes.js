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

describe('INTEGRATION TESTS: QUOTES', function () {
  describe('GET /', function () {
    it('Gets Approved Quotes (In Descending Order)', function (done) {
      const expected = {
        total: 3,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            body: 'Zoinks!',
            description: '',
            approved: true,
            tags: [{ name: 'tag1' }, { name: 'tag2' }, { name: 'tag3' }],
          },
          {
            body: 'Is the QDB relevant anymore?',
            description: '',
            approved: true,
            tags: [{ name: 'tag1' }, { name: 'tag2' }],
          },
          {
            body: 'Is this a quote?',
            description: 'Is this a description?',
            approved: true,
            tags: [{ name: 'tag1' }],
          },
        ],
      };

      request(app)
        .get('/api/v2/qdb/quotes')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((quote) => {
            delete quote.id;
            delete quote.createdAt;
            delete quote.updatedAt;
            quote.tags.forEach((quoteTag) => {
              delete quoteTag.quotes_tags;
            });
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    xit('Requires Expected Permissions', function (done) {
      // Need Low Permissions be Primary Officer or Officer for Pending and Denied
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Body', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Tag', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Search', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Pending', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Filters by Denied', function (done) {
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
        .post('/api/v2/qdb/quotes')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    xit('Allows Any User to Create', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Creates a Quote', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit("Creates New Tags if they Don't Exist", function (done) {
      expect(false).to.equal(true);
      done();
    });

    it('Errors When Insufficient Fields Provided', function (done) {
      const expected = {
        error: 'notNull Violation: body cannot be null',
      };

      request(app)
        .post('/api/v2/qdb/quotes')
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
    xit('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Gets a Specific Quote', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Does Not Find a Non-existent Quote', function (done) {
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
        .put('/api/v2/qdb/quotes/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    xit('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Updates a Specific Quote', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit("Creates New Tags if they Don't Exist", function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Removes All Tags From a Quote', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Does Not Find and Update a Non-existent Quote', function (done) {
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
        .delete('/api/v2/qdb/quotes/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    xit('Requires Expected Permissions', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Deletes a Specific Quote', function (done) {
      expect(false).to.equal(true);
      done();
    });

    xit('Does Not Find and Delete a Non-existent Quote', function (done) {
      expect(false).to.equal(true);
      done();
    });
  });
});
