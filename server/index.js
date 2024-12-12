import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAuthClient, SCOPES, getUserEmail } from './services/authService.js';
import { addCalendarEvent } from './services/calendarService.js';
import { sendWelcomeEmail, sendSessionCompletionEmail } from './services/emailService.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/auth/status', (req, res) => {
  const auth = getAuthClient();
  res.json({ isAuthenticated: !!auth.credentials });
});

app.get('/api/auth/url', (req, res) => {
  const auth = getAuthClient();
  const url = auth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.json({ url });
});

app.get('/api/oauth2callback', async (req, res) => {
  const auth = getAuthClient();
  const { code } = req.query;

  try {
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);
    
    const userEmail = await getUserEmail(auth);
    await sendWelcomeEmail(auth, userEmail);

    res.redirect('http://localhost:5173');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed!');
  }
});

app.post('/api/calendar/add-session', async (req, res) => {
  try {
    const sessionData = req.body;
    const auth = getAuthClient();

    if (!auth.credentials) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const response = await addCalendarEvent(auth, sessionData);
    const userEmail = await getUserEmail(auth);
    await sendSessionCompletionEmail(auth, userEmail, sessionData.task, sessionData.duration);

    res.json({ success: true, eventId: response.data.id });
  } catch (error) {
    console.error('Error adding calendar event:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});