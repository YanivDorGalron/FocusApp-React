import express from 'express';
import { google } from 'googleapis';
import { getAuthClient, verifyAuth } from '../auth.js';

const router = express.Router();

router.post('/add-session', verifyAuth, async (req, res) => {
  try {
    const { startTime, duration, task, ccEmail, colorId } = req.body;
    const auth = getAuthClient();
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
      colorId: colorId?.toString() || '1',
    };

    if (ccEmail) {
      event.attendees = [{ email: ccEmail }];
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all',
    });

    res.json({ success: true, eventId: response.data.id });
  } catch (error) {
    console.error('Error adding calendar event:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;