import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProcurementDiscussion } from '../../../models/procurement-discussion.model';
import { DiscussionCardComponent } from '../discussion-card/discussion-card.component';

@Component({
  selector: 'app-discussion-list',
  standalone: true,
  imports: [
    CommonModule,
    DiscussionCardComponent
  ],
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionListComponent {

  @Input()
  discussions: ProcurementDiscussion[] = [];

  @Input()
  selectedDiscussionId = '';

  @Output()
  discussionSelected = new EventEmitter<ProcurementDiscussion>();

  select(discussion: ProcurementDiscussion): void {
    this.discussionSelected.emit(discussion);
  }

}