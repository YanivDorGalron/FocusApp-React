import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

let oauth2Client = null;

export const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.send'
];

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

export const getUserEmail = async (auth) => {
  const oauth2 = google.oauth2({ version: 'v2', auth });
  const { data } = await oauth2.userinfo.get();
  return data.email;
};