import { initiateGoogleAuth } from '../services/googleAuth';

export function GoogleAuthButton() {
  return (
    <button
      onClick={initiateGoogleAuth}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Connect Google Calendar
    </button>
  );
}