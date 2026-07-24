export type HistoryEventType =
  | 'message'
  | 'file'
  | 'discussion'
  | 'email'
  | 'status';

export interface HistoryEvent {

  id: string;

  type: HistoryEventType;

  title: string;

  description: string;

  user: string;

  timestamp: string;

}