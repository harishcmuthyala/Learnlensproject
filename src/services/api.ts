import { DocumentOutline, UploadResponse, Video } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

class ApiService {
  private documentTitles = new Map<string, string>();
  async uploadDocument(file: File): Promise<UploadResponse> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const documentId = 'demo-doc-123';
      const title = file.name.replace(/\.[^/.]+$/, '');
      this.documentTitles.set(documentId, title);
      return {
        documentId,
        outline: {
          id: 'demo-outline-123',
          title,
          topics: [
            { id: 'topic-1', title: 'Introduction', description: 'Overview and basics', order: 0, isPremium: false },
            { id: 'topic-2', title: 'Core Concepts', description: 'Main principles', order: 1, isPremium: true },
            { id: 'topic-3', title: 'Advanced Topics', description: 'Deep dive', order: 2, isPremium: true }
          ],
          createdAt: new Date().toISOString()
        }
      };
    }

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
    if (USE_MOCK) {
      const title = this.documentTitles.get(documentId) || 'Sample Document';
      return {
        id: 'video-outline-123',
        title,
        topics: [
          { id: 'topic-1', title: 'Introduction', description: 'Overview and basics', order: 0, isPremium: false, 
            video: { id: 'video-1', status: 'ready', url: 'https://piusai-demos.s3.us-east-1.amazonaws.com/tree.mp4', duration: 180, thumbnail: 'https://i.imgur.com/Zq4VYhF.jpg' } },
          { id: 'topic-2', title: 'Core Concepts', description: 'Main principles', order: 1, isPremium: true },
          { id: 'topic-3', title: 'Advanced Topics', description: 'Deep dive', order: 2, isPremium: true }
        ],
        createdAt: new Date().toISOString()
      };
    }

    const response = await fetch(`${API_BASE}/documents/${documentId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get document status');
    }

    return response.json();
  }

  async getVideoStatus(videoId: string): Promise<Video> {
    if (USE_MOCK) {
      return {
        id: videoId,
        status: 'ready',
        url: 'https://piusai-demos.s3.us-east-1.amazonaws.com/tree.mp4',
        duration: 180,
        thumbnail: 'https://i.imgur.com/Zq4VYhF.jpg'
      };
    }

    const response = await fetch(`${API_BASE}/videos/${videoId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get video status');
    }

    return response.json();
  }

  async generateVideo(topicId: string): Promise<{ videoId: string }> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { videoId: `video-${topicId}` };
    }

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
    if (USE_MOCK) {
      return { isPremium: false };
    }

    const response = await fetch(`${API_BASE}/subscription`);
    
    if (!response.ok) {
      throw new Error('Failed to check subscription');
    }

    return response.json();
  }
}

export const apiService = new ApiService();