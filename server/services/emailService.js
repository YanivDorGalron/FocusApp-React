import { google } from 'googleapis';

export const sendEmail = async (auth, to, subject, body) => {
  const gmail = google.gmail({ version: 'v1', auth });
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    body,
  ];
  const message = messageParts.join('\n');
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
};

export const sendWelcomeEmail = async (auth, userEmail) => {
  await sendEmail(
    auth,
    userEmail,
    'Welcome to Focus Timer',
    `<h1>Welcome to Focus Timer!</h1>
    <p>Your account has been successfully connected. You can now track your focus sessions in your Google Calendar.</p>`
  );
};

export const sendSessionCompletionEmail = async (auth, userEmail, task, duration) => {
  await sendEmail(
    auth,
    userEmail,
    'Focus Session Completed',
    `<h1>Focus Session Completed!</h1>
    <p>Your focus session "${task}" has been completed and added to your calendar.</p>
    <p>Duration: ${duration} minutes</p>`
  );
};