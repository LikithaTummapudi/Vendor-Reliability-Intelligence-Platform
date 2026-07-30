import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PurchaseRecord {
  poNumber: string;
  item: string;
  amount: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Delayed';
}

interface PerformanceMetric {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-vendor-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.css'
})
export class VendorDetails {
  vendor = {
    id: 'VEN-2295',
    company: 'Zenith Freight Services LLC',
    category: 'Logistics',
    status: 'Approved',
    rating: 4.8,
    initials: 'ZF',
    memberSince: '2016'
  };

  companyInfo = [
    { label: 'Registration Number', value: 'DXB-TRD-88213' },
    { label: 'Year Established', value: '2009' },
    { label: 'Company Size', value: '201-1000 employees' },
    { label: 'Website', value: 'www.zenithfreight.com' },
    { label: 'Industry', value: 'Freight & Logistics' },
    { label: 'Annual Turnover', value: '$18.2M' }
  ];

  contactInfo = [
    { label: 'Contact Person', value: 'Fatima Al-Sayed' },
    { label: 'Designation', value: 'Regional Partnerships Manager' },
    { label: 'Email', value: 'fatima@zenithfreight.com' },
    { label: 'Phone', value: '+971 50 123 4567' },
    { label: 'Address', value: 'Warehouse 12, Jebel Ali Free Zone, Dubai, UAE' }
  ];

  businessDetails = [
    { label: 'Vendor Type', value: 'Service Provider' },
    { label: 'Business Description', value: 'Freight forwarding, customs clearance and last-mile delivery across the GCC region.' },
    { label: 'Preferred Vendor Since', value: '18 Jul 2026' },
    { label: 'Assigned Category Manager', value: 'Omar Haddad' }
  ];

  documents = [
    { name: 'Trade License.pdf', size: '1.2 MB', updated: '20 Jul 2026' },
    { name: 'Tax Compliance Certificate.pdf', size: '640 KB', updated: '18 Jul 2026' },
    { name: 'Bank Verification Letter.pdf', size: '410 KB', updated: '15 Jun 2026' },
    { name: 'Insurance Certificate.pdf', size: '890 KB', updated: '02 Jun 2026' }
  ];

  bankDetails = [
    { label: 'Bank Name', value: 'Emirates NBD' },
    { label: 'Account Holder', value: 'Zenith Freight Services LLC' },
    { label: 'Account Number', value: '•••• •••• 9012' },
    { label: 'SWIFT Code', value: 'EBILAEAD' },
    { label: 'Branch', value: 'Jebel Ali Branch' }
  ];

  purchaseHistory: PurchaseRecord[] = [
    { poNumber: 'PO-88421', item: 'Q3 Freight Consolidation', amount: '$142,500', date: '10 Jul 2026', status: 'Delivered' },
    { poNumber: 'PO-88190', item: 'Customs Clearance Batch', amount: '$38,200', date: '02 Jul 2026', status: 'Delivered' },
    { poNumber: 'PO-87932', item: 'Cross-Border Shipment', amount: '$95,000', date: '22 Jun 2026', status: 'In Transit' },
    { poNumber: 'PO-87710', item: 'Warehouse Handling Services', amount: '$21,400', date: '10 Jun 2026', status: 'Delayed' }
  ];

  performanceSummary: PerformanceMetric[] = [
    { label: 'On-Time Delivery', value: 96, color: 'green' },
    { label: 'Quality Compliance', value: 92, color: 'blue' },
    { label: 'Responsiveness', value: 89, color: 'teal' },
    { label: 'Cost Competitiveness', value: 78, color: 'amber' }
  ];
}