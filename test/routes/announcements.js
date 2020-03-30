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

describe('INTEGRATION TESTS: ANNOUNCEMENTS', function () {
  describe('GET /', function () {
    it('Gets Active Announcements (In Descending Order)', function () {
      const expected = {
        total: 2,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            active: false,
            message: 'hello everyone!',
            category: 'warning',
          },
          {
            active: true,
            message: 'This is an announcement',
            category: 'primary',
          },
        ],
      };

      return request(app)
        .get('/api/v2/announcements')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((announcement) => {
            delete announcement.id;
            delete announcement.createdAt;
            delete announcement.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });
  });

  describe('POST /', function () {
    it('Requires Authentication', function () {
      const expected = {
        error: 'No authorization token was found',
      };

      return request(app)
        .post('/api/v2/announcements')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Requires Expected Permissions', function () {
      const expected = {
        error: 'User does not have permission: create announcements',
      };

      const announcementInput = {
        message: 'This is a test',
        category: 'warning',
        active: true,
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .post('/api/v2/announcements')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .post('/api/v2/announcements')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .post('/api/v2/announcements')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .post('/api/v2/announcements')
        .set('Authorization', `Bearer ${token}`)
        .send(announcementInput)
        .expect(201);

      return Promise.all([
        primaryLow,
        userHigh,
        primaryHigh,
        officerHigh,
      ]);
    });
  });

  describe('GET /:id', function () {
    it('Gets a Specific Announcement', function () {
      const expected = {
        id: 2,
        message: 'This is an announcement',
        category: 'primary',
        active: true,
      };

      return request(app)
        .get('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Does Not Find a Non-existent Announcement', function () {
      const expected = {
        error: 'Announcement not found',
      };

      return request(app)
        .get('/api/v2/announcements/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });

  describe('PUT /:id', function () {
    it('Requires Authentication', function () {
      const expected = {
        error: 'No authorization token was found',
      };

      return request(app)
        .put('/api/v2/announcements/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Requires Expected Permissions', function () {
      // Need High Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: update announcements',
      };

      const announcementInput = {
        category: 'danger',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .put('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .put('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .put('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .put('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${token}`)
        .send(announcementInput)
        .expect(200);

      return Promise.all([
        primaryLow,
        userHigh,
        primaryHigh,
        officerHigh,
      ]);
    });

    it('Updates a Specific Announcement', function () {
      const expected = {
        id: 2,
        message: 'You just got updated',
        category: 'info',
        active: true,
      };

      return request(app)
        .put('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${token}`)
        .send({
          message: 'You just got updated',
          category: 'info',
        })
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Does Not Find and Update a Non-existent Announcement', function () {
      const expected = {
        error: 'Announcement not found',
      };

      return request(app)
        .put('/api/v2/announcements/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });

  describe('DELETE /:id', function () {
    it('Requires Authentication', function () {
      const expected = {
        error: 'No authorization token was found',
      };

      return request(app)
        .delete('/api/v2/announcements/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Requires Expected Permissions', function () {
      // Need High Permissions be Primary Officer
      const expected = {
        error: 'User does not have permission: destroy announcements',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .delete('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ High Permission Token
      const officerHigh = request(app)
        .delete('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .delete('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .delete('/api/v2/announcements/2')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      return Promise.all([
        primaryLow,
        officerHigh,
        userHigh,
        primaryHigh,
      ]);
    });

    it('Deletes a Specific Announcement', function () {
      return request(app)
        .delete('/api/v2/announcements/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .then(() => {
          request(app)
            .get('/api/v2/announcements/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
        });
    });

    it('Does Not Find and Delete a Non-existent Announcement', function () {
      const expected = {
        error: 'Announcement not found',
      };

      return request(app)
        .delete('/api/v2/announcements/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });
});
