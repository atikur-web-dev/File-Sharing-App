import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import {
  TrashIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  LinkIcon,
  DocumentIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { Card } from '../common/Card';
import { ConfirmModal } from '../common/Modal';
import { formatFileSize, formatRelativeTime, copyToClipboard } from '../../lib/utils';
import { getFileDownloadUrl, getFileViewUrl } from '../../api/fileApi';
import type { FileType } from '../../types';

interface FileCardProps {
  file: FileType;
  onDelete: (uuid: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) return <PhotoIcon className="w-8 h-8" />;
    if (mimetype === 'application/pdf') return <DocumentTextIcon className="w-8 h-8" />;
    if (mimetype.includes('word')) return <DocumentTextIcon className="w-8 h-8" />;
    if (mimetype.startsWith('video/')) return <VideoCameraIcon className="w-8 h-8" />;
    if (mimetype.startsWith('audio/')) return <MusicalNoteIcon className="w-8 h-8" />;
    if (mimetype.includes('zip')) return <ArchiveBoxIcon className="w-8 h-8" />;
    return <DocumentIcon className="w-8 h-8" />;
  };

  const getFileIconColor = (mimetype: string): string => {
    if (mimetype.startsWith('image/')) return 'text-green-500';
    if (mimetype === 'application/pdf') return 'text-red-500';
    if (mimetype.includes('word')) return 'text-blue-500';
    if (mimetype.startsWith('video/')) return 'text-purple-500';
    if (mimetype.startsWith('audio/')) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/share/${file.uuid}`;
    await copyToClipboard(shareUrl);
  };

  const handleDownload = () => {
    window.open(getFileDownloadUrl(file.uuid), '_blank');
  };

  const handlePreview = () => {
    window.open(getFileViewUrl(file.uuid), '_blank');
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      onDelete(file.uuid);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Card hoverable className="h-full flex flex-col">
        <div className="flex items-start gap-3">
          <div className={cn('flex-shrink-0', getFileIconColor(file.mimetype))}>
            {getFileIcon(file.mimetype)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-white truncate" title={file.originalName}>
              {file.originalName}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <p>Uploaded {formatRelativeTime(file.uploadedAt)}</p>
          <p className="truncate mt-0.5">{file.mimetype.split('/')[1]?.toUpperCase() || file.mimetype}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Copy share link"
            >
              <LinkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={handlePreview}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Preview"
            >
              <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Download"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
            title="Delete"
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </Card>
      
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete File"
        message={`Are you sure you want to delete "${file.originalName}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
};