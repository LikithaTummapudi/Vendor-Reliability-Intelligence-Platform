import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contract',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contract.html',
  styleUrls: ['./add-contract.css']
})
export class AddContract {

  contract = {
    contractName: '',
    vendor: '',
    contractType: '',
    startDate: '',
    endDate: '',
    contractValue: '',
    paymentTerms: '',
    status: '',
    description: ''
  };

  saveContract() {
    alert('Contract Added Successfully!');
    console.log(this.contract);
  }

  resetForm() {
    this.contract = {
      contractName: '',
      vendor: '',
      contractType: '',
      startDate: '',
      endDate: '',
      contractValue: '',
      paymentTerms: '',
      status: '',
      description: ''
    };
  }

}