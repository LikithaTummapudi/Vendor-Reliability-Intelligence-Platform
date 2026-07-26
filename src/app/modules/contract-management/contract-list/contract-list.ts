import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Contract {
  id: string;
  name: string;
  subtitle: string;
  vendor: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'expired' | 'draft' | 'renewal';
  statusLabel: string;
}

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contract-list.html',
  styleUrls: ['./contract-list.css']
})
export class ContractList {

  categories = ['All Categories', 'Service Agreement', 'Supply Contract', 'NDA', 'Master Agreement'];
  searchTerm = '';
  selectedCategory = 'All Categories';

  contracts: Contract[] = [
    { id: 'CTR-50231', name: 'Master Supply Agreement', subtitle: 'Auto-renewal enabled', vendor: 'Nexora Logistics', type: 'Supply Contract', value: 482000, startDate: '15 Jan 2023', endDate: '31 Jul 2026', status: 'expiring', statusLabel: 'Expiring' },
    { id: 'CTR-50232', name: 'IT Services Agreement', subtitle: 'Renewal in progress', vendor: 'Brightware Technologies', type: 'Service Agreement', value: 156400, startDate: '02 Aug 2024', endDate: '06 Aug 2026', status: 'expiring', statusLabel: 'Expiring' },
    { id: 'CTR-50233', name: 'Raw Material Supply', subtitle: '3-year term', vendor: 'SteelCore Industries', type: 'Supply Contract', value: 921750, startDate: '10 Aug 2023', endDate: '13 Aug 2026', status: 'expiring', statusLabel: 'Expiring' },
    { id: 'CTR-50234', name: 'Packaging Supply Deal', subtitle: 'Standard terms', vendor: 'Orbit Packaging', type: 'Supply Contract', value: 218900, startDate: '05 Mar 2025', endDate: '05 Mar 2027', status: 'active', statusLabel: 'Active' },
    { id: 'CTR-50235', name: 'Mutual NDA', subtitle: 'Confidentiality', vendor: 'Pivotal Chemicals', type: 'NDA', value: 0, startDate: '18 Apr 2025', endDate: '18 Apr 2028', status: 'active', statusLabel: 'Active' },
    { id: 'CTR-50236', name: 'Distribution Master Agreement', subtitle: 'Terminated for cause', vendor: 'Grantex Traders', type: 'Master Agreement', value: 340200, startDate: '22 Jun 2022', endDate: '22 Jun 2025', status: 'expired', statusLabel: 'Expired' },
    { id: 'CTR-50237', name: 'Electronics Component Supply', subtitle: 'Pending legal review', vendor: 'Altura Electronics', type: 'Supply Contract', value: 274600, startDate: '—', endDate: '—', status: 'draft', statusLabel: 'Draft' },
    { id: 'CTR-50238', name: 'Construction Services Renewal', subtitle: 'Awaiting vendor signature', vendor: 'Meraki Constructions', type: 'Service Agreement', value: 612000, startDate: '—', endDate: '—', status: 'renewal', statusLabel: 'In Renewal' }
  ];

  get filteredContracts(): Contract[] {
    return this.contracts.filter(c => {
      const matchesCategory = this.selectedCategory === 'All Categories' || c.type === this.selectedCategory;
      const term = this.searchTerm.toLowerCase();
      const matchesSearch = !term ||
        c.id.toLowerCase().includes(term) ||
        c.name.toLowerCase().includes(term) ||
        c.vendor.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }
}