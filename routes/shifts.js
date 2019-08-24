import { Router } from 'express';
import moment from 'moment';
import { google } from 'googleapis';
import nconf from '../config';

const calendar = google.calendar('v3');
const router = Router(); // eslint-disable-line new-cap

router.route('/').get((req, res, next) => {
  if (req.accepts('json')) {
    calendar.events.list(
      {
        auth: nconf.get('auth:google:key'),
        calendarId: nconf.get('auth:google:calendars:mentor'),
        singleEvents: true,
        timeMin:
          req.query.startTime ||
          moment()
            .day('Sunday')
            .toISOString(),
        timeMax:
          req.query.endTime ||
          moment()
            .day('Saturday')
            .toISOString(),
        orderBy: 'startTime',
      },
      (err, response) => {
        if (err) {
          err.status = err.code;
          return next(err);
        }
        return res.send({
          data: response.items.map(({ summary, start, end }) => ({
            startDate: start.dateTime,
            endDate: end.dateTime,
            fullName: summary,
          })),
        });
      }
    );
  } else if (req.accepts('ics')) {
    res.redirect(
      `https://calendar.google.com/calendar/ical/${nconf.get(
        'auth:google:calendars:mentor'
      )}/public/basic.ics`
    );
  } else {
    return next({
      status: 406,
      message: `${req.headers.accept} is not acceptable`,
    });
  }
});

export default router;
