import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-dashboard.html',
  styleUrls: ['./contract-dashboard.css']
})
export class ContractDashboard {

  cards = [
    {
      title: 'Total Contracts',
      value: 156,
      icon: '📄'
    },
    {
      title: 'Active Contracts',
      value: 132,
      icon: '✅'
    },
    {
      title: 'Expiring Soon',
      value: 18,
      icon: '⏰'
    },
    {
      title: 'Expired',
      value: 6,
      icon: '❌'
    }
  ];

  contracts = [

    {
      id:'CT001',
      vendor:'Global Logistics',
      expiry:'31 Dec 2026',
      amount:'₹12,50,000',
      status:'Active'
    },

    {
      id:'CT002',
      vendor:'ABC Suppliers',
      expiry:'15 Sep 2026',
      amount:'₹8,20,000',
      status:'Expiring'
    },

    {
      id:'CT003',
      vendor:'Tech Solutions',
      expiry:'02 Jul 2026',
      amount:'₹15,00,000',
      status:'Expired'
    }

  ];

}