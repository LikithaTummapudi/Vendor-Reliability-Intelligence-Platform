import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Vendor {
  vendorId: string;
  name: string;
  company: string;
  category: string;
  email: string;
  phone: string;
  city: string;
  registrationDate: string;
  rating: number;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Blocked' | 'Inactive' | 'Preferred';
}

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css'
})
export class VendorList {
  searchTerm = '';
  categoryFilter = 'All';
  statusFilter = 'All';

  categories = ['All', 'Raw Materials', 'Logistics', 'IT & Electronics', 'Manufacturing', 'Professional Services', 'Packaging'];
  statuses = ['All', 'Approved', 'Pending', 'Rejected', 'Blocked', 'Inactive', 'Preferred'];

  vendors: Vendor[] = [
    { vendorId: 'VEN-2298', name: 'Ashwin Rao', company: 'Crestline Electricals', category: 'IT & Electronics', email: 'ashwin.rao@crestline.com', phone: '+91 98765 43210', city: 'Chennai', registrationDate: '24 Jul 2026', rating: 4.1, status: 'Pending' },
    { vendorId: 'VEN-2297', name: 'Priya Menon', company: 'Solace Textiles', category: 'Raw Materials', email: 'priya.menon@solacetex.com', phone: '+91 98220 11223', city: 'Coimbatore', registrationDate: '23 Jul 2026', rating: 3.9, status: 'Pending' },
    { vendorId: 'VEN-2296', name: 'David Wilson', company: 'Northgate Hardware', category: 'Manufacturing', email: 'd.wilson@northgate.co', phone: '+1 415 552 0192', city: 'San Jose', registrationDate: '22 Jul 2026', rating: 4.6, status: 'Approved' },
    { vendorId: 'VEN-2295', name: 'Fatima Al-Sayed', company: 'Zenith Freight Services', category: 'Logistics', email: 'fatima@zenithfreight.com', phone: '+971 50 123 4567', city: 'Dubai', registrationDate: '21 Jul 2026', rating: 4.8, status: 'Approved' },
    { vendorId: 'VEN-2294', name: 'Marcus Chen', company: 'Alloy Precision Works', category: 'Manufacturing', email: 'marcus.chen@alloyprec.com', phone: '+65 8123 4567', city: 'Singapore', registrationDate: '20 Jul 2026', rating: 2.8, status: 'Rejected' },
    { vendorId: 'VEN-2291', name: 'Neha Kapoor', company: 'BlueWave Logistics', category: 'Logistics', email: 'neha.kapoor@bluewave.com', phone: '+91 99001 22334', city: 'Mumbai', registrationDate: '18 Jul 2026', rating: 4.9, status: 'Preferred' },
    { vendorId: 'VEN-2288', name: 'Liu Wei', company: 'Solstice Packaging', category: 'Packaging', email: 'liu.wei@solsticepkg.com', phone: '+86 138 0013 8000', city: 'Shenzhen', registrationDate: '19 Jul 2026', rating: 4.3, status: 'Approved' },
    { vendorId: 'VEN-2281', name: 'Robert Alvarez', company: 'Harbor Point Marine', category: 'Manufacturing', email: 'robert@harborpoint.com', phone: '+1 305 771 2244', city: 'Miami', registrationDate: '17 Jul 2026', rating: 4.5, status: 'Approved' },
    { vendorId: 'VEN-2270', name: 'Sara Kimura', company: 'Meridian Chemicals', category: 'Raw Materials', email: 'sara.kimura@meridianchem.com', phone: '+81 90 1234 5678', city: 'Osaka', registrationDate: '12 Jul 2026', rating: 2.1, status: 'Blocked' },
    { vendorId: 'VEN-2255', name: 'James O\'Connor', company: 'Fortis Packaging Co.', category: 'Packaging', email: 'james.oconnor@fortispkg.com', phone: '+353 87 654 3210', city: 'Dublin', registrationDate: '05 Jul 2026', rating: 3.4, status: 'Inactive' },
    { vendorId: 'VEN-2249', name: 'Ingrid Larsen', company: 'Nordic Steel Traders', category: 'Raw Materials', email: 'ingrid@nordicsteel.com', phone: '+47 412 34 567', city: 'Oslo', registrationDate: '01 Jul 2026', rating: 4.7, status: 'Preferred' },
    { vendorId: 'VEN-2240', name: 'Carlos Mendes', company: 'Orion Components Ltd', category: 'IT & Electronics', email: 'carlos.mendes@orioncomp.com', phone: '+55 11 98888 7777', city: 'Sao Paulo', registrationDate: '28 Jun 2026', rating: 3.6, status: 'Approved' }
  ];

  get filteredVendors(): Vendor[] {
    return this.vendors.filter(v => {
      const matchesSearch =
        !this.searchTerm ||
        v.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        v.company.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        v.vendorId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.categoryFilter === 'All' || v.category === this.categoryFilter;
      const matchesStatus = this.statusFilter === 'All' || v.status === this.statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  refresh(): void {
    this.searchTerm = '';
    this.categoryFilter = 'All';
    this.statusFilter = 'All';
  }

  exportVendors(): void {
    console.log('Exporting vendor list...', this.filteredVendors);
  }

  deleteVendor(vendorId: string): void {
    this.vendors = this.vendors.filter(v => v.vendorId !== vendorId);
  }
}