import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contract-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contract-dashboard.html',
  styleUrls: ['./contract-dashboard.css']
})
export class ContractDashboard {

  stats = [
    { icon: 'file', color: 'blue', value: '742', label: 'Total Contracts', trend: '3.6%', trendUp: true },
    { icon: 'check', color: 'green', value: '598', label: 'Active Contracts', trend: '2.1%', trendUp: true },
    { icon: 'clock', color: 'orange', value: '64', label: 'Expiring in 30 Days', trend: '1.4%', trendUp: false },
    { icon: 'shield', color: 'purple', value: '94.2%', label: 'Compliance Rate', trend: '0.8%', trendUp: true }
  ];

  recentActivity = [
    { title: 'Master Supply Agreement with Nexora Logistics marked Expiring', time: 'Today, 9:14 AM', color: 'var(--blue-500)' },
    { title: 'IT Services Agreement renewal approved for Brightware Technologies', time: 'Yesterday, 4:52 PM', color: 'var(--green-600)' },
    { title: 'New Draft contract created — Electronics Component Supply', time: '2 days ago', color: 'var(--purple-600)' },
    { title: 'Distribution Master Agreement with Grantex Traders expired', time: '3 days ago', color: 'var(--red-600)' },
    { title: 'Compliance review flagged Pivotal Chemicals NDA for update', time: '5 days ago', color: 'var(--blue-500)' }
  ];

  categoryBreakdown = [
    { label: 'Supply Contract', count: 312, percent: 42, color: 'var(--blue-500)' },
    { label: 'Service Agreement', count: 228, percent: 31, color: '#818cf8' },
    { label: 'Master Agreement', count: 119, percent: 16, color: '#34d399' },
    { label: 'NDA', count: 83, percent: 11, color: '#fbbf24' }
  ];
}