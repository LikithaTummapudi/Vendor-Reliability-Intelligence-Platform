import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-details.html',
  styleUrls: ['./contract-details.css']
})
export class ContractDetails implements OnInit {

  contractId = 'CTR-50231';

  contract = {
    name: 'Master Supply Agreement',
    vendor: 'Nexora Logistics Pvt Ltd',
    dateRange: '15 Jan 2023 – 31 Jul 2026',
    value: '$482,000',
    daysLeft: 6,
    type: 'Supply Contract',
    department: 'Procurement',
    paymentTerms: 'Net 45',
    autoRenewal: 'Enabled — 12 month term',
    renewalNotice: '60 days before expiry',
    owner: 'Riya Anand'
  };

  clauses = [
    { title: 'Service Level Agreement (SLA)', desc: 'On-time delivery must remain above 95% monthly, with penalty credits applied for shortfalls.' },
    { title: 'Termination for Convenience', desc: "Either party may terminate with 90 days' written notice without cause." },
    { title: 'Liability Cap', desc: 'Aggregate liability capped at 12 months of fees paid under this agreement.' },
    { title: 'Data Protection', desc: 'Vendor must maintain SOC 2 Type II certification for the contract duration.' }
  ];

  activity = [
    { title: 'Marked as Expiring — renewal window opened', time: '2 days ago', color: 'var(--blue-500)' },
    { title: 'Compliance review passed', time: '3 weeks ago', color: 'var(--green-600)' },
    { title: 'Contract fully executed and signed', time: '15 Jan 2023', color: 'var(--blue-500)' }
  ];

  documents = [
    { name: 'Signed_Agreement_Final.pdf', size: '2.4 MB' },
    { name: 'SLA_Appendix_A.pdf', size: '640 KB' },
    { name: 'SOC2_Certificate_2026.pdf', size: '1.1 MB' }
  ];

  approvalChain = [
    { role: 'Procurement Lead — Approved', by: 'Riya Anand · 12 Jan 2023' },
    { role: 'Legal Counsel — Approved', by: 'David Chen · 13 Jan 2023' },
    { role: 'Finance Director — Approved', by: 'Meera Iyer · 14 Jan 2023' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.contractId = idParam;
      // In a real app: fetch contract details from a service using this.contractId
    }
  }
}