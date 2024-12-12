import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

let oauth2Client = null;

export const getAuthClient = () => {
  if (!oauth2Client) {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    oauth2Client = new OAuth2Client(
      credentials.web.client_id,
      credentials.web.client_secret,
      'http://localhost:5173/oauth2callback'
    );
  }
  return oauth2Client;
};

export const verifyAuth = async (req, res, next) => {
  try {
    const auth = getAuthClient();
    if (!auth.credentials) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};