import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-details.html',
  styleUrls: ['./contract-details.css']
})
export class ContractDetails {

  contract = {
    contractId: 'CT001',
    contractName: 'Annual Supply Agreement',
    vendor: 'Global Logistics',
    contractType: 'Supply',
    startDate: '01 Jan 2026',
    endDate: '31 Dec 2026',
    amount: '₹12,50,000',
    paymentTerms: '30 Days',
    status: 'Active',
    manager: 'John David',
    description: 'Annual supply agreement for logistics services.'
  };

}