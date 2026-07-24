import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract-renewal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-renewal.html',
  styleUrls: ['./contract-renewal.css']
})
export class ContractRenewal {

  renewals = [

    {
      id:'CT001',
      vendor:'Global Logistics',
      expiry:'31 Dec 2026',
      renewal:'31 Dec 2027',
      amount:'₹12,50,000',
      status:'Expiring Soon'
    },

    {
      id:'CT002',
      vendor:'ABC Suppliers',
      expiry:'20 Aug 2026',
      renewal:'20 Aug 2027',
      amount:'₹8,00,000',
      status:'Renewed'
    },

    {
      id:'CT003',
      vendor:'Prime Industries',
      expiry:'05 Jul 2026',
      renewal:'-',
      amount:'₹15,40,000',
      status:'Expired'
    }

  ];

  renew(contract:any){

    contract.status="Renewed";

    alert("Contract Renewed Successfully!");

  }

}