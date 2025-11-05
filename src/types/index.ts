export interface DocumentOutline {
  id: string;
  title: string;
  topics: Topic[];
  createdAt: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  order: number;
  video?: Video;
  isPremium: boolean;
}

export interface Video {
  id: string;
  url: string;
  status: 'generating' | 'ready' | 'error';
  duration?: number;
  thumbnail?: string;
}

export interface UploadResponse {
  documentId: string;
  outline: DocumentOutline;
}

export interface User {
  id: string;
  email: string;
  isPremium: boolean;
  freeVideosUsed: number;
}

export type ProcessingStatus = 'uploading' | 'analyzing' | 'generating' | 'complete' | 'error';