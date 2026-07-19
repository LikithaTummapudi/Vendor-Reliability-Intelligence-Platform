import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';

import {
  FilterToolbarComponent,
  VendorFilter
} from '../../components/filter-toolbar/filter-toolbar.component';

//import { VendorSummaryComponent } from '../../components/vendor-summary/vendor-summary.component';
import { VendorTableComponent } from '../../components/vendor-table/vendor-table.component';
import { RejectDialogComponent } from '../../components/reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-approval-dashboard',
  standalone: true,
  imports: [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  FilterToolbarComponent,
  VendorTableComponent
  ],
  templateUrl: './approval-dashboard.component.html',
  styleUrls: ['./approval-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalDashboardComponent implements OnInit {

  private vendorService = inject(VendorService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  vendors: Vendor[] = [];
  filteredVendors: Vendor[] = [];

  total = 0;
  pending = 0;
  approved = 0;
  rejected = 0;
  averageReliability = 0;
  highRisk = 0;

  ngOnInit(): void {

    this.vendorService.getVendors().subscribe(vendors => {

      this.vendors = vendors;
      this.filteredVendors = [...vendors];

      this.calculateSummary();

    });

  }

  private calculateSummary(): void {

  this.total = this.vendors.length;

  this.pending = this.vendors.filter(
    vendor => vendor.status === 'Pending'
  ).length;

  this.approved = this.vendors.filter(
    vendor => vendor.status === 'Approved'
  ).length;

  this.rejected = this.vendors.filter(
    vendor => vendor.status === 'Rejected'
  ).length;

  this.highRisk = this.vendors.filter(
    vendor => vendor.riskScore >= 70
  ).length;

  this.averageReliability = this.vendors.length
    ? Math.round(
        this.vendors.reduce(
          (sum, vendor) => sum + vendor.reliabilityScore,
          0
        ) / this.vendors.length
      )
    : 0;

}

  onFiltersChanged(filter: VendorFilter): void {

    this.filteredVendors = this.vendors.filter(vendor => {

      const searchMatch =
        !filter.search ||
        vendor.companyName.toLowerCase().includes(filter.search.toLowerCase()) ||
        vendor.contactPerson.toLowerCase().includes(filter.search.toLowerCase()) ||
        vendor.email.toLowerCase().includes(filter.search.toLowerCase());

      const categoryMatch =
        filter.category === 'All' ||
        vendor.category === filter.category;

      const statusMatch =
        filter.status === 'All' ||
        vendor.status === filter.status;

      let riskMatch = true;

      if (filter.risk === 'Low') {
        riskMatch = vendor.riskScore <= 30;
      }

      if (filter.risk === 'Medium') {
        riskMatch = vendor.riskScore > 30 && vendor.riskScore <= 70;
      }

      if (filter.risk === 'High') {
        riskMatch = vendor.riskScore > 70;
      }

      return searchMatch && categoryMatch && statusMatch && riskMatch;

    });

  }

  approveVendor(id: string): void {

    this.vendorService.approveVendor(id);

    this.snackBar.open(
      'Vendor approved successfully.',
      'Close',
      { duration: 3000 }
    );

  }

  rejectVendor(id: string): void {

    const dialogRef = this.dialog.open(RejectDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result?.confirmed) {
        return;
      }

      this.vendorService.rejectVendor(id);

      this.snackBar.open(
        'Vendor rejected successfully.',
        'Close',
        { duration: 3000 }
      );

    });

  }

  viewVendor(id: string): void {

    this.router.navigate([
      '/vendor-approval/review',
      id
    ]);

  }

}