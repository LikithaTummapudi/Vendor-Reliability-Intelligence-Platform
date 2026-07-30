import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-procurement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procurement.html',
  styleUrl: './procurement.css'
})
export class Procurement {

  requests = [
    { id: 'REQ-001', department: 'IT', item: 'Laptops', status: 'Pending' },
    { id: 'REQ-002', department: 'Admin', item: 'Printers', status: 'Approved' },
    { id: 'REQ-003', department: 'HR', item: 'Chairs', status: 'Rejected' }
  ];

  inventory = [
    { item: 'Laptop', available: 25, reorder: 10, status: 'In Stock' },
    { item: 'Mouse', available: 8, reorder: 15, status: 'Low Stock' },
    { item: 'Monitor', available: 5, reorder: 8, status: 'Low Stock' }
  ];
}