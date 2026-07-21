export interface Conversation {
  id: string;
  name: string;

  avatarUrl?: string;

  isGroup: boolean;

  isOnline: boolean;

  lastMessage: string;

  lastMessageTime: string;

  unreadCount: number;

  isPinned: boolean;

  isMuted: boolean;

  participantCount?: number;

  lastSeen?: string;
}