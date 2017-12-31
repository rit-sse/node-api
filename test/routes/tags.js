/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';

describe('INTEGRATION TESTS: TAGS', function () {
  describe('GET /', function () {
    it('Gets All Tags', function (done) {
      const expected = {
        total: 4,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'tag1',
          },
          {
            name: 'tag2',
          },
          {
            name: 'tag3',
          },
          {
            name: 'tag4',
          },
        ],
      };

      request(app)
        .get('/api/v2/qdb/tags')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((tag) => {
            delete tag.createdAt;
            delete tag.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });

    it('Gets Only Active Tags', function (done) {
      const expected = {
        total: 3,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'tag1',
          },
          {
            name: 'tag2',
          },
          {
            name: 'tag3',
          },
        ],
      };

      request(app)
        .get('/api/v2/qdb/tags?active=true')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((tag) => {
            delete tag.createdAt;
            delete tag.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
          done();
        });
    });
  });
});
