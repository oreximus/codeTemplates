// app/lib/gmail.ts
import { google } from 'googleapis';
import { SendEmailData } from '../types';

export async function getGmailClient(accessToken: string) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  
  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function listEmails(accessToken: string) {
  const gmail = await getGmailClient(accessToken);
  
  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 10,
  });

  const messages = await Promise.all(
    response.data.messages?.map(async (message) => {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
      });

      const headers = email.data.payload?.headers;
      const subject = headers?.find((h) => h.name === 'Subject')?.value;
      const from = headers?.find((h) => h.name === 'From')?.value;
      const date = headers?.find((h) => h.name === 'Date')?.value;

      return {
        id: email.data.id!,
        subject: subject || 'No Subject',
        from: from || 'Unknown',
        date: date || new Date().toISOString(),
        body: email.data.snippet || '',
      };
    }) || []
  );

  return messages;
}

export async function sendEmail(accessToken: string, emailData: SendEmailData) {
  const gmail = await getGmailClient(accessToken);
  
  const message = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    `To: ${emailData.to}\n`,
    'From: me\n',
    `Subject: ${emailData.subject}\n\n`,
    emailData.body
  ].join('');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });

  return res.data;
}