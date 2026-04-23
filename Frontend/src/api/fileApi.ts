import api from './axios';
import type {
  FileType,
  FileUploadResponse,
  PaginatedFilesResponse,
  FileQueryOptions,
} from '../types';

export const getUserFilesApi = async (
  options: FileQueryOptions = {}
): Promise<PaginatedFilesResponse> => {
  const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc' } = options;
  
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  params.append('sortBy', sortBy);
  params.append('sortOrder', sortOrder);
  if (search.trim()) {
    params.append('search', search.trim());
  }
  
  const response = await api.get<{ data: PaginatedFilesResponse }>(`/files/my?${params.toString()}`);
  return response.data.data;
};

export const uploadMultipleFilesApi = async (files: File[]): Promise<FileUploadResponse[]> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('sharedFile', file);
  });
  
  const response = await api.post<{ data: FileUploadResponse[] }>('/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data.data;
};

export const deleteFileApi = async (uuid: string): Promise<void> => {
  await api.delete(`/files/${uuid}`);
};

export const getPublicFileInfoApi = async (uuid: string): Promise<FileType> => {
  const response = await api.get<{ data: FileType }>(`/files/${uuid}`);
  return response.data.data;
};

export const getFileDownloadUrl = (uuid: string): string => {
  return `${import.meta.env.VITE_API_BASE_URL}/files/download/${uuid}`;
};

export const getFileViewUrl = (uuid: string): string => {
  return `${import.meta.env.VITE_API_BASE_URL}/files/view/${uuid}`;
};