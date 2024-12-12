import { GoogleAuthProvider, OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
let oauth2Client: OAuth2Client | null = null;

export const initializeGoogleAuth = async () => {
  try {
    const response = await fetch('/api/auth/credentials');
    const { credentials } = await response.json();
    
    oauth2Client = new OAuth2Client(
      credentials.client_id,
      credentials.client_secret,
      window.location.origin + '/oauth2callback'
    );
    
    return oauth2Client;
  } catch (error) {
    console.error('Error initializing Google Auth:', error);
    throw error;
  }
};

export const getAuthUrl = async () => {
  if (!oauth2Client) {
    await initializeGoogleAuth();
  }
  
  return oauth2Client?.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
};

export const handleAuthCallback = async (code: string) => {
  if (!oauth2Client) {
    await initializeGoogleAuth();
  }
  
  try {
    const { tokens } = await oauth2Client!.getToken(code);
    oauth2Client!.setCredentials(tokens);
    localStorage.setItem('googleTokens', JSON.stringify(tokens));
    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw error;
  }
};