import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})

export class Notifications {
  notifications = [
  {
    title: 'Procurement Alert',
    message: 'Purchase Order PO-1025 requires approval.',
    type: 'Procurement',
    time: '5 minutes ago'
  },
  {
    title: 'Delivery Delay',
    message: 'Shipment from ABC Suppliers delayed by 2 days.',
    type: 'Delivery',
    time: '20 minutes ago'
  },
  {
    title: 'Vendor Approval',
    message: 'New vendor registration awaiting approval.',
    type: 'Vendor',
    time: '1 hour ago'
  },
  {
    title: 'Contract Expiry',
    message: 'Vendor contract expires in 15 days.',
    type: 'Contract',
    time: '3 hours ago'
  },
  {
    title: 'Compliance Notification',
    message: 'Compliance document submission pending.',
    type: 'Compliance',
    time: 'Yesterday'
  }
];
}
