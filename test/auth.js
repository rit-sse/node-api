import request from 'supertest';
import app from '../app';
import nconf from '../config';
import { expect } from 'chai';

describe('auth', () => {
  const apiConfig = nconf.get('api');
  const apiPath = `/${apiConfig.prefix}/${apiConfig.version}/auth`;

  describe('/googleClientID', () => {
    it('should return a token', done => {
      request(app)
        .get(apiPath + '/googleClientID')
        .set('Content-Type', 'application/json')
        .expect(res => expect(res.body).to.have.property('token'))
        .expect(200, done);
    });
  });
});

