import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})

export class AdminDashboard {
  totalUsers = 245;
activeVendors = 156;
pendingApprovals = 12;
systemUptime = '99.9%';

users = [
  {
    name: 'John Smith',
    role: 'Procurement Manager',
    status: 'Active'
  },
  {
    name: 'Sarah Johnson',
    role: 'Vendor Manager',
    status: 'Active'
  },
  {
    name: 'David Wilson',
    role: 'Admin',
    status: 'Inactive'
  }
];

reports = [
  'Monthly Procurement Report',
  'Vendor Reliability Report',
  'Compliance Audit Report',
  'Purchase Order Summary'
];

systemStats = [
  {
    label: 'Database Storage',
    value: '85 GB'
  },
  {
    label: 'API Requests Today',
    value: '12,540'
  },
  {
    label: 'Active Sessions',
    value: '89'
  },
  {
    label: 'Last Backup',
    value: 'Today 02:00 AM'
  }
];

vendorAnalyticsData = {
  labels: ['Excellent', 'Good', 'Average', 'Poor'],
  datasets: [
    {
      data: [40, 60, 35, 10],
      label: 'Vendors'
    }
  ]
};

complianceData = {
  labels: ['Compliant', 'Pending Review', 'Non-Compliant'],
  datasets: [
    {
      data: [78, 15, 7]
    }
  ]
};

}
