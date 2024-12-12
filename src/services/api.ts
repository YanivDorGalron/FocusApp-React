import { FocusSession } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const getAuthStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/status`, {
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('Error checking auth status:', error);
    throw error;
  }
};

export const initiateGoogleAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/url`, {
      credentials: 'include'
    });
    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Error initiating Google auth:', error);
    throw error;
  }
};

export const addFocusSessionToCalendar = async (session: FocusSession) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calendar/add-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(session),
    });

    if (!response.ok) {
      throw new Error('Failed to add session to calendar');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding session to calendar:', error);
    throw error;
  }
};