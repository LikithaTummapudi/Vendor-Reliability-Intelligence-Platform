import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EmailNotification {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  preview: string;
  timestamp: string;
  status: 'Delivered' | 'Read' | 'Pending';
}

@Component({
  selector: 'app-email-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailNotificationsComponent {

  emails: EmailNotification[] = [

    {
      id:'1',
      subject:'Purchase Order Approved',
      sender:'Finance Team',
      recipient:'You',
      preview:'Purchase Order PO-1042 has been approved.',
      timestamp:'Today • 10:42 AM',
      status:'Read'
    },

    {
      id:'2',
      subject:'RFQ Invitation Sent',
      sender:'Procurement Team',
      recipient:'Dell Technologies',
      preview:'RFQ-1042 has been successfully sent.',
      timestamp:'Today • 09:15 AM',
      status:'Delivered'
    },

    {
      id:'3',
      subject:'Contract Renewal Reminder',
      sender:'Legal Team',
      recipient:'You',
      preview:'Vendor agreement expires in 15 days.',
      timestamp:'Yesterday',
      status:'Pending'
    },

    {
      id:'4',
      subject:'Vendor Documents Received',
      sender:'Sarah Chen',
      recipient:'You',
      preview:'Uploaded updated compliance certificates.',
      timestamp:'18 Jul',
      status:'Read'
    },

    {
      id:'5',
      subject:'Invoice Verification Complete',
      sender:'Finance Team',
      recipient:'Procurement',
      preview:'Invoice INV-23891 has been verified.',
      timestamp:'17 Jul',
      status:'Delivered'
    }

  ];

}