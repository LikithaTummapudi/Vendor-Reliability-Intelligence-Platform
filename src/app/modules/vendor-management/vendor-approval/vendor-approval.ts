import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-approval.html',
  styleUrls: ['./vendor-approval.css']
})
export class VendorApproval {

  vendors = [
    {
      id: 'V001',
      name: 'Global Logistics',
      category: 'Logistics',
      submitted: '15 Jul 2026',
      score: 94,
      status: 'Pending'
    },
    {
      id: 'V002',
      name: 'ABC Suppliers',
      category: 'Raw Materials',
      submitted: '18 Jul 2026',
      score: 91,
      status: 'Approved'
    },
    {
      id: 'V003',
      name: 'Tech Solutions',
      category: 'IT Vendor',
      submitted: '20 Jul 2026',
      score: 72,
      status: 'Rejected'
    }
  ];

  approve(vendor: any) {
    vendor.status = 'Approved';
  }

  reject(vendor: any) {
    vendor.status = 'Rejected';
  }

}