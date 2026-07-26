import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface VendorForm {
  // Basic Information
  vendorName: string;
  displayName: string;
  vendorType: string;
  category: string;

  // Company Information
  companyName: string;
  registrationNumber: string;
  yearEstablished: string;
  companySize: string;
  website: string;

  // Business Information
  businessDescription: string;
  industry: string;
  annualTurnover: string;

  // Contact Information
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  alternatePhone: string;

  // Address
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  // Bank Details
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifscSwift: string;
  branchName: string;

  // Tax Details
  gstNumber: string;
  panNumber: string;
  taxResidencyCountry: string;

  // Notes
  notes: string;
}

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-vendor.html',
  styleUrl: './add-vendor.css'
})
export class AddVendor {
  categories = ['Raw Materials', 'Logistics', 'IT & Electronics', 'Manufacturing', 'Professional Services', 'Packaging'];
  vendorTypes = ['Manufacturer', 'Distributor', 'Service Provider', 'Contractor', 'Consultant'];
  companySizes = ['1-10 employees', '11-50 employees', '51-200 employees', '201-1000 employees', '1000+ employees'];
  countries = ['India', 'United States', 'United Arab Emirates', 'Singapore', 'United Kingdom', 'Germany', 'Japan'];

  uploadedDocuments: string[] = [];

  form: VendorForm = {
    vendorName: '',
    displayName: '',
    vendorType: '',
    category: '',
    companyName: '',
    registrationNumber: '',
    yearEstablished: '',
    companySize: '',
    website: '',
    businessDescription: '',
    industry: '',
    annualTurnover: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    alternatePhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifscSwift: '',
    branchName: '',
    gstNumber: '',
    panNumber: '',
    taxResidencyCountry: '',
    notes: ''
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
    console.log('Saving vendor as draft', this.form);
  }

  submitVendor(): void {
    console.log('Submitting vendor for approval', this.form);
  }
}