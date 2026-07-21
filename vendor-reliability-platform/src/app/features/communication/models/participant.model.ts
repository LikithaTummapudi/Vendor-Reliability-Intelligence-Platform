export interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
  isOnline: boolean;
  role?: string;
}