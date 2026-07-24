export interface Conversation {

  id:number;

  name:string;

  avatar:string;

  company:string;

  isOnline:boolean;

  lastMessage:string;

  lastMessageTime:string;

  unreadCount:number;

  priority:'Low'|'Medium'|'High';

  isGroup:boolean;

}