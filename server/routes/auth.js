import express from 'express';
import { getAuthClient } from '../auth.js';

const router = express.Router();

router.get('/status', (req, res) => {
  const auth = getAuthClient();
  res.json({ isAuthenticated: !!auth.credentials });
});

router.get('/url', (req, res) => {
  const auth = getAuthClient();
  const url = auth.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
  });
  res.json({ url });
});

router.get('/credentials', (req, res) => {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    res.json({
      credentials: {
        client_id: credentials.web.client_id,
        client_secret: credentials.web.client_secret,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get credentials' });
  }
});

export default router;