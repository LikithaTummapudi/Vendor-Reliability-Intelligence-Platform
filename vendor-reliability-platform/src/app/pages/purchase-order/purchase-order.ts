import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-order.html',
  styleUrl: './purchase-order.css'
})
export class PurchaseOrder {

  poForm: FormGroup;

  // Professional Vendor List
  vendors = [
  'Dell Technologies',
  'HP Enterprise',
  'Lenovo India',
  'Cisco Systems',
  'Microsoft India',
  'Samsung Business',
  'Acer Commercial',
  'Logitech India'
];

vendorProducts: any = {

  'Dell Technologies': [
    { name: 'Laptop', price: 58000 },
    { name: 'Desktop', price: 42000 },
    { name: 'Monitor', price: 18500 },
    { name: 'Docking Station', price: 7000 }
  ],

  'HP Enterprise': [
    { name: 'Laptop', price: 56000 },
    { name: 'Printer', price: 15000 },
    { name: 'Scanner', price: 12000 },
    { name: 'Monitor', price: 18000 }
  ],

  'Lenovo India': [
    { name: 'Laptop', price: 54000 },
    { name: 'Desktop', price: 40000 },
    { name: 'Monitor', price: 17000 }
  ],

  'Cisco Systems': [
    { name: 'Router', price: 3500 },
    { name: 'Network Switch', price: 8000 },
    { name: 'Firewall', price: 25000 },
    { name: 'Access Point', price: 12000 }
  ],

  'Microsoft India': [
    { name: 'Surface Laptop', price: 95000 },
    { name: 'Surface Pro', price: 110000 },
    { name: 'Office 365 License', price: 12000 }
  ],

  'Samsung Business': [
    { name: 'Monitor', price: 18000 },
    { name: 'SSD', price: 4500 },
    { name: 'Tablet', price: 32000 }
  ],

  'Acer Commercial': [
    { name: 'Laptop', price: 50000 },
    { name: 'Desktop', price: 38000 },
    { name: 'Monitor', price: 16000 }
  ],

  'Logitech India': [
    { name: 'Keyboard', price: 1200 },
    { name: 'Mouse', price: 650 },
    { name: 'Webcam', price: 3500 },
    { name: 'Headset', price: 2800 }
  ]

};

products: any[] = [];

  showPreview = false;

  constructor(private fb: FormBuilder) {

    this.poForm = this.fb.group({
      

      poNumber: [this.generatePONumber()],

      vendor: ['', Validators.required],

      deliveryDate: ['', Validators.required],

      paymentTerms: ['Net 30'],

      shippingAddress: ['', Validators.required],
      
      status: ['Draft'],

      items: this.fb.array([
        this.createItem()
      ])

    });

  }

  createItem(): FormGroup {

    return this.fb.group({

      itemName: ['', Validators.required],

      quantity: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      unitPrice: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ]

    });

  }generatePONumber(): string {

  const random = Math.floor(1000 + Math.random() * 9000);

  return `PO-2026-${random}`;

}

  get items(): FormArray {
    return this.poForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {

    if (this.items.length > 1) {
      this.items.removeAt(index);
    }

  }
  onVendorChange() {

  const vendor = this.poForm.get('vendor')?.value;

  this.products = this.vendorProducts[vendor] || [];

  this.items.controls.forEach(item => {

    item.patchValue({

      itemName: '',
      unitPrice: 1

    });

  });

}

  // Auto-fill price when product changes
  onProductChange(index: number) {

  const item = this.items.at(index);

  const selected = this.products.find(

    p => p.name === item.get('itemName')?.value

  );

  if (selected) {

    item.patchValue({

      unitPrice: selected.price

    });

  }

}

    

  // Total for each row
  getItemTotal(index: number): number {

    const item = this.items.at(index);

    const qty = Number(item.get('quantity')?.value || 0);

    const price = Number(item.get('unitPrice')?.value || 0);

    return qty * price;

  }

  // Subtotal
  getSubTotal(): number {

    return this.items.controls.reduce((total, _, index) =>

      total + this.getItemTotal(index)

    , 0);

  }

  // GST (18%)
  getGST(): number {

    return this.getSubTotal() * 0.18;

  }

  // Shipping
  getShipping(): number {

    return this.getSubTotal() > 0 ? 500 : 0;

  }

  // Grand Total
  getGrandTotal(): number {

    return this.getSubTotal() + this.getGST() + this.getShipping();

  }
previewPO(): void {

  if (this.poForm.invalid) {

    this.poForm.markAllAsTouched();

    alert('Please fill all required fields before preview.');

    return;

  }

  this.showPreview = true;

}
closePreview(): void {

  this.showPreview = false;

}

  today = new Date().toISOString().split('T')[0];

  // Currency Format
  formatCurrency(value: number): string {

    return new Intl.NumberFormat('en-IN', {

      style: 'currency',
      currency: 'INR',

      maximumFractionDigits: 0

    }).format(value);

  }

  onSubmit(): void {

  if (this.poForm.invalid) {

    this.poForm.markAllAsTouched();

    alert('Please fill all required fields correctly');

    return;

  }

  // Change status to Pending Approval
  this.poForm.patchValue({
    status: 'Pending Approval'
  });

  console.log(this.poForm.value);

  alert('Purchase Order Generated Successfully!');

  // Close preview if open
  this.showPreview = false;

}
}