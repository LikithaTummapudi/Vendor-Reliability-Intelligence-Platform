import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compliance-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compliance-monitoring.html',
  styleUrls: ['./compliance-monitoring.css']
})
export class ComplianceMonitoring {

  compliances = [

    {
      vendor:'Global Logistics',
      certificate:'ISO 9001',
      expiry:'30 Dec 2026',
      score:98,
      status:'Compliant'
    },

    {
      vendor:'ABC Suppliers',
      certificate:'ISO 14001',
      expiry:'15 Aug 2026',
      score:85,
      status:'Expiring'
    },

    {
      vendor:'Tech Solutions',
      certificate:'Security Audit',
      expiry:'12 Jun 2026',
      score:65,
      status:'Expired'
    },

    {
      vendor:'Prime Industries',
      certificate:'Quality Certificate',
      expiry:'25 Jan 2027',
      score:96,
      status:'Compliant'
    }

  ];

}