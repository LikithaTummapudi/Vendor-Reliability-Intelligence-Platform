export type FileCategory =
  | 'Document'
  | 'PDF'
  | 'Spreadsheet'
  | 'Image'
  | 'Presentation';

export interface SharedFile {

  id: string;

  fileName: string;

  category: FileCategory;

  fileSize: string;

  uploadedBy: string;

  uploadedAt: string;

  description: string;

  version: string;

  downloadable: boolean;

}