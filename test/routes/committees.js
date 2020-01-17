/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { expect } from 'chai';
import request from 'supertest';

import app from '../../app';
import nconf from '../../config';

describe('INTEGRATION TESTS: COMMITTEES', function () {
  describe('GET /', function () {
    it('Returns Committees', function () {
      const expected = {
        total: 4,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Technology',
            description: 'tech',
            createdAt: '2017-12-01T05:00:00.000Z',
            updatedAt: '2017-12-01T05:00:00.000Z',
          },
          {
            name: 'Mentoring',
            description: 'mentoring',
            createdAt: '2017-12-10T05:00:00.000Z',
            updatedAt: '2017-12-10T05:00:00.000Z',
          },
          {
            name: 'Talks',
            description: 'talks',
            createdAt: '2017-12-20T05:00:00.000Z',
            updatedAt: '2017-12-20T05:00:00.000Z',
          },
          {
            name: 'Art',
            description: 'art',
            createdAt: '2016-01-01T05:00:00.000Z',
            updatedAt: '2016-01-01T05:00:00.000Z',
          },
        ],
      };

      return request(app)
        .get('/api/v2/committees')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by an Existing Name', function () {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Technology',
            description: 'tech',
            createdAt: '2017-12-01T05:00:00.000Z',
            updatedAt: '2017-12-01T05:00:00.000Z',
          },
        ],
      };

      return request(app)
        .get('/api/v2/committees?name=Technology')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by an Non-existent Name', function () {
      const expected = {
        total: 0,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [],
      };

      return request(app)
        .get('/api/v2/committees?name=Nope')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by Active', function () {
      const expected = {
        total: 2,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Technology',
            description: 'tech',
            createdAt: '2017-12-01T05:00:00.000Z',
            updatedAt: '2017-12-01T05:00:00.000Z',
          },
          {
            name: 'Mentoring',
            description: 'mentoring',
            createdAt: '2017-12-10T05:00:00.000Z',
            updatedAt: '2017-12-10T05:00:00.000Z',
          },
        ],
      };

      return request(app)
        .get(`/api/v2/committees?active=${encodeURIComponent('2017-12-05T05:00:00.000Z')}`)
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    // See: https://github.com/rit-sse/node-api/issues/67
    it('Filters by Active When Multiple Officers Are Assigned to the Same Committee', function () {
      const expected = {
        total: 2,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Technology',
            description: 'tech',
            createdAt: '2017-12-01T05:00:00.000Z',
            updatedAt: '2017-12-01T05:00:00.000Z',
          },
          {
            name: 'Mentoring',
            description: 'mentoring',
            createdAt: '2017-12-10T05:00:00.000Z',
            updatedAt: '2017-12-10T05:00:00.000Z',
          },
        ],
      };

      return request(app)
        .get(`/api/v2/committees?active=${encodeURIComponent('2017-01-05T05:00:00.000Z')}`)
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });

  describe('GET /:id', function () {
    it('Finds a Specific Committee', function () {
      const expected = {
        name: 'Technology',
        description: 'tech',
        createdAt: '2017-12-01T05:00:00.000Z',
        updatedAt: '2017-12-01T05:00:00.000Z',
      };

      return request(app)
        .get('/api/v2/committees/Technology')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Does Not Find a Committee That Does Not Exist', function () {
      const expected = {
        error: 'Committee not found',
      };

      return request(app)
        .get('/api/v2/committees/Nope')
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });
});
