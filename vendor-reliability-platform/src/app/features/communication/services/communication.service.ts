import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // ======================================================
  // Conversations
  // ======================================================

  private readonly conversationsSubject = new BehaviorSubject<Conversation[]>([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      company: 'ABC Suppliers',
      isOnline: true,
      lastMessage: 'Supplier agreement updated.',
      lastMessageTime: '10:42 AM',
      unreadCount: 2,
      priority: 'High',
      isGroup: false
    },
    {
      id: 2,
      name: 'Marcus Reed',
      avatar: 'MR',
      company: 'Procurement',
      isOnline: true,
      lastMessage: 'Shipment schedule confirmed.',
      lastMessageTime: '09:18 AM',
      unreadCount: 0,
      priority: 'Medium',
      isGroup: false
    },
    {
      id: 3,
      name: 'Finance Team',
      avatar: 'FT',
      company: 'Finance',
      isOnline: false,
      lastMessage: 'Invoice approved.',
      lastMessageTime: 'Yesterday',
      unreadCount: 3,
      priority: 'Low',
      isGroup: true
    }
  ]);

  readonly conversations$ = this.conversationsSubject.asObservable();

  // ======================================================
  // Messages
  // ======================================================

  private readonly allMessages: Message[] = [

    {
      id: 1,
      conversationId: 1,
      sender: 'Sarah Chen',
      senderAvatar: 'SC',
      mine: false,
      text: 'Good morning! The supplier agreement has been updated.',
      sentAt: '10:30 AM',
      status: 'seen'
    },

    {
      id: 2,
      conversationId: 1,
      sender: 'You',
      senderAvatar: 'ME',
      mine: true,
      text: 'Perfect. I will review it today.',
      sentAt: '10:33 AM',
      status: 'seen'
    },

    {
      id: 3,
      conversationId: 2,
      sender: 'Marcus Reed',
      senderAvatar: 'MR',
      mine: false,
      text: 'Shipment departed from warehouse.',
      sentAt: '09:05 AM',
      status: 'delivered'
    },

    {
      id: 4,
      conversationId: 2,
      sender: 'You',
      senderAvatar: 'ME',
      mine: true,
      text: 'Thanks for the update.',
      sentAt: '09:08 AM',
      status: 'seen'
    },

    {
      id: 5,
      conversationId: 3,
      sender: 'Finance Team',
      senderAvatar: 'FT',
      mine: false,
      text: 'Invoice INV-1042 has been approved.',
      sentAt: 'Yesterday',
      status: 'seen'
    }

  ];

  private readonly messagesSubject = new BehaviorSubject<Message[]>([]);

  readonly messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.loadConversation(1);
  }

  loadConversation(id: number): void {

    this.messagesSubject.next(

      this.allMessages.filter(
        message => message.conversationId === id
      )

    );

  }

  sendMessage(conversationId: number, text: string): void {

    const message: Message = {

      id: Date.now(),

      conversationId,

      sender: 'You',

      senderAvatar: 'ME',

      mine: true,

      text,

      sentAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),

      status: 'sent'

    };

    this.allMessages.push(message);

    this.loadConversation(conversationId);

  }

}