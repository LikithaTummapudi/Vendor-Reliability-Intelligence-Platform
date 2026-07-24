import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-list.html',
  styleUrls: ['./vendor-list.css']
})
export class VendorList {

  vendors = [

    {
      id: 'V001',
      name: 'Global Logistics',
      category: 'Transport',
      email: 'global@gmail.com',
      phone: '9876543210',
      score: 94,
      status: 'Active'
    },

    {
      id: 'V002',
      name: 'Apex Manufacturing',
      category: 'Manufacturing',
      email: 'apex@gmail.com',
      phone: '9123456780',
      score: 89,
      status: 'Approved'
    },

    {
      id: 'V003',
      name: 'Quantum Systems',
      category: 'Software',
      email: 'quantum@gmail.com',
      phone: '9988776655',
      score: 75,
      status: 'Pending'
    },

    {
      id: 'V004',
      name: 'Horizon Supplies',
      category: 'Retail',
      email: 'horizon@gmail.com',
      phone: '9011223344',
      score: 60,
      status: 'Blocked'
    },

    {
      id: 'V005',
      name: 'TechNova Pvt Ltd',
      category: 'IT Services',
      email: 'technova@gmail.com',
      phone: '9786543210',
      score: 92,
      status: 'Active'
    }

  ];

  viewVendor(vendor: any) {
    alert('View Vendor : ' + vendor.name);
  }

  editVendor(vendor: any) {
    alert('Edit Vendor : ' + vendor.name);
  }

  deleteVendor(vendor: any) {
    if(confirm('Delete ' + vendor.name + ' ?')){
      this.vendors = this.vendors.filter(v => v.id !== vendor.id);
    }
  }

}