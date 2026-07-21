import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedFile } from '../../../models/shared-file.model';
import { FileCardComponent } from '../file-card/file-card.component';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    CommonModule,
    FileCardComponent
  ],
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent {

  @Input()
  files: SharedFile[] = [];

  @Output()
  download = new EventEmitter<SharedFile>();

}