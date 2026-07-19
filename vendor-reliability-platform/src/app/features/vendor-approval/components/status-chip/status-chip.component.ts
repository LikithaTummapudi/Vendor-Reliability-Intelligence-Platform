import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { VendorStatus } from '../../models/vendor';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule
  ],
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChipComponent {

  @Input({ required: true })
  status!: VendorStatus;

  get cssClass(): string {

    switch (this.status) {

      case 'Approved':
        return 'approved';

      case 'Rejected':
        return 'rejected';

      case 'Changes Requested':
        return 'changes';

      default:
        return 'pending';

    }

  }

}