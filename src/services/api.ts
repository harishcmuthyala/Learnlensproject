import { DocumentOutline, UploadResponse, Video } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  async uploadDocument(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  async getDocumentStatus(documentId: string): Promise<DocumentOutline> {
    const response = await fetch(`${API_BASE}/documents/${documentId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get document status');
    }

    return response.json();
  }

  async getVideoStatus(videoId: string): Promise<Video> {
    const response = await fetch(`${API_BASE}/videos/${videoId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get video status');
    }

    return response.json();
  }

  async generateVideo(topicId: string): Promise<{ videoId: string }> {
    const response = await fetch(`${API_BASE}/generate-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate video');
    }

    return response.json();
  }

  async checkSubscription(): Promise<{ isPremium: boolean }> {
    const response = await fetch(`${API_BASE}/subscription`);
    
    if (!response.ok) {
      throw new Error('Failed to check subscription');
    }

    return response.json();
  }
}

export const apiService = new ApiService();