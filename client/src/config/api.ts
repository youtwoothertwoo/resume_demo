export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  EXPORT_PDF: `${API_BASE_URL}/api/export-pdf`,
} as const; 