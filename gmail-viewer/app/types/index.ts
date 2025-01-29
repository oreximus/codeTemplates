// app/types/index.ts
export interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
}
  
export interface SendEmailData {
  to: string;
  subject: string;
  body: string;
}