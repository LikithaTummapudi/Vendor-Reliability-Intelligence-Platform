import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryEvent } from '../../../models/history-event.model';

@Component({
  selector: 'app-history-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryCardComponent {

  @Input({ required: true })
  event!: HistoryEvent;

  get icon(): string {

    switch (this.event.type) {

      case 'message':
        return '💬';

      case 'file':
        return '📎';

      case 'discussion':
        return '🛒';

      case 'email':
        return '📧';

      case 'status':
        return '✅';

      default:
        return '📌';

    }

  }

}