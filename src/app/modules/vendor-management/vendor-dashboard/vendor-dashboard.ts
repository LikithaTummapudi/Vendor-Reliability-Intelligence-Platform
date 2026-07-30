import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  trend: string;
  trendUp: boolean;
  accent: string;
}

interface ActivityItem {
  id: string;
  vendor: string;
  action: string;
  time: string;
  icon: string;
  accent: string;
}

interface RegistrationItem {
  id: string;
  name: string;
  company: string;
  category: string;
  date: string;
  status: string;
}

interface CategorySlice {
  name: string;
  value: number;
  count: number;
  color: string;
}

interface PerformanceRow {
  metric: string;
  value: string;
  target: string;
  status: 'good' | 'warning' | 'critical';
}

interface ApprovalSummaryRow {
  label: string;
  value: number;
  color: string;
}

interface StatusDistributionRow {
  status: string;
  count: number;
  percent: number;
  color: string;
}

interface ApprovedVendor {
  id: string;
  name: string;
  company: string;
  category: string;
  approvedOn: string;
  rating: number;
}

interface VendorRequest {
  id: string;
  name: string;
  company: string;
  requestType: string;
  submitted: string;
  priority: 'High' | 'Medium' | 'Low';
}

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vendor-dashboard.html',
  styleUrl: './vendor-dashboard.css'
})
export class VendorDashboard {
  statCards: StatCard[] = [
    { label: 'Total Vendors', value: '1,284', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1m-6 4h1m4 0h1', trend: '+4.6%', trendUp: true, accent: 'blue' },
    { label: 'Active Vendors', value: '1,042', icon: 'M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z', trend: '+2.1%', trendUp: true, accent: 'green' },
    { label: 'Pending Approval', value: '86', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', trend: '+12.3%', trendUp: true, accent: 'amber' },
    { label: 'Blocked Vendors', value: '23', icon: 'M18.364 18.364A9 9 0 105.636 5.636a9 9 0 0012.728 12.728zM5.636 5.636l12.728 12.728', trend: '-3.4%', trendUp: false, accent: 'red' },
    { label: 'Preferred Vendors', value: '312', icon: 'M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.9-1.002L12 2.5l3.1 6.253 6.9 1.002-5.007 4.367 1.179 6.873z', trend: '+5.8%', trendUp: true, accent: 'violet' },
    { label: 'Top Rated Vendors', value: '158', icon: 'M5 13l4 4L19 7', trend: '+1.9%', trendUp: true, accent: 'teal' }
  ];

  recentActivity: ActivityItem[] = [
    { id: 'ACT-1042', vendor: 'Nimbus Steel Works', action: 'Uploaded updated tax compliance certificate', time: '12 minutes ago', icon: 'upload', accent: 'blue' },
    { id: 'ACT-1041', vendor: 'BlueWave Logistics', action: 'Status changed to Preferred Vendor', time: '48 minutes ago', icon: 'star', accent: 'violet' },
    { id: 'ACT-1040', vendor: 'Orion Components Ltd', action: 'Submitted for re-approval after audit', time: '1 hour ago', icon: 'refresh', accent: 'amber' },
    { id: 'ACT-1039', vendor: 'Fortis Packaging Co.', action: 'Bank details verified by finance team', time: '2 hours ago', icon: 'check', accent: 'green' },
    { id: 'ACT-1038', vendor: 'Meridian Chemicals', action: 'Flagged for delayed delivery performance', time: '3 hours ago', icon: 'flag', accent: 'red' },
    { id: 'ACT-1037', vendor: 'Crestline Electricals', action: 'New registration submitted for review', time: '5 hours ago', icon: 'file', accent: 'blue' }
  ];

  recentRegistrations: RegistrationItem[] = [
    { id: 'VEN-2298', name: 'Ashwin Rao', company: 'Crestline Electricals', category: 'Electrical Supplies', date: '24 Jul 2026', status: 'Pending' },
    { id: 'VEN-2297', name: 'Priya Menon', company: 'Solace Textiles', category: 'Raw Materials', date: '23 Jul 2026', status: 'Pending' },
    { id: 'VEN-2296', name: 'David Wilson', company: 'Northgate Hardware', category: 'Industrial Tools', date: '22 Jul 2026', status: 'Approved' },
    { id: 'VEN-2295', name: 'Fatima Al-Sayed', company: 'Zenith Freight Services', category: 'Logistics', date: '21 Jul 2026', status: 'Approved' },
    { id: 'VEN-2294', name: 'Marcus Chen', company: 'Alloy Precision Works', category: 'Manufacturing', date: '20 Jul 2026', status: 'Rejected' }
  ];

  categories: CategorySlice[] = [
    { name: 'Raw Materials', value: 28, count: 359, color: 'blue' },
    { name: 'Logistics', value: 22, count: 282, color: 'teal' },
    { name: 'IT & Electronics', value: 18, count: 231, color: 'violet' },
    { name: 'Manufacturing', value: 16, count: 205, color: 'amber' },
    { name: 'Professional Services', value: 10, count: 128, color: 'green' },
    { name: 'Others', value: 6, count: 79, color: 'slate' }
  ];

  performance: PerformanceRow[] = [
    { metric: 'On-Time Delivery Rate', value: '94.2%', target: '95%', status: 'warning' },
    { metric: 'Quality Compliance Score', value: '97.8%', target: '95%', status: 'good' },
    { metric: 'Average Response Time', value: '6.4 hrs', target: '8 hrs', status: 'good' },
    { metric: 'Contract Renewal Rate', value: '81.5%', target: '85%', status: 'warning' },
    { metric: 'Dispute Resolution Rate', value: '68.0%', target: '90%', status: 'critical' }
  ];

  approvalSummary: ApprovalSummaryRow[] = [
    { label: 'Approved', value: 742, color: 'green' },
    { label: 'Pending', value: 86, color: 'amber' },
    { label: 'Rejected', value: 54, color: 'red' },
    { label: 'Needs Info', value: 19, color: 'blue' }
  ];

  statusDistribution: StatusDistributionRow[] = [
    { status: 'Approved', count: 742, percent: 58, color: 'green' },
    { status: 'Preferred', count: 312, percent: 24, color: 'violet' },
    { status: 'Pending', count: 86, percent: 7, color: 'amber' },
    { status: 'Blocked', count: 23, percent: 2, color: 'red' },
    { status: 'Inactive', count: 121, percent: 9, color: 'slate' }
  ];

  latestApproved: ApprovedVendor[] = [
    { id: 'VEN-2293', name: 'Northgate Hardware', company: 'Northgate Hardware Pvt Ltd', category: 'Industrial Tools', approvedOn: '22 Jul 2026', rating: 4.6 },
    { id: 'VEN-2292', name: 'Zenith Freight Services', company: 'Zenith Freight Services LLC', category: 'Logistics', approvedOn: '21 Jul 2026', rating: 4.8 },
    { id: 'VEN-2288', name: 'Solstice Packaging', company: 'Solstice Packaging Co.', category: 'Packaging', approvedOn: '19 Jul 2026', rating: 4.3 },
    { id: 'VEN-2281', name: 'Harbor Point Marine', company: 'Harbor Point Marine Supplies', category: 'Marine Equipment', approvedOn: '17 Jul 2026', rating: 4.5 }
  ];

  recentRequests: VendorRequest[] = [
    { id: 'REQ-884', name: 'Meridian Chemicals', company: 'Meridian Chemicals Inc.', requestType: 'Category Change', submitted: '25 Jul 2026', priority: 'High' },
    { id: 'REQ-883', name: 'Solace Textiles', company: 'Solace Textiles Mills', requestType: 'New Registration', submitted: '24 Jul 2026', priority: 'Medium' },
    { id: 'REQ-882', name: 'Alloy Precision Works', requestType: 'Bank Detail Update', submitted: '23 Jul 2026', company: 'Alloy Precision Works Ltd', priority: 'Low' },
    { id: 'REQ-881', name: 'BlueWave Logistics', company: 'BlueWave Logistics Group', requestType: 'Preferred Status Request', submitted: '22 Jul 2026', priority: 'High' }
  ];
}