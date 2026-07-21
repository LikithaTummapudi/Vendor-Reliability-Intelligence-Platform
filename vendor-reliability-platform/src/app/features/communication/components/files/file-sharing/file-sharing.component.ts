import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileToolbarComponent } from '../file-toolbar/file-toolbar.component';
import { FileListComponent } from '../file-list/file-list.component';

import { SharedFile } from '../../../models/shared-file.model';

@Component({
  selector: 'app-file-sharing',
  standalone: true,
  imports: [
    CommonModule,
    FileToolbarComponent,
    FileListComponent
  ],
  templateUrl: './file-sharing.component.html',
  styleUrls: ['./file-sharing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSharingComponent {

  files: SharedFile[] = [

    {
      id:'1',
      fileName:'Vendor_Contract_2026.pdf',
      category:'PDF',
      fileSize:'2.4 MB',
      uploadedBy:'Sarah Chen',
      uploadedAt:'Today • 10:30 AM',
      description:'Signed vendor agreement',
      version:'v2.1',
      downloadable:true
    },

    {
      id:'2',
      fileName:'RFQ_1042.xlsx',
      category:'Spreadsheet',
      fileSize:'1.2 MB',
      uploadedBy:'Marcus Reed',
      uploadedAt:'Today • 09:20 AM',
      description:'Supplier quotation comparison',
      version:'v1.4',
      downloadable:true
    },

    {
      id:'3',
      fileName:'Purchase_Order_2318.pdf',
      category:'PDF',
      fileSize:'3.8 MB',
      uploadedBy:'Procurement Team',
      uploadedAt:'Yesterday',
      description:'Approved purchase order',
      version:'v3.0',
      downloadable:true
    },

    {
      id:'4',
      fileName:'Supplier_Audit_Report.docx',
      category:'Document',
      fileSize:'940 KB',
      uploadedBy:'QA Team',
      uploadedAt:'Yesterday',
      description:'Vendor audit observations',
      version:'v1.1',
      downloadable:true
    },

    {
      id:'5',
      fileName:'Product_Catalog.pdf',
      category:'PDF',
      fileSize:'7.5 MB',
      uploadedBy:'Dell Technologies',
      uploadedAt:'18 Jul',
      description:'Latest product catalogue',
      version:'2026',
      downloadable:true
    },

    {
      id:'6',
      fileName:'Invoice_July_2026.pdf',
      category:'PDF',
      fileSize:'520 KB',
      uploadedBy:'Finance Team',
      uploadedAt:'17 Jul',
      description:'Invoice for July purchases',
      version:'Final',
      downloadable:true
    }

  ];

  download(file: SharedFile): void {
    console.log('Download:', file.fileName);
  }

  upload(): void {
    console.log('Upload clicked');
  }

}