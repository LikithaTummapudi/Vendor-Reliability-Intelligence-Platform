import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface CommunicationHistory {

  id:number;

  user:string;

  company:string;

  date:string;

  type:string;

  preview:string;

  attachment:boolean;

  project:string;

  status:'Delivered'|'Read'|'Pending';

}

@Component({
  selector:'app-communication-history',
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
  templateUrl:'./communication-history.component.html',
  styleUrls:['./communication-history.component.scss']
})
export class CommunicationHistoryComponent{

  history:CommunicationHistory[]=[

    {

      id:1,

      user:'Sarah Chen',

      company:'Nimbus Global',

      date:'Today • 10:42 AM',

      type:'Message',

      preview:'Updated compliance document has been uploaded for review.',

      attachment:true,

      project:'Supplier Onboarding',

      status:'Read'

    },

    {

      id:2,

      user:'Finance Team',

      company:'Internal',

      date:'Today • 09:10 AM',

      type:'Invoice',

      preview:'Invoice INV-2026-019 has been shared.',

      attachment:true,

      project:'Payment Processing',

      status:'Delivered'

    },

    {

      id:3,

      user:'Marcus Reed',

      company:'Vertex Industries',

      date:'Yesterday',

      type:'Discussion',

      preview:'Clarified delivery schedule and transportation timeline.',

      attachment:false,

      project:'Shipment Planning',

      status:'Read'

    },

    {

      id:4,

      user:'Emily Ross',

      company:'Legal',

      date:'Yesterday',

      type:'Contract',

      preview:'Legal review completed. Awaiting procurement approval.',

      attachment:true,

      project:'Contract Review',

      status:'Pending'

    }

  ];

}