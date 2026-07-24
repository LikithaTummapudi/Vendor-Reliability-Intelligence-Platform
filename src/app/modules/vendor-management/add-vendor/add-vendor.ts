import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-vendor.html',
  styleUrls: ['./add-vendor.css']
})
export class AddVendor {

  vendor = {
    vendorName: '',
    companyName: '',
    category: '',
    contactPerson: '',
    email: '',
    phone: '',
    gst: '',
    status: 'Active',
    address: '',
    description: ''
  };

  saveVendor() {
    console.log(this.vendor);
    alert('Vendor saved successfully!');
  }

}