import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Conversation } from '../../../models/conversation.model';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHeaderComponent {

  @Input({ required: true })
  conversation!: Conversation;

  @Output()
  voiceCall = new EventEmitter<void>();

  @Output()
  videoCall = new EventEmitter<void>();

  @Output()
  search = new EventEmitter<void>();

  @Output()
  moreActions = new EventEmitter<void>();

}