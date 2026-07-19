import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule
  ],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavbarComponent {}