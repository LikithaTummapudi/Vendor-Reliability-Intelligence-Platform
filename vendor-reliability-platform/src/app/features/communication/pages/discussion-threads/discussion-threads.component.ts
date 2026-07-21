import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

interface DiscussionComment {
  user: string;
  role: string;
  message: string;
  time: string;
}

interface DiscussionThread {
  id: number;
  title: string;
  category: string;
  status: 'Open' | 'In Review' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  participants: number;
  replies: number;
  updated: string;
  comments: DiscussionComment[];
  actionItems: string[];
  decision: string;
}

@Component({
  selector: 'app-discussion-threads',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './discussion-threads.component.html',
  styleUrls: ['./discussion-threads.component.scss']
})
export class DiscussionThreadsComponent {

  threads: DiscussionThread[] = [

    {
      id: 1,
      title: 'Supplier Onboarding Delay',
      category: 'Vendor Communication',
      status: 'Open',
      priority: 'High',
      participants: 12,
      replies: 28,
      updated: '15 mins ago',

      comments: [

        {
          user: 'Sarah Chen',
          role: 'Procurement Manager',
          message: 'Vendor requested additional compliance verification.',
          time: '09:30 AM'
        },

        {
          user: 'Alex Morgan',
          role: 'Finance',
          message: 'Finance approval has been completed.',
          time: '10:00 AM'
        },

        {
          user: 'You',
          role: 'Administrator',
          message: 'Waiting for legal confirmation.',
          time: '10:15 AM'
        }

      ],

      actionItems: [
        'Review uploaded compliance documents',
        'Schedule vendor meeting',
        'Notify legal department'
      ],

      decision: 'Pending final legal approval.'
    },

    {
      id: 2,
      title: 'Contract Clarification',
      category: 'Contracts',
      status: 'Resolved',
      priority: 'Medium',
      participants: 6,
      replies: 11,
      updated: 'Yesterday',

      comments: [

        {
          user: 'Emily Ross',
          role: 'Legal',
          message: 'Contract clause updated successfully.',
          time: 'Yesterday'
        }

      ],

      actionItems: [
        'Archive discussion'
      ],

      decision: 'Changes approved by all stakeholders.'
    }

  ];

  selectedThread = this.threads[0];

  selectThread(thread: DiscussionThread): void {
    this.selectedThread = thread;
  }

}