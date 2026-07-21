import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementDiscussion } from '../../../models/procurement-discussion.model';

@Component({
  selector: 'app-discussion-details',
  standalone: true,
  imports:[CommonModule],
  templateUrl:'./discussion-details.component.html',
  styleUrls:['./discussion-details.component.scss']
})
export class DiscussionDetailsComponent{

@Input({required:true})
discussion!:ProcurementDiscussion;

}