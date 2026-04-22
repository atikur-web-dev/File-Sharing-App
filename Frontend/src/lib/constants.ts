// APPLICATION CONSTANTS
export const APP_NAME = 'FileShare';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Secure file sharing platform for everyone';


// API CONFIGURATION
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  // Files
  FILES: {
    UPLOAD: '/files',
    LIST: '/files',
    MY_FILES: '/files/my',
    DETAIL: '/files',
    DOWNLOAD: '/files/download',
    VIEW: '/files/view',
    DELETE: '/files',
  },
} as const;


// FILE CONFIGURATION
export const FILE_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, 
  MAX_FILE_SIZE_MB: 5,
  MAX_FILES_PER_UPLOAD: 5,
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/json',
  ] as const,
} as const;


// PAGINATION CONFIGURATION
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100] as const,
} as const;


// TOAST NOTIFICATION CONFIGURATION
export const TOAST_CONFIG = {
  DURATION: {
    SHORT: 2000,
    NORMAL: 3000,
    LONG: 5000,
    PERSISTENT: Infinity,
  },
  POSITION: {
    TOP_RIGHT: 'top-right',
    TOP_CENTER: 'top-center',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_LEFT: 'bottom-left',
  },
} as const;


// VALIDATION PATTERNS
export const VALIDATION_PATTERNS = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const VALIDATION_MESSAGES = {
  PASSWORD: 'Password must contain uppercase, lowercase, number and special character',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  EMAIL_INVALID: 'Please enter a valid email address',
  REQUIRED_FIELD: 'This field is required',
  DISPLAY_NAME_MIN: 'Display name must be at least 3 characters',
  DISPLAY_NAME_MAX: 'Display name cannot exceed 50 characters',
} as const;


// ROUTE PATHS
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ANALYTICS: '/analytics',
  SHARE: '/share',
  PREVIEW: '/preview',
  NOT_FOUND: '/404',
} as const;


// LOCAL STORAGE KEYS
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'user-preferences',
  AUTH_TOKEN: 'auth-token',
} as const;


// THEME CONFIGURATION
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type Theme = typeof THEME[keyof typeof THEME];


// DATE FORMAT CONFIGURATION
export const DATE_FORMAT = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  DATETIME: 'MMMM DD, YYYY HH:mm',
  TIME: 'HH:mm',
  RELATIVE: 'relative',
} as const;


// ERROR MESSAGES
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Your session has expired. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: `File size exceeds ${FILE_CONFIG.MAX_FILE_SIZE_MB}MB limit.`,
  UNSUPPORTED_FILE_TYPE: 'This file type is not supported.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  DELETE_FAILED: 'Failed to delete file. Please try again.',
} as const;