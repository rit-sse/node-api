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

describe('INTEGRATION TESTS: EVENTS', function () {
  describe('GET /', function () {
    it('Returns Events When Accepting JSON', function () {
      const expected = {
        total: 3,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Review Session',
            committeeName: 'Mentoring',
            startDate: '2017-10-12T05:00:00.000Z',
            endDate: '2017-10-12T05:00:00.000Z',
            location: 'GOL-1440',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: null,
          },
          {
            name: 'Microtalks',
            committeeName: 'Talks',
            startDate: '2017-06-12T05:00:00.000Z',
            endDate: '2017-06-12T10:00:00.000Z',
            location: 'The Lab',
            link: null,
            description: null,
            image: null,
          },
          {
            name: 'Intro to Bitcoin',
            committeeName: 'Talks',
            startDate: '2017-12-15T05:00:00.000Z',
            endDate: '2017-12-15T10:00:00.000Z',
            location: 'The Lab',
            link: null,
            description: null,
            image: null,
          },
        ],
      };

      const nakedURL = request(app)
        .get('/api/v2/events')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });

      const jsonExtension = request(app)
        .get('/api/v2/events.json')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });

      Promise.all([
        nakedURL,
        jsonExtension,
      ]);
    });

    it('Filters by an Existing Name', function () {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Microtalks',
            committeeName: 'Talks',
            startDate: '2017-06-12T05:00:00.000Z',
            endDate: '2017-06-12T10:00:00.000Z',
            location: 'The Lab',
            link: null,
            description: null,
            image: null,
          },
        ],
      };

      request(app)
        .get('/api/v2/events?name=Microtalks')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
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

      request(app)
        .get('/api/v2/events?name=Unknown')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by an Existing Committee', function () {
      const expected = {
        total: 2,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Microtalks',
            committeeName: 'Talks',
            startDate: '2017-06-12T05:00:00.000Z',
            endDate: '2017-06-12T10:00:00.000Z',
            location: 'The Lab',
            link: null,
            description: null,
            image: null,
          },
          {
            name: 'Intro to Bitcoin',
            committeeName: 'Talks',
            startDate: '2017-12-15T05:00:00.000Z',
            endDate: '2017-12-15T10:00:00.000Z',
            location: 'The Lab',
            link: null,
            description: null,
            image: null,
          },
        ],
      };

      return request(app)
        .get('/api/v2/events?committee=Talks')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by an Non-existent Committee', function () {
      const expected = {
        total: 0,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [],
      };

      return request(app)
        .get('/api/v2/events?committee=Unknown')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by an Existing Location', function () {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Review Session',
            committeeName: 'Mentoring',
            startDate: '2017-10-12T05:00:00.000Z',
            endDate: '2017-10-12T05:00:00.000Z',
            location: 'GOL-1440',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: null,
          },
        ],
      };

      return request(app)
        .get('/api/v2/events?location=GOL-1440')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by an Non-existent Location', function () {
      const expected = {
        total: 0,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [],
      };

      return request(app)
        .get('/api/v2/events?location=Unknown')
        .expect(200)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by Between', function () {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Review Session',
            committeeName: 'Mentoring',
            startDate: '2017-10-12T05:00:00.000Z',
            endDate: '2017-10-12T05:00:00.000Z',
            description: null,
            location: 'GOL-1440',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        ],
      };

      return request(app)
        .get(`/api/v2/events?between=${encodeURIComponent('2017-07-01T05:00:00.000Z')}/${encodeURIComponent('2017-11-01T05:00:00.000Z')}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by Before', function () {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Microtalks',
            committeeName: 'Talks',
            startDate: '2017-06-12T05:00:00.000Z',
            endDate: '2017-06-12T10:00:00.000Z',
            description: null,
            location: 'The Lab',
            link: null,
            image: null,
          },
        ],
      };

      return request(app)
        .get(`/api/v2/events?before=${encodeURIComponent('2017-07-01T05:00:00.000Z')}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by After', function () {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Intro to Bitcoin',
            committeeName: 'Talks',
            startDate: '2017-12-15T05:00:00.000Z',
            endDate: '2017-12-15T10:00:00.000Z',
            description: null,
            location: 'The Lab',
            link: null,
            image: null,
          },
        ],
      };

      return request(app)
        .get(`/api/v2/events?after=${encodeURIComponent('2017-11-01T05:00:00.000Z')}`)
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by Featured', function () {
      const expected = {
        total: 1,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Review Session',
            committeeName: 'Mentoring',
            startDate: '2017-10-12T05:00:00.000Z',
            endDate: '2017-10-12T05:00:00.000Z',
            location: 'GOL-1440',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: null,
          },
        ],
      };

      return request(app)
        .get('/api/v2/events?featured')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Filters by Sort', function () {
      const expected = {
        total: 3,
        perPage: nconf.get('pagination:perPage'),
        currentPage: 1,
        data: [
          {
            name: 'Intro to Bitcoin',
            committeeName: 'Talks',
            startDate: '2017-12-15T05:00:00.000Z',
            endDate: '2017-12-15T10:00:00.000Z',
            description: null,
            location: 'The Lab',
            link: null,
            image: null,
          },
          {
            name: 'Review Session',
            committeeName: 'Mentoring',
            startDate: '2017-10-12T05:00:00.000Z',
            endDate: '2017-10-12T05:00:00.000Z',
            description: null,
            location: 'GOL-1440',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            name: 'Microtalks',
            committeeName: 'Talks',
            startDate: '2017-06-12T05:00:00.000Z',
            endDate: '2017-06-12T10:00:00.000Z',
            description: null,
            location: 'The Lab',
            link: null,
            image: null,
          },
        ],
      };

      return request(app)
        .get('/api/v2/events?sort=DESC')
        .expect(200)
        .then((response) => {
          response.body.data.forEach((event) => {
            delete event.id;
            delete event.createdAt;
            delete event.updatedAt;
          });
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Returns a Calendar Event When Accepting ICS', function () {
      const expected =
`BEGIN:VCALENDAR
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:America/New_York
X-LIC-LOCATION:America/New_York
BEGIN:DAYLIGHT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTEND;TZID=America/New_York;VALUE=DATE-TIME:20171012T010000
DTSTART;TZID=America/New_York;VALUE=DATE-TIME:20171012T010000
DESCRIPTION:null
SUMMARY:Review Session
LOCATION:GOL-1440
END:VEVENT
BEGIN:VEVENT
DTEND;TZID=America/New_York;VALUE=DATE-TIME:20170612T060000
DTSTART;TZID=America/New_York;VALUE=DATE-TIME:20170612T010000
DESCRIPTION:null
SUMMARY:Microtalks
LOCATION:The Lab
END:VEVENT
BEGIN:VEVENT
DTEND;TZID=America/New_York;VALUE=DATE-TIME:20171215T050000
DTSTART;TZID=America/New_York;VALUE=DATE-TIME:20171215T000000
DESCRIPTION:null
SUMMARY:Intro to Bitcoin
LOCATION:The Lab
END:VEVENT
END:VCALENDAR`;

      const nakedURL = request(app)
        .get('/api/v2/events')
        .set('accept', 'text/calendar')
        .expect(200)
        .then((response) => {
          expect(response.text).to.deep.equal(expected);
        });

      const icsExtension = request(app)
        .get('/api/v2/events.ics')
        .expect(200)
        .then((response) => {
          expect(response.text).to.deep.equal(expected);
        });

      return Promise.all([
        nakedURL,
        icsExtension,
      ]);
    });

    it('Does Not Accept Requests Not Accepting JSON or ICS', function () {
      const expected = {
        error: 'xml is not acceptable',
      };

      return request(app)
        .get('/api/v2/events')
        .set('accept', 'xml')
        .expect(406)
        .then((response) => {
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
        .post('/api/v2/events')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Requires Expected Permissions', function () {
      // Need Low Permissions be an Officer or Primary Officer
      const expected = {
        error: 'User does not have permission: create events',
      };

      const eventInput = {
        name: 'A Cool Talk',
        committeeName: 'Talks',
        startDate: '2017-06-12T05:00:00.000Z',
        endDate: '2017-06-12T10:00:00.000Z',
        location: 'The Lab',
      };

      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .send(eventInput)
        .expect(201);
      // Allow Officer w/ Low Permission Token
      const officerLow = request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${lowPermissionOfficerToken}`)
        .send(eventInput)
        .expect(201);

      return Promise.all([
        userHigh,
        primaryLow,
        officerLow,
      ]);
    });

    it('Creates an Event', function () {
      const expected = {
        name: 'A Cool Talk',
        committeeName: 'Talks',
        startDate: '2017-06-12T05:00:00.000Z',
        endDate: '2017-06-12T10:00:00.000Z',
        location: 'The Lab',
        description: null,
        image: null,
        link: null,
      };

      return request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${token}`)
        .send(expected)
        .expect(201)
        .then((response) => {
          delete response.body.id;
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Requires Start Date to be Before End Date', function () {
      const expected = {
        error: 'Validation error: Start date must be before the end date',
      };

      return request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'A Cool Talk',
          committeeName: 'Talks',
          startDate: '2017-07-12T05:00:00.000Z',
          endDate: '2017-06-12T10:00:00.000Z',
          location: 'The Lab',
        })
        .expect(422)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Errors When Insufficient Fields Provided', function () {
      const expected = {
        error: 'notNull Violation: name cannot be null,\nnotNull Violation: startDate cannot be null,\nnotNull Violation: endDate cannot be null,\nnotNull Violation: location cannot be null',
      };

      return request(app)
        .post('/api/v2/events')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(422)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });

  describe('GET /:id', function () {
    it('Gets a Specific Event', function () {
      const expected = {
        id: 1,
        name: 'Review Session',
        committeeName: 'Mentoring',
        startDate: '2017-10-12T05:00:00.000Z',
        endDate: '2017-10-12T05:00:00.000Z',
        location: 'GOL-1440',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: null,
      };

      return request(app)
        .get('/api/v2/events/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Does Not Find a Non-existent Event', function () {
      const expected = {
        error: 'Event not found',
      };

      return request(app)
        .get('/api/v2/events/100')
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
        .put('/api/v2/events/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Requires Expected Permissions', function () {
      // Need High Permissions be an Officer or Primary Officer
      const expected = {
        error: 'User does not have permission: update events',
      };

      const eventInput = {
        name: 'A Neat Talk',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .put('/api/v2/events/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ Low Permission Token
      const officerLow = request(app)
        .put('/api/v2/events/2')
        .set('Authorization', `Bearer ${lowPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .put('/api/v2/events/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .put('/api/v2/events/2')
        .set('Authorization', `Bearer ${token}`)
        .send(eventInput)
        .expect(200);
      // Allow Officer w/ High Permission Token
      const officerHigh = request(app)
        .put('/api/v2/events/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .send(eventInput)
        .expect(200);

      return Promise.all([
        primaryLow,
        officerLow,
        userHigh,
        primaryHigh,
        officerHigh,
      ]);
    });

    it('Updates a Specific Event', function () {
      const expected = {
        id: 1,
        name: 'Lunch and Learn',
        committeeName: 'Mentoring',
        startDate: '2017-10-12T05:00:00.000Z',
        endDate: '2017-10-12T05:00:00.000Z',
        description: null,
        location: 'GOL-1440',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      };

      return request(app)
        .put('/api/v2/events/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Lunch and Learn',
        })
        .expect(200)
        .then((response) => {
          delete response.body.createdAt;
          delete response.body.updatedAt;
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Does Not Find and Update a Non-existent Event', function () {
      const expected = {
        error: 'Event not found',
      };

      return request(app)
        .put('/api/v2/events/100')
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
        .delete('/api/v2/events/1')
        .expect(401)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });

    it('Requires Expected Permissions', function () {
      // Need High Permissions be an Officer or Primary Officer
      const expected = {
        error: 'User does not have permission: destroy events',
      };

      // Deny Primary Officer w/ Low Permission Token
      const primaryLow = request(app)
        .delete('/api/v2/events/2')
        .set('Authorization', `Bearer ${lowPermissionPrimaryToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny Officer w/ Low Permission Token
      const officerLow = request(app)
        .delete('/api/v2/events/2')
        .set('Authorization', `Bearer ${lowPermissionOfficerToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Deny User w/ High Permission Token
      const userHigh = request(app)
        .delete('/api/v2/events/2')
        .set('Authorization', `Bearer ${highPermissionUserToken}`)
        .expect(403)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
      // Allow Primary Officer w/ High Permission Token
      const primaryHigh = request(app)
        .delete('/api/v2/events/2')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
      // Allow Officer w/ High Permission Token
      const officerHigh = request(app)
        .delete('/api/v2/events/2')
        .set('Authorization', `Bearer ${highPermissionOfficerToken}`)
        .expect(204);

      return Promise.all([
        primaryLow,
        officerLow,
        userHigh,
        primaryHigh,
        officerHigh,
      ]);
    });

    it('Deletes a Specific Event', function () {
      request(app)
        .delete('/api/v2/events/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        .then(() => {
          request(app)
            .get('/api/v2/events/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
        });
    });

    it('Does Not Find and Delete a Non-existent Event', function () {
      const expected = {
        error: 'Event not found',
      };

      request(app)
        .delete('/api/v2/events/100')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .then((response) => {
          expect(response.body).to.deep.equal(expected);
        });
    });
  });
});
