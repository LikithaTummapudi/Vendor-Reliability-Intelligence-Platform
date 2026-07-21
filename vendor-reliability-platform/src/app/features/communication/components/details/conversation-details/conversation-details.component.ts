import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Conversation } from '../../../models/conversation.model';

import { Participant } from '../../../models/participant.model';
import { SharedFile } from '../../../models/shared-file.model';

@Component({
  selector: 'app-conversation-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationDetailsComponent {

  @Input({ required: true })
  conversation!: Conversation;

  @Input()
  participants: Participant[] = [];

  @Input()
  sharedFiles: SharedFile[] = [];

}