import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-list.html',
  styleUrls: ['./contract-list.css']
})
export class ContractList {

  contracts = [

    {
      id:'CT001',
      vendor:'Global Logistics',
      type:'Supply',
      start:'01-Jan-2026',
      end:'31-Dec-2026',
      amount:'₹12,50,000',
      status:'Active'
    },

    {
      id:'CT002',
      vendor:'ABC Suppliers',
      type:'Service',
      start:'10-Feb-2026',
      end:'10-Feb-2027',
      amount:'₹8,75,000',
      status:'Pending'
    },

    {
      id:'CT003',
      vendor:'Tech Solutions',
      type:'Maintenance',
      start:'15-Mar-2026',
      end:'15-Mar-2027',
      amount:'₹15,00,000',
      status:'Expired'
    },

    {
      id:'CT004',
      vendor:'Prime Industries',
      type:'Logistics',
      start:'01-Apr-2026',
      end:'31-Mar-2027',
      amount:'₹6,80,000',
      status:'Active'
    }

  ];

}