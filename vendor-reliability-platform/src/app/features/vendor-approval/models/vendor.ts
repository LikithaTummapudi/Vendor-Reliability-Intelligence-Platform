export type VendorStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Changes Requested';

export interface VendorDocument {
  id: string;
  name: string;
  type: string;
  uploadedOn: Date;
  verified: boolean;
  url: string;
}

export interface VendorTimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  performedBy: string;
}

export interface Vendor {
  id: string;

  companyName: string;
  registrationNumber: string;
  category: string;

  contactPerson: string;
  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;
  country: string;

  establishedYear: number;

  status: VendorStatus;

  reliabilityScore: number;
  riskScore: number;

  createdAt: Date;
  updatedAt: Date;

  documents: VendorDocument[];

  timeline: VendorTimelineEvent[];
}