import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Lock, CheckCircle, Loader2, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { VideoPlayer } from './VideoPlayer';
import { DocumentOutline, Topic } from '../types';
import { apiService } from '../services/api';

interface ProcessingDashboardProps {
  documentId: string;
  onSubscribe: () => void;
}

export function ProcessingDashboard({ documentId, onSubscribe }: ProcessingDashboardProps) {
  const [outline, setOutline] = useState<DocumentOutline | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [outlineData, subscriptionData] = await Promise.all([
          apiService.getDocumentStatus(documentId),
          apiService.checkSubscription()
        ]);
        
        setOutline(outlineData);
        setIsPremium(subscriptionData.isPremium);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [documentId]);

  const handleVideoGenerate = async (topicId: string) => {
    try {
      await apiService.generateVideo(topicId);
      // Refresh data
      const outlineData = await apiService.getDocumentStatus(documentId);
      setOutline(outlineData);
    } catch (error) {
      console.error('Failed to generate video:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );
  }

  if (!outline) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Failed to load document outline</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{outline.title}</h1>
        <p className="text-gray-600">
          {outline.topics.length} topics • Created {new Date(outline.createdAt).toLocaleDateString()}
        </p>
      </motion.div>

      <div className="space-y-4">
        {outline.topics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            index={index}
            isPremium={isPremium}
            onGenerate={() => handleVideoGenerate(topic.id)}
            onSubscribe={onSubscribe}
            onWatchVideo={(url, title) => setCurrentVideo({ url, title })}
          />
        ))}
      </div>

      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Crown className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Unlock All Videos</h3>
                <p className="text-gray-600 text-sm">
                  Get unlimited access to all video topics and premium features
                </p>
              </div>
              <Button
                onClick={onSubscribe}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Subscribe Now
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
      
      {currentVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{currentVideo.title}</h3>
              <Button 
                variant="outline" 
                onClick={() => setCurrentVideo(null)}
              >
                Close
              </Button>
            </div>
            <VideoPlayer 
              src={currentVideo.url}
              title={currentVideo.title}
              onComplete={() => setCurrentVideo(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface TopicCardProps {
  topic: Topic;
  index: number;
  isPremium: boolean;
  onGenerate: () => void;
  onSubscribe: () => void;
  onWatchVideo: (url: string, title: string) => void;
}

function TopicCard({ topic, index, isPremium, onGenerate, onSubscribe, onWatchVideo }: TopicCardProps) {
  const isFirstTopic = index === 0;
  const canAccess = isPremium || isFirstTopic;
  const hasVideo = topic.video?.status === 'ready';
  const isGenerating = topic.video?.status === 'generating';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`p-6 ${!canAccess ? 'opacity-75' : ''}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              hasVideo ? 'bg-green-100 text-green-600' :
              isGenerating ? 'bg-yellow-100 text-yellow-600' :
              canAccess ? 'bg-purple-100 text-purple-600' :
              'bg-gray-100 text-gray-400'
            }`}>
              {index + 1}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">{topic.title}</h3>
              {topic.isPremium && !isFirstTopic && (
                <Badge variant="secondary" className="text-xs">
                  <Lock size={10} className="mr-1" />
                  Premium
                </Badge>
              )}
              {isFirstTopic && (
                <Badge variant="outline" className="text-xs">
                  Free
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-4">{topic.description}</p>

            <div className="flex items-center gap-3">
              {hasVideo && canAccess && (
                <Button 
                  size="sm" 
                  onClick={() => onWatchVideo(topic.video?.url || '', topic.title)}
                  style={{ backgroundColor: '#16a34a', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                >
                  <Play size={16} className="mr-2" />
                  Watch Video
                </Button>
              )}

              {isGenerating && (
                <div className="flex items-center gap-2 text-sm text-yellow-600">
                  <Loader2 size={16} className="animate-spin" />
                  Generating video...
                </div>
              )}

              {!hasVideo && !isGenerating && canAccess && (
                <Button size="sm" variant="outline" onClick={onGenerate}>
                  Generate Video
                </Button>
              )}



              {hasVideo && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle size={16} />
                  Ready
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}