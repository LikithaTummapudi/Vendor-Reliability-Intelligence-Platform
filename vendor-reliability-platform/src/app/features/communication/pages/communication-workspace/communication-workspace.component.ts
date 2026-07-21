import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Conversation } from '../../models/conversation.model';
import { Message } from '../../models/message.model';

import { CommunicationTabsComponent } from '../../components/navigation/communication-tabs/communication-tabs.component';

import { ConversationListComponent } from '../../components/conversations/conversation-list/conversation-list.component';
import { ChatHeaderComponent } from '../../components/chat/chat-header/chat-header.component';
import { MessageListComponent } from '../../components/chat/message-list/message-list.component';
import { MessageComposerComponent } from '../../components/chat/message-composer/message-composer.component';

import { ConversationDetailsComponent } from '../../components/details/conversation-details/conversation-details.component';
import { Participant } from '../../models/participant.model';

import { DiscussionListComponent } from '../../components/procurement/discussion-list/discussion-list.component';
import { DiscussionThreadComponent } from '../../components/procurement/discussion-thread/discussion-thread.component';
import { DiscussionDetailsComponent } from '../../components/procurement/discussion-details/discussion-details.component';
import { DiscussionComposerComponent } from '../../components/procurement/discussion-composer/discussion-composer.component';

import { ProcurementDiscussion } from '../../models/procurement-discussion.model';
import { DiscussionMessage } from '../../models/discussion-message.model';
import { FileSharingComponent } from '../../components/files/file-sharing/file-sharing.component';

@Component({
  selector: 'app-communication-workspace',
  standalone: true,
  imports: [
    CommonModule,
    CommunicationTabsComponent,
    ConversationListComponent,
    ChatHeaderComponent,
    MessageListComponent,
    MessageComposerComponent,
    ConversationDetailsComponent,
    DiscussionListComponent,
    DiscussionThreadComponent,
    DiscussionDetailsComponent,
    DiscussionComposerComponent,
    FileSharingComponent
  ],
  templateUrl: './communication-workspace.component.html',
  styleUrls: ['./communication-workspace.component.scss']
})
export class CommunicationWorkspaceComponent {

  selectedTab = 0;

  conversations: Conversation[] = [
    {
      id: '1',
      name: 'Procurement Team',
      isGroup: true,
      isOnline: true,
      lastMessage: 'Contract approved.',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 2,
      isPinned: true,
      isMuted: false,
      participantCount: 12
    }
  ];

  participants: Participant[] = [
  {
    id: '1',
    name: 'Rahul',
    isOnline: true,
    role: 'Procurement Manager'
  },
  {
    id: '2',
    name: 'Sneha',
    isOnline: true,
    role: 'Vendor Manager'
  }
];

discussions: ProcurementDiscussion[] = [
  {
    id: '1',
    title: 'RFQ for Office Laptops',
    referenceNo: 'RFQ-1042',
    vendorName: 'Dell Technologies',
    status: 'Active',
    priority: 'High',
    lastMessage: 'Quotation received from vendor.',
    lastUpdated: '10:45 AM',
    dueDate: '25 Jul 2026',
    unreadCount: 2
  }
];

selectedDiscussion = this.discussions[0];

discussionMessages: DiscussionMessage[] = [
  {
    id: '1',
    discussionId: '1',
    sender: 'Procurement Manager',
    message: 'Please review the quotation before approval.',
    sentAt: '10:30 AM',
    isCurrentUser: false
  }
];


  selectedConversation = this.conversations[0];

  messages: Message[] = [
    {
      id: '1',
      conversationId: '1',
      senderId: '101',
      senderName: 'Rahul',
      content: 'The contract has been approved.',
      type: 'text',
      sentAt: new Date().toISOString(),
      isCurrentUser: false,
      isEdited: false,
      isRead: true
    }
  ];

  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
  }

  sendMessage(text: string): void {
    this.messages = [
      ...this.messages,
      {
        id: crypto.randomUUID(),
        conversationId: this.selectedConversation.id,
        senderId: 'me',
        senderName: 'Me',
        content: text,
        type: 'text',
        sentAt: new Date().toISOString(),
        isCurrentUser: true,
        isEdited: false,
        isRead: false
      }
    ];
  }
}