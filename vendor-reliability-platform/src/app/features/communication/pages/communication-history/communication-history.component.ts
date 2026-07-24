import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryTimelineComponent } from '../../components/history/history-timeline/history-timeline.component';

import { HistoryEvent } from '../../models/history-event.model';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-communication-history',
  standalone: true,
  imports: [
    CommonModule,
    HistoryTimelineComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './communication-history.component.html',
  styleUrls: ['./communication-history.component.scss']
})
export class CommunicationHistoryComponent {

  events: HistoryEvent[] = [

    {
      id:'1',
      type:'file',
      title:'Vendor Contract Uploaded',
      description:'Sarah Chen uploaded Vendor_Contract_2026.pdf',
      user:'Sarah Chen',
      timestamp:'Today • 10:42 AM'
    },

    {
      id:'2',
      type:'discussion',
      title:'RFQ Discussion Updated',
      description:'You replied in RFQ-1042 procurement discussion.',
      user:'You',
      timestamp:'Today • 10:18 AM'
    },

    {
      id:'3',
      type:'message',
      title:'Vendor Message Sent',
      description:'Shipment schedule confirmed with Marcus Reed.',
      user:'You',
      timestamp:'Today • 09:54 AM'
    },

    {
      id:'4',
      type:'email',
      title:'Approval Email Sent',
      description:'Purchase Order approval email sent to Finance Team.',
      user:'System',
      timestamp:'Yesterday'
    },

    {
      id:'5',
      type:'status',
      title:'Vendor Reliability Updated',
      description:'Reliability score increased from 89% to 92%.',
      user:'System',
      timestamp:'18 Jul'
    },

    {
      id:'6',
      type:'file',
      title:'Invoice Uploaded',
      description:'Invoice_July_2026.pdf uploaded by Finance Team.',
      user:'Finance Team',
      timestamp:'17 Jul'
    }

  ];

}

