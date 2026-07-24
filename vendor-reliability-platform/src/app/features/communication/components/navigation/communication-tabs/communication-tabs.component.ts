import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

interface CommunicationTab {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-communication-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './communication-tabs.component.html',
  styleUrls: ['./communication-tabs.component.scss']
})
export class CommunicationTabsComponent {

  @Input()
  selectedIndex = 0;

  @Output()
  selectedIndexChange = new EventEmitter<number>();

  readonly tabs: CommunicationTab[] = [
    {
      label: 'Vendor Messaging',
      icon: '💬'
    },
    {
      label: 'Procurement Discussions',
      icon: '📋'
    },
    {
      label: 'File Sharing',
      icon: '📁'
    },
    {
      label: 'Communication History',
      icon: '🕒'
    },
    {
      label: 'Email Notifications',
      icon: '✉️'
    },
    {
      label: 'Activity Logs',
      icon: '📊'
    }
  ];

  changeTab(index: number): void {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }

}