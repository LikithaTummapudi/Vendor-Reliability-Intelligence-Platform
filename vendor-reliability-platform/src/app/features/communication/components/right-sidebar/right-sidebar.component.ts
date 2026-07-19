import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

@Component({

selector:'app-right-sidebar',

standalone:true,

imports:[

CommonModule,

MatButtonModule

],

templateUrl:'./right-sidebar.component.html',

styleUrls:['./right-sidebar.component.scss']

})

export class RightSidebarComponent{}