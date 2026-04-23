import api from './axios';
import type { FileType } from '../types';

interface FileWithDownloadCount extends FileType {
  downloadCount?: number;
}

export interface DownloadStats {
  totalDownloads: number;
  filesByDownloads: {
    fileName: string;
    downloadCount: number;
    uuid: string;
  }[];
}

export const getDownloadStatsApi = async (): Promise<DownloadStats> => {
  const response = await api.get<{ data: { files: FileWithDownloadCount[] } }>('/files/my?limit=100');
  
  const files = response.data.data.files;
  
  const totalDownloads = files.reduce((sum, file) => {
    return sum + (file.downloadCount || 0);
  }, 0);
  
  const filesByDownloads = files
    .map(file => ({
      fileName: file.originalName,
      downloadCount: file.downloadCount || 0,
      uuid: file.uuid,
    }))
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 10);
  
  return {
    totalDownloads,
    filesByDownloads,
  };
};