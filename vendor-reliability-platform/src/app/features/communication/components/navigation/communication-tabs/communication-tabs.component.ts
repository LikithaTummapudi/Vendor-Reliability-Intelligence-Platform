import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-communication-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule
  ],
  templateUrl: './communication-tabs.component.html',
  styleUrls: ['./communication-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunicationTabsComponent {

  @Input()
  selectedIndex = 0;

  @Output()
  selectedIndexChange = new EventEmitter<number>();

  changeTab(index: number): void {
    this.selectedIndexChange.emit(index);
  }

}