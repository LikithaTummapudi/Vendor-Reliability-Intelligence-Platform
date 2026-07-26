import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface VendorForm {
  vendorName: string;
  displayName: string;
  vendorType: string;
  category: string;

  companyName: string;
  registrationNumber: string;
  yearEstablished: string;
  companySize: string;
  website: string;

  businessDescription: string;
  industry: string;
  annualTurnover: string;

  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  alternatePhone: string;

  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifscSwift: string;
  branchName: string;

  gstNumber: string;
  panNumber: string;
  taxResidencyCountry: string;

  notes: string;
}

@Component({
  selector: 'app-edit-vendor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-vendor.html',
  styleUrl: './edit-vendor.css'
})
export class EditVendor {
  vendorId = 'VEN-2295';

  categories = ['Raw Materials', 'Logistics', 'IT & Electronics', 'Manufacturing', 'Professional Services', 'Packaging'];
  vendorTypes = ['Manufacturer', 'Distributor', 'Service Provider', 'Contractor', 'Consultant'];
  companySizes = ['1-10 employees', '11-50 employees', '51-200 employees', '201-1000 employees', '1000+ employees'];
  countries = ['India', 'United States', 'United Arab Emirates', 'Singapore', 'United Kingdom', 'Germany', 'Japan'];

  uploadedDocuments: string[] = ['Trade License.pdf', 'Tax Compliance Certificate.pdf', 'Bank Verification Letter.pdf'];

  // Pre-populated with sample vendor data, as if loaded from the vendor record
  form: VendorForm = {
    vendorName: 'Zenith Freight Services',
    displayName: 'Zenith Freight',
    vendorType: 'Service Provider',
    category: 'Logistics',

    companyName: 'Zenith Freight Services LLC',
    registrationNumber: 'DXB-TRD-88213',
    yearEstablished: '2009',
    companySize: '201-1000 employees',
    website: 'https://www.zenithfreight.com',

    businessDescription: 'Freight forwarding, customs clearance and last-mile delivery across the GCC region.',
    industry: 'Freight & Logistics',
    annualTurnover: '$18.2M',

    contactPerson: 'Fatima Al-Sayed',
    designation: 'Regional Partnerships Manager',
    email: 'fatima@zenithfreight.com',
    phone: '+971 50 123 4567',
    alternatePhone: '+971 4 220 8890',

    addressLine1: 'Warehouse 12, Jebel Ali Free Zone',
    addressLine2: 'Gate 4, Logistics District',
    city: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    postalCode: '00000',

    bankName: 'Emirates NBD',
    accountHolder: 'Zenith Freight Services LLC',
    accountNumber: '1023456789012',
    ifscSwift: 'EBILAEAD',
    branchName: 'Jebel Ali Branch',

    gstNumber: '100234567800003',
    panNumber: 'N/A',
    taxResidencyCountry: 'United Arab Emirates',

    notes: 'Preferred logistics partner for GCC shipments. Renewal due Q1 2027.'
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => this.uploadedDocuments.push(file.name));
    }
  }

  removeDocument(name: string): void {
    this.uploadedDocuments = this.uploadedDocuments.filter(d => d !== name);
  }

  saveDraft(): void {
    console.log('Saving changes as draft', this.form);
  }

  submitVendor(): void {
    console.log('Updating vendor record', this.form);
  }
}