import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-conversation-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationCardComponent {

  @Input({ required: true })
  conversation!: any;

  getInitials(name: string): string {

    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  }

}