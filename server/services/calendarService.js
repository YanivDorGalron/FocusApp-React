import { google } from 'googleapis';

export const addCalendarEvent = async (auth, { startTime, duration, task, ccEmail }) => {
  const calendar = google.calendar({ version: 'v3', auth });

  const startDateTime = new Date(startTime);
  const endDateTime = new Date(startTime);
  endDateTime.setMinutes(endDateTime.getMinutes() + duration);

  const event = {
    summary: `Focus Session: ${task}`,
    description: `Focus time on task: ${task}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'UTC',
    },
    colorId: '1',
  };

  if (ccEmail) {
    event.attendees = [{ email: ccEmail }];
  }

  return await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    sendUpdates: 'all',
  });
};