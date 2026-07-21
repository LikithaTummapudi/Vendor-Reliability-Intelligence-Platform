import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedFile } from '../../../models/shared-file.model';

@Component({
  selector: 'app-file-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileCardComponent {

  @Input({ required: true })
  file!: SharedFile;

  @Output()
  download = new EventEmitter<SharedFile>();

  get fileIcon(): string {
    switch (this.file.category) {
      case 'PDF':
        return '📕';
      case 'Spreadsheet':
        return '📊';
      case 'Document':
        return '📄';
      case 'Presentation':
        return '📽️';
      case 'Image':
        return '🖼️';
      default:
        return '📁';
    }
  }

  onDownload(): void {
    this.download.emit(this.file);
  }

}