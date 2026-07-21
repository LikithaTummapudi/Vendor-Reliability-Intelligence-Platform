export interface DiscussionMessage {

  id: string;

  discussionId: string;

  sender: string;

  message: string;

  sentAt: string;

  isCurrentUser: boolean;

}