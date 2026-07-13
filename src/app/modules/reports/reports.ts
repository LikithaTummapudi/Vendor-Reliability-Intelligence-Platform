import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})

export class Reports {
  reportCards = [
  {
    title: 'Vendor Performance Report',
    description: 'View vendor reliability and performance metrics.'
  },
  {
    title: 'Procurement Report',
    description: 'Analyze procurement spending and activities.'
  },
  {
    title: 'Purchase Order Report',
    description: 'Track purchase order details and status.'
  },
  {
    title: 'Compliance Report',
    description: 'Review compliance and regulatory status.'
  },
  {
    title: 'Contract Report',
    description: 'Monitor vendor contract lifecycle.'
  }
];

recentReports = [
  {
    name: 'Vendor Q2 Report',
    type: 'Vendor',
    generated: '10-Jul-2026',
    generatedBy: 'Admin',
    format: 'PDF'
  },
  {
    name: 'Procurement June Report',
    type: 'Procurement',
    generated: '08-Jul-2026',
    generatedBy: 'Manager',
    format: 'Excel'
  },
  {
    name: 'Compliance Audit',
    type: 'Compliance',
    generated: '05-Jul-2026',
    generatedBy: 'Admin',
    format: 'PDF'
  }
];
}
