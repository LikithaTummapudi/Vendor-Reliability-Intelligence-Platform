import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryCardComponent } from '../history-card/history-card.component';
import { HistoryEvent } from '../../../models/history-event.model';

@Component({
  selector: 'app-history-timeline',
  standalone: true,
  imports: [
    CommonModule,
    HistoryCardComponent
  ],
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.component.scss']
})
export class HistoryTimelineComponent {

  @Input()
  events: HistoryEvent[] = [];

}