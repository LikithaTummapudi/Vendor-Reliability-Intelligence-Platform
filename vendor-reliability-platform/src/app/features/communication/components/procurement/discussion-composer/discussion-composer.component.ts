import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-discussion-composer',
standalone:true,
imports:[
CommonModule,
FormsModule
],
templateUrl:'./discussion-composer.component.html',
styleUrls:['./discussion-composer.component.scss']
})
export class DiscussionComposerComponent{

message='';

@Output()
send=new EventEmitter<string>();

submit(){

if(!this.message.trim()) return;

this.send.emit(this.message);

this.message='';

}

}