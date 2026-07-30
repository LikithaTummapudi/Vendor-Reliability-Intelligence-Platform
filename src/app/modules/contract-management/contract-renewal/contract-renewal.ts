import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RenewalItem {
  name: string;
  vendor: string;
  value: string;
  note: string;
  daysLeft: number;
  progressPercent: number;
  progressColor: string;
  status: 'expiring' | 'renewal' | 'active';
  statusLabel: string;
  actionable: boolean;
}

@Component({
  selector: 'app-contract-renewal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-renewal.html',
  styleUrls: ['./contract-renewal.css']
})
export class ContractRenewal {

  renewals: RenewalItem[] = [
    { name: 'Master Supply Agreement', vendor: 'Nexora Logistics', value: '$482,000', note: 'Awaiting vendor confirmation', daysLeft: 6, progressPercent: 12, progressColor: 'var(--red-600)', status: 'expiring', statusLabel: 'Expiring', actionable: true },
    { name: 'IT Services Agreement', vendor: 'Brightware Technologies', value: '$156,400', note: 'Legal reviewing revised SLA', daysLeft: 12, progressPercent: 25, progressColor: 'var(--orange-600)', status: 'renewal', statusLabel: 'In Renewal', actionable: true },
    { name: 'Raw Material Supply', vendor: 'SteelCore Industries', value: '$921,750', note: 'Price escalation clause under negotiation', daysLeft: 19, progressPercent: 40, progressColor: 'var(--orange-600)', status: 'expiring', statusLabel: 'Expiring', actionable: true },
    { name: 'Construction Services Renewal', vendor: 'Meraki Constructions', value: '$612,000', note: 'Awaiting vendor signature', daysLeft: 34, progressPercent: 65, progressColor: 'var(--blue-500)', status: 'renewal', statusLabel: 'In Renewal', actionable: true },
    { name: 'Packaging Supply Deal', vendor: 'Orbit Packaging', value: '$218,900', note: 'Auto-renewal scheduled, no action needed', daysLeft: 58, progressPercent: 82, progressColor: 'var(--blue-500)', status: 'active', statusLabel: 'Active', actionable: false }
  ];

  renew(item: RenewalItem): void {
    console.log('Renew', item.name);
  }

  negotiate(item: RenewalItem): void {
    console.log('Negotiate', item.name);
  }

  terminate(item: RenewalItem): void {
    console.log('Terminate', item.name);
  }
}