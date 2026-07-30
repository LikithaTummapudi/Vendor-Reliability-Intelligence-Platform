import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contract',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-contract.html',
  styleUrls: ['./add-contract.css']
})
export class AddContract {

  vendors = ['Nexora Logistics', 'SteelCore Industries', 'Brightware Technologies', 'Orbit Packaging'];
  contractTypes = ['Supply Contract', 'Service Agreement', 'Master Agreement', 'NDA'];
  departments = ['Procurement', 'IT', 'Operations', 'Legal'];
  paymentTerms = ['Net 30', 'Net 45', 'Net 60', 'Milestone-based'];
  autoRenewalOptions = ['Disabled', 'Enabled — 12 month term', 'Enabled — 24 month term'];
  noticePeriods = ['30 days before expiry', '60 days before expiry', '90 days before expiry'];

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      contractName: ['', Validators.required],
      vendor: ['', Validators.required],
      contractType: ['', Validators.required],
      department: ['Procurement'],
      contractValue: ['', Validators.required],
      paymentTerms: ['Net 30'],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      autoRenewal: ['Disabled'],
      noticePeriod: ['30 days before expiry'],
      scope: ['']
    });
  }

  saveDraft(): void {
    console.log('Saved as draft', this.form.value);
  }

  submitForApproval(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Submitted for approval', this.form.value);
    this.router.navigate(['/contract-management/contract-list']);
  }
}