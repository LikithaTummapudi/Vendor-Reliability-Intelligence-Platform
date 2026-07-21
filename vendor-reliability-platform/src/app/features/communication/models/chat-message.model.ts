export interface ChatMessage {

  id: string;

  senderId: string;

  senderName: string;

  content: string;

  sentAt: string;

  isCurrentUser: boolean;

  isEdited: boolean;

  isRead: boolean;

}