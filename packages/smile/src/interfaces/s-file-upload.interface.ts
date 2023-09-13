export interface FileItem {
  file: Blob;
  name: string;
  description: string;
  status: 'loading' | 'success' | 'error' | 'default';
}
