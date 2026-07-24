import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-vendor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-vendor.html',
  styleUrls: ['./edit-vendor.css']
})
export class EditVendor {

  vendor = {
    vendorName: 'ABC Suppliers',
    companyName: 'ABC Pvt Ltd',
    category: 'Raw Material Supplier',
    contactPerson: 'Rahul Kumar',
    email: 'abc@gmail.com',
    phone: '9876543210',
    gst: '33ABCDE1234F1Z5',
    status: 'Active',
    address: 'Chennai, Tamil Nadu',
    description: 'Leading supplier of industrial raw materials.'
  };

  updateVendor() {
    alert('Vendor Updated Successfully!');
    console.log(this.vendor);
  }

}