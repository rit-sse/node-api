'use strict';

import moment from 'moment-timezone';

const timezone = `BEGIN:VTIMEZONE
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
END:VTIMEZONE`;

function dateString(date) {
  return moment(date).tz('America/New_York').format('YYYYMMDD[T]HHmmss');
}

function event(ev) {
  return `BEGIN:VEVENT
DTEND;TZID=America/New_York;VALUE=DATE-TIME:${dateString(ev.endDate)}
DTSTART;TZID=America/New_York;VALUE=DATE-TIME:${dateString(ev.startDate)}
DESCRIPTION:${ev.description}
SUMMARY:${ev.name}
LOCATION:${ev.location}
END:VEVENT`;
}

export default function ical(events) {
  return `BEGIN:VCALENDAR
CALSCALE:GREGORIAN
${timezone}
${events.map(event).join('\n')}
END:VCALENDAR`;
}
