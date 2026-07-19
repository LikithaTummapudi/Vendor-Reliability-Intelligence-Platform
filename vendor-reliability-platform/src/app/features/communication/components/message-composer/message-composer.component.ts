import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

@Component({

selector:'app-message-composer',

standalone:true,

imports:[

CommonModule,

FormsModule,

MatButtonModule,

MatIconModule

],

templateUrl:'./message-composer.component.html',

styleUrls:['./message-composer.component.scss']

})

export class MessageComposerComponent{

message='';

}