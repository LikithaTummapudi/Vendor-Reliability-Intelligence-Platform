import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface ActivityLog {

  id:number;

  user:string;

  action:string;

  module:string;

  time:string;

  details:string;

  severity:'Low'|'Medium'|'High';

  icon:string;

}

@Component({
  selector:'app-activity-logs',
  standalone:true,
  imports:[
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl:'./activity-logs.component.html',
  styleUrls:['./activity-logs.component.scss']
})
export class ActivityLogsComponent {

  logs:ActivityLog[]=[

    {

      id:1,

      user:'Sarah Chen',

      action:'Message Sent',

      module:'Communication',

      time:'10:42 AM',

      details:'Sent updated compliance document to Procurement Team.',

      severity:'Low',

      icon:'send'

    },

    {

      id:2,

      user:'Marcus Reed',

      action:'File Uploaded',

      module:'File Sharing',

      time:'10:15 AM',

      details:'Uploaded Supplier_Agreement_v2.pdf',

      severity:'Medium',

      icon:'upload_file'

    },

    {

      id:3,

      user:'Emily Ross',

      action:'Discussion Resolved',

      module:'Discussion Thread',

      time:'Yesterday',

      details:'Contract clarification discussion marked as resolved.',

      severity:'Low',

      icon:'task_alt'

    },

    {

      id:4,

      user:'Finance Team',

      action:'Invoice Shared',

      module:'Communication',

      time:'Yesterday',

      details:'Invoice INV-2026-017 shared with Vendor.',

      severity:'High',

      icon:'receipt_long'

    }

  ];

}