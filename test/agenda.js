'use strict';
import request from 'supertest';
import app from '../app';
import nconf from '../config';
import { token, beforeEachHelper } from './helpers';
import agendas from './fixtures/agendas';
import AgendaItem from '../models/agenda-item';
import { expect } from 'chai';

describe('Agenda', () => {

  const apiConfig = nconf.get('api');
  const apiPath = `/${apiConfig.prefix}/${apiConfig.version}/agenda`;

  beforeEach(beforeEachHelper);
  beforeEach(() => AgendaItem.create(agendas.one));

  describe('/agenda', () => {
    describe('GET', () => {
      it('should return a 200 response', done => {
        request(app)
          .get(apiPath)
          .set('Content-Type', 'application/json')
          .expect(200, done);
      });

      it('should return 1 results', done => {
        request(app)
          .get(apiPath)
          .set('Content-Type', 'application/json')
          .expect(res => expect(res.body.data).to.have.length(1))
          .end(done);
      });
    });

    describe('POST', () => {
      describe('valid body', () => {
        it('should return a 201 response', done => {
          request(app)
            .post(apiPath)
            .send(agendas.two)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(201, done);
        });

        it('should return a the right body response', done => {
          request(app)
            .post(apiPath)
            .send(agendas.two)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(res => expect(res.body).to.include.all.keys(agendas.two))
            .expect(res => expect(res.body).to.have.property('userDce', 'abc1234'))
            .end(done);
        });
      });

      describe('invalid body', () => {
        it('should return a 422 response when missing body', done => {
          request(app)
            .post(apiPath)
            .send(agendas.noBody)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(422, done);
        });

        it('should return a 422 response when missing week', done => {
          request(app)
            .post(apiPath)
            .send(agendas.noWeek)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(422, done);
        });

        it('should return a 422 response when missing officer', done => {
          request(app)
            .post(apiPath)
            .send(agendas.noOfficer)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(422, done);
        });
      });
    });
  });

  describe('/agenda/:id', () => {
    describe('GET', () => {
      it('should return a 200 response', done => {
        request(app)
          .get(`${apiPath}/1`)
          .set('Content-Type', 'application/json')
          .expect(200, done);
      });

      it('should return a 404 response', done => {
        request(app)
          .get(`${apiPath}/2`)
          .set('Content-Type', 'application/json')
          .expect(404, done);
      });
    });

    describe('PUT', () => {
      describe('valid', () => {
        it('should return a 200 response', done => {
          request(app)
            .put(`${apiPath}/1`)
            .send({ body: 'New body title' })
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200, done);
        });

        it('should return update the agenda item', done => {
          request(app)
            .put(`${apiPath}/1`)
            .send({ body: 'New body title' })
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(res => expect(res.body).to.have.property('body', 'New body title'))
            .expect(res => expect(res.body).to.have.property('officerId', agendas.one.officerId))
            .expect(res => expect(res.body).to.have.property('userDce', agendas.one.userDce))
            .end(done);
        });
      });

      describe('invalid', () => {
        it('should return a 404 response', done => {
          request(app)
            .put(`${apiPath}/2`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(404, done);
        });

        it('should return a 422 response', done => {
          request(app)
            .put(`${apiPath}/1`)
            .send({ body: null })
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(422, done);
        });
      });
    });

    describe('DELETE', () => {
      it('should return a 204 response', done => {
        request(app)
          .delete(`${apiPath}/1`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(204, done);
      });
    });
  });
});
