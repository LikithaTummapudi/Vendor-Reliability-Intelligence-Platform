export type MessageStatus = 'sent' | 'delivered' | 'seen';

export interface MessageAttachment {

  id: string;

  fileName: string;

  fileSize: string;

  fileType: string;

  url: string;

}

export interface Message {

  id: number;

  conversationId: number;

  sender: string;

  senderAvatar: string;

  mine: boolean;

  text?: string;

  sentAt: string;

  status: MessageStatus;

  attachment?: MessageAttachment;

}