import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  accent: string;
}

interface ApprovalRow {
  vendorId: string;
  vendor: string;
  company: string;
  submittedDate: string;
  documents: number;
  reviewer: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Needs Info';
}

@Component({
  selector: 'app-vendor-approval',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vendor-approval.html',
  styleUrl: './vendor-approval.css'
})
export class VendorApproval {
  statCards: StatCard[] = [
    { label: 'Pending Vendors', value: '86', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', accent: 'amber' },
    { label: 'Approved Today', value: '14', icon: 'M5 13l4 4L19 7', accent: 'green' },
    { label: 'Rejected', value: '54', icon: 'M18.364 18.364A9 9 0 105.636 5.636a9 9 0 0012.728 12.728zM5.636 5.636l12.728 12.728', accent: 'red' },
    { label: 'Average Approval Time', value: '2.3 days', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', accent: 'blue' }
  ];

  queue: ApprovalRow[] = [
    { vendorId: 'VEN-2298', vendor: 'Ashwin Rao', company: 'Crestline Electricals', submittedDate: '24 Jul 2026', documents: 5, reviewer: 'Omar Haddad', status: 'Pending' },
    { vendorId: 'VEN-2297', vendor: 'Priya Menon', company: 'Solace Textiles', submittedDate: '23 Jul 2026', documents: 4, reviewer: 'Lena Fischer', status: 'Pending' },
    { vendorId: 'VEN-2294', vendor: 'Marcus Chen', company: 'Alloy Precision Works', submittedDate: '20 Jul 2026', documents: 3, reviewer: 'Omar Haddad', status: 'Needs Info' },
    { vendorId: 'VEN-2289', vendor: 'Grace Okafor', company: 'Continental Fasteners', submittedDate: '19 Jul 2026', documents: 6, reviewer: 'Lena Fischer', status: 'Pending' },
    { vendorId: 'VEN-2287', vendor: 'Tomas Novak', company: 'Baltic Cold Chain', submittedDate: '18 Jul 2026', documents: 5, reviewer: 'Priyanka Nair', status: 'Approved' },
    { vendorId: 'VEN-2283', vendor: 'Hana Suzuki', company: 'Kaizen Industrial Supplies', submittedDate: '17 Jul 2026', documents: 2, reviewer: 'Omar Haddad', status: 'Rejected' },
    { vendorId: 'VEN-2279', vendor: 'Peter van Dijk', company: 'Delta Marine Fittings', submittedDate: '16 Jul 2026', documents: 4, reviewer: 'Priyanka Nair', status: 'Pending' }
  ];

  approve(vendorId: string): void {
    const row = this.queue.find(q => q.vendorId === vendorId);
    if (row) row.status = 'Approved';
  }

  reject(vendorId: string): void {
    const row = this.queue.find(q => q.vendorId === vendorId);
    if (row) row.status = 'Rejected';
  }
}