import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SideNavigationComponent } from '../../components/side-navigation/side-navigation.component';
import { TopNavbarComponent } from '../../components/top-navbar/top-navbar.component';

@Component({
  selector: 'app-communication-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SideNavigationComponent,
    TopNavbarComponent
  ],
  templateUrl: './communication-layout.component.html',
  styleUrls: ['./communication-layout.component.scss']
})
export class CommunicationLayoutComponent {}