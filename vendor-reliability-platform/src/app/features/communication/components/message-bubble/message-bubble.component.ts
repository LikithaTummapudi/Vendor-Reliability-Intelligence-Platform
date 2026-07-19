import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBubbleComponent {

  @Input({required:true})
  message!: any;

}