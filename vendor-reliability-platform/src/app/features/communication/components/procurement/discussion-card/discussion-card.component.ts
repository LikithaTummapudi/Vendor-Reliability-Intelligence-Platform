import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProcurementDiscussion } from '../../../models/procurement-discussion.model';

@Component({
  selector: 'app-discussion-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discussion-card.component.html',
  styleUrls: ['./discussion-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionCardComponent {

  @Input({ required: true })
  discussion!: ProcurementDiscussion;

  @Input()
  selected = false;

  @Output()
  selectedChange = new EventEmitter<ProcurementDiscussion>();

  select(): void {
    this.selectedChange.emit(this.discussion);
  }

}