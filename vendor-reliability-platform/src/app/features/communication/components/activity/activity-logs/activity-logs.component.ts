import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActivityLog{

  id:number;

  user:string;

  action:string;

  module:string;

  time:string;

}

@Component({
  selector:'app-activity-logs',
  standalone:true,
  imports:[
    CommonModule
  ],
  templateUrl:'./activity-logs.component.html',
  styleUrls:['./activity-logs.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ActivityLogsComponent{

  logs:ActivityLog[]=[

    {
      id:1,
      user:'Sarah Chen',
      action:'Uploaded Vendor_Contract_2026.pdf',
      module:'File Sharing',
      time:'Today • 10:42 AM'
    },

    {
      id:2,
      user:'You',
      action:'Replied to RFQ-1042 discussion',
      module:'Procurement',
      time:'Today • 10:18 AM'
    },

    {
      id:3,
      user:'Finance Team',
      action:'Approved Purchase Order PO-1042',
      module:'Approvals',
      time:'Today • 09:57 AM'
    },

    {
      id:4,
      user:'Marcus Reed',
      action:'Started Shipment Delay discussion',
      module:'Discussion',
      time:'Yesterday'
    },

    {
      id:5,
      user:'Legal Team',
      action:'Updated Vendor Contract',
      module:'Contracts',
      time:'18 Jul'
    },

    {
      id:6,
      user:'QA Team',
      action:'Updated Vendor Reliability Score',
      module:'Vendor Management',
      time:'17 Jul'
    },

    {
      id:7,
      user:'System',
      action:'Email notification delivered',
      module:'Notifications',
      time:'17 Jul'
    },

    {
      id:8,
      user:'Procurement Team',
      action:'Shared RFQ documents',
      module:'File Sharing',
      time:'16 Jul'
    }

  ];

}