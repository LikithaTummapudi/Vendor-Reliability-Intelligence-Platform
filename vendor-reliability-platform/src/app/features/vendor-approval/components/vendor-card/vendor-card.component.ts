import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Vendor } from '../../models/vendor';
import { StatusChipComponent } from '../status-chip/status-chip.component';

@Component({
  selector: 'app-vendor-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    StatusChipComponent
  ],
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorCardComponent {

  @Input({ required: true })
  vendor!: Vendor;

  @Output()
  view = new EventEmitter<string>();

  openVendor(): void {
    this.view.emit(this.vendor.id);
  }

}