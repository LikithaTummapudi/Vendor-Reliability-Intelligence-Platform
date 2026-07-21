import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionMessage } from '../../../models/discussion-message.model';

@Component({
  selector: 'app-discussion-thread',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discussion-thread.component.html',
  styleUrls: ['./discussion-thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionThreadComponent {

  @Input({ required: true })
  messages: DiscussionMessage[] = [];

}