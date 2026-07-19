import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { ConversationCardComponent } from '../conversation-card/conversation-card.component';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ConversationCardComponent
  ],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationListComponent {

  conversations = [
    {
      name:'Sarah Chen',
      company:'Nimbus Global',
      message:'Drafted the Q3 contract...',
      time:'10:42 AM',
      unread:0,
      online:true,
      priority:'Priority'
    },
    {
      name:'Marcus Thorne',
      company:'Vertex Manufacturing',
      message:'Shipping logs for Batch #992...',
      time:'Yesterday',
      unread:3,
      online:false,
      priority:''
    },
    {
      name:'Procurement Team',
      company:'Internal',
      message:"Let's review Vendor Audit.",
      time:'Mon',
      unread:0,
      online:false,
      priority:''
    }
  ];

}