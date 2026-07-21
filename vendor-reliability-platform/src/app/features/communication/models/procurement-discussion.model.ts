export type DiscussionStatus = 'Active' | 'Pending' | 'Closed';
export type DiscussionPriority = 'Low' | 'Medium' | 'High';

export interface ProcurementDiscussion {
  id: string;

  title: string;
  referenceNo: string;

  vendorName: string;

  status: DiscussionStatus;
  priority: DiscussionPriority;

  lastMessage: string;
  lastUpdated: string;

  dueDate: string;

  unreadCount: number;
}