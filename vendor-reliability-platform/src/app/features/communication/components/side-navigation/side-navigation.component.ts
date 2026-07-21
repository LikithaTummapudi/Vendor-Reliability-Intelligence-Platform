import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface MenuItem{
  title:string;
  icon:string;
  route:string;
}

interface Contact{
  name:string;
  online:boolean;
}

@Component({
  selector:'app-side-navigation',
  standalone:true,
  imports:[
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl:'./side-navigation.component.html',
  styleUrls:['./side-navigation.component.scss']
})
export class SideNavigationComponent{

  collapsed=false;

  menu:MenuItem[]=[

    {
      title:'Dashboard',
      icon:'dashboard',
      route:'/communication'
    },

    {
      title:'Conversations',
      icon:'chat',
      route:'/communication/conversations'
    },

    {
      title:'Discussion Threads',
      icon:'forum',
      route:'/communication/discussions'
    },

    {
      title:'Shared Files',
      icon:'folder',
      route:'/communication/files'
    },

    {
      title:'History',
      icon:'history',
      route:'/communication/history'
    },

    {
      title:'Activity Logs',
      icon:'analytics',
      route:'/communication/activity'
    }

  ];

  contacts:Contact[]=[

    {
      name:'Sarah Chen',
      online:true
    },

    {
      name:'Marcus Reed',
      online:true
    },

    {
      name:'Emily Ross',
      online:false
    },

    {
      name:'Finance Team',
      online:true
    }

  ];

  toggleSidebar(){

    this.collapsed=!this.collapsed;

  }

}