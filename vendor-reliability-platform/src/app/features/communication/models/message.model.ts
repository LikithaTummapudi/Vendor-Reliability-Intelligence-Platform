export type MessageType = 'text' | 'image' | 'file' | 'system';

export interface MessageReaction {
  emoji: string;
  count: number;
  reactedByCurrentUser: boolean;
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  url: string;
}

export interface Message {
  id: string;
  conversationId: string;

  senderId: string;
  senderName: string;
  senderAvatar?: string;

  content: string;
  type: MessageType;

  sentAt: string;

  isCurrentUser: boolean;
  isEdited: boolean;
  isRead: boolean;

  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];

  replyToMessageId?: string;
}