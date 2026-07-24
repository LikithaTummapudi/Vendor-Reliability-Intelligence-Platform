export type EmailStatus =
  | 'Delivered'
  | 'Read'
  | 'Pending';

export interface EmailNotification {

  id: string;

  subject: string;

  sender: string;

  recipient: string;

  preview: string;

  timestamp: string;

  status: EmailStatus;

}