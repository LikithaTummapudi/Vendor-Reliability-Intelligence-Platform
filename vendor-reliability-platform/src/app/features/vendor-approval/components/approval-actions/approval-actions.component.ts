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


@Component({
  selector: 'app-approval-actions',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './approval-actions.component.html',
  styleUrls: ['./approval-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalActionsComponent {

  @Input()
  vendorId!: string;

  @Output()
  approve = new EventEmitter<string>();

  @Output()
  reject = new EventEmitter<string>();

  @Output()
  view = new EventEmitter<string>();

  onApprove(): void {
    this.approve.emit(this.vendorId);
  }

  onReject(): void {
    this.reject.emit(this.vendorId);
  }

  onView(): void {
    this.view.emit(this.vendorId);
  }

}