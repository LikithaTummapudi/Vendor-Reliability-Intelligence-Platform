import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
imports: [CommonModule]
@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-dashboard.html',
  styleUrl: './vendor-dashboard.css'
})

export class VendorDashboard {

  vendorPerformance = [
  {
    metric: 'Quality',
    score: 95
  },
  {
    metric: 'Cost Competitiveness',
    score: 88
  },
  {
    metric: 'Responsiveness',
    score: 92
  }
];

reliabilityScore = 92;

contracts = [
  {
    contractId: 'CT-1001',
    startDate: '01-Jan-2026',
    renewalDate: '31-Dec-2026',
    status: 'Active'
  }
];

orderHistory = [
  {
    po: 'PO-2001',
    date: '10-Jul-2026',
    items: 12,
    amount: '$25,000',
    delivery: 'Delivered',
    rating: 5
  },
  {
    po: 'PO-2002',
    date: '05-Jul-2026',
    items: 8,
    amount: '$18,500',
    delivery: 'In Transit',
    rating: 4
  }
];

communications = [
  'Purchase order approved',
  'Delivery confirmation received',
  'Contract renewal reminder sent',
  'Vendor responded to query'
];

}
