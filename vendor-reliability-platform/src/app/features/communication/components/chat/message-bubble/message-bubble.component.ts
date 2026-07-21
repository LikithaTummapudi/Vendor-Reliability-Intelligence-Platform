import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  Message,
  MessageAttachment
} from '../../../models/message.model';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBubbleComponent {

  @Input({ required: true })
  message!: Message;

  @Input()
  showAvatar = true;

  @Input()
  showSenderName = false;

  @Output()
  reply = new EventEmitter<Message>();

  @Output()
  react = new EventEmitter<Message>();

  @Output()
  downloadAttachment = new EventEmitter<MessageAttachment>();

  onReply(): void {
    this.reply.emit(this.message);
  }

  onReact(): void {
    this.react.emit(this.message);
  }

  onDownload(attachment: MessageAttachment): void {
    this.downloadAttachment.emit(attachment);
  }
}