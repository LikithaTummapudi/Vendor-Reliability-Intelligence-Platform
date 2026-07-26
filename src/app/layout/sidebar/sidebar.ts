import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface NavItem{

  title:string;

  icon:string;

  route:string;

  badge?:number;

}

@Component({
  selector:'app-sidebar',
  standalone:true,
  imports:[
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl:'./sidebar.html',
  styleUrl:'./sidebar.css'
})
export class Sidebar{
  profileMenuOpen = false;
  collapsed=false;

menu: NavItem[] = [

  {
    title: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard'
  },

  {
    title: 'Vendors',
    icon: 'groups',
    route: '/vendor-management'
  },

  {
    title: 'Procurement',
    icon: 'shopping_cart',
    route: '/procurement'
  },

  {
    title: 'Purchase Orders',
    icon: 'inventory_2',
    route: '/purchase-orders'
  },

  {
    title: 'Contracts',
    icon: 'description',
    route: '/contract-management'
  },

  {
    title: 'Performance',
    icon: 'leaderboard',
    route: '/performance'
  },

  {
    title: 'Communication',
    icon: 'chat',
    route: '/communication'
  },

  {
    title: 'Reports',
    icon: 'bar_chart',
    route: '/reports'
  },

  {
    title: 'Notifications',
    icon: 'notifications',
    badge: 5,
    route: '/notifications'
  },

  {
    title: 'Profile',
    icon: 'account_circle',
    route: '/profile'
  }

];

  toggleProfileMenu(): void {

  this.profileMenuOpen = !this.profileMenuOpen;

}

  toggleSidebar(){

    this.collapsed=!this.collapsed;

  }

}