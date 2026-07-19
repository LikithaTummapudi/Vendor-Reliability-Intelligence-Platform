import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-review',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './vendor-review.component.html',
  styleUrls: ['./vendor-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorReviewComponent implements OnInit {

  private service = inject(VendorService);

  private route = inject(ActivatedRoute);

  vendor?: Vendor;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.service.getVendor(id).subscribe(v => {

      this.vendor = v;

    });

  }

}