import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CommunicationTabsComponent } from '../../components/navigation/communication-tabs/communication-tabs.component';

import { ConversationListComponent } from '../../components/conversations/conversation-list/conversation-list.component';
import { ChatHeaderComponent } from '../../components/chat/chat-header/chat-header.component';
import { MessageListComponent } from '../../components/chat/message-list/message-list.component';
import { MessageComposerComponent } from '../../components/chat/message-composer/message-composer.component';
import { RightSidebarComponent } from '../../components/right-sidebar/right-sidebar.component';

import { DiscussionThreadsComponent } from '../discussion-threads/discussion-threads.component';
import { FileSharingComponent } from '../../components/files/file-sharing/file-sharing.component';
import { CommunicationHistoryComponent } from '../communication-history/communication-history.component';
import { EmailNotificationsComponent } from '../../components/email/email-notifications/email-notifications.component';
import { ActivityLogsComponent } from '../../components/activity/activity-logs/activity-logs.component';

import { CommunicationService } from '../../services/communication.service';

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
    RightSidebarComponent,
    DiscussionThreadsComponent,
    FileSharingComponent,
    CommunicationHistoryComponent,
    EmailNotificationsComponent,
    ActivityLogsComponent
  ],
  templateUrl: './communication-workspace.component.html',
  styleUrls: ['./communication-workspace.component.scss']
})
export class CommunicationWorkspaceComponent
  implements OnInit, AfterViewInit {

  selectedTab = 0;

  conversations: any[] = [];
  messages: any[] = [];
  selectedConversation: any = null;

  constructor(
    private communicationService: CommunicationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.communicationService.conversations$
      .subscribe(data => {

        this.conversations = data;

        if (!this.selectedConversation && data.length) {

          this.selectedConversation = data[0];

          this.communicationService.loadConversation(
            this.selectedConversation.id
          );

        }

      });

    this.communicationService.messages$
      .subscribe(data => {

        this.messages = data;

      });

  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onTabChanged(index: number): void {
    this.selectedTab = index;
  }

  selectConversation(conversation: any): void {

    this.selectedConversation = conversation;

    this.communicationService.loadConversation(
      conversation.id
    );

  }

  sendMessage(text: string): void {

    if (!this.selectedConversation) {
      return;
    }

    this.communicationService.sendMessage(
      this.selectedConversation.id,
      text
    );

  }

}