import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-details.html',
  styleUrls: ['./vendor-details.css']
})
export class VendorDetails {

  vendor = {
    name: 'Global Logistics Inc.',
    code: 'VEN-2024-018',
    category: 'Logistics',
    status: 'Active',
    reliability: 96,
    contact: 'David Johnson',
    email: 'david@globallogistics.com',
    phone: '+1 987654321',
    location: 'New York, USA',
    joined: '12 Jan 2022',

    performance: 98,
    delivery: 97,
    quality: 95,
    compliance: 100,

    contracts: 12,
    completedOrders: 245,
    pendingOrders: 8,
    totalSpend: '$1.2M'
  };

}