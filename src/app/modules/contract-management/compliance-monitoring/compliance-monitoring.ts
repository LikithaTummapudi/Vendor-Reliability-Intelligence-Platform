import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ComplianceRow {
  id: string;
  vendor: string;
  score: number;
  scoreTier: 'high' | 'mid' | 'low';
  insurance: { label: string; status: string };
  certifications: { label: string; status: string };
  lastAudit: string;
  status: 'compliant' | 'review' | 'noncompliant';
  statusLabel: string;
}

@Component({
  selector: 'app-compliance-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compliance-monitoring.html',
  styleUrls: ['./compliance-monitoring.css']
})
export class ComplianceMonitoring {

  stats = [
    { icon: 'shield', color: 'green', value: '94.2%', label: 'Overall Compliance Rate' },
    { icon: 'check', color: 'green', value: '679', label: 'Fully Compliant' },
    { icon: 'alert', color: 'orange', value: '48', label: 'Needs Review' },
    { icon: 'x', color: 'red', value: '15', label: 'Non-Compliant' }
  ];

  rows: ComplianceRow[] = [
    { id: 'CTR-50231', vendor: 'Nexora Logistics', score: 98, scoreTier: 'high', insurance: { label: 'Valid', status: 'active' }, certifications: { label: 'Up to date', status: 'active' }, lastAudit: '02 Jun 2026', status: 'compliant', statusLabel: 'Compliant' },
    { id: 'CTR-50232', vendor: 'Brightware Technologies', score: 91, scoreTier: 'high', insurance: { label: 'Valid', status: 'active' }, certifications: { label: 'Renewing', status: 'expiring' }, lastAudit: '18 May 2026', status: 'compliant', statusLabel: 'Compliant' },
    { id: 'CTR-50235', vendor: 'Pivotal Chemicals', score: 67, scoreTier: 'mid', insurance: { label: 'Expiring soon', status: 'expiring' }, certifications: { label: 'Pending update', status: 'draft' }, lastAudit: '29 Mar 2026', status: 'review', statusLabel: 'Needs Review' },
    { id: 'CTR-50236', vendor: 'Grantex Traders', score: 28, scoreTier: 'low', insurance: { label: 'Expired', status: 'expired' }, certifications: { label: 'Missing', status: 'expired' }, lastAudit: '11 Nov 2025', status: 'noncompliant', statusLabel: 'Non-Compliant' },
    { id: 'CTR-50237', vendor: 'Altura Electronics', score: 72, scoreTier: 'mid', insurance: { label: 'Valid', status: 'active' }, certifications: { label: 'Under review', status: 'review' }, lastAudit: '04 Feb 2026', status: 'review', statusLabel: 'Needs Review' },
    { id: 'CTR-50238', vendor: 'Meraki Constructions', score: 41, scoreTier: 'low', insurance: { label: 'Expired', status: 'expired' }, certifications: { label: 'Missing', status: 'expired' }, lastAudit: '19 Sep 2025', status: 'noncompliant', statusLabel: 'Non-Compliant' }
  ];
}