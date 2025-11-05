import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { ProcessingDashboard } from './ProcessingDashboard';
import { SubscriptionModal } from './SubscriptionModal';
import { apiService } from '../services/api';
import { ProcessingStatus } from '../types';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

interface UploadSectionProps {
  onComplete?: () => void;
}

export function UploadSection({ onComplete }: UploadSectionProps) {
  const [uploadState, setUploadState] = useState<ProcessingStatus | 'idle'>('idle');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    });

    try {
      setUploadState('uploading');
      setProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const response = await apiService.uploadDocument(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setUploadState('complete');
        setDocumentId(response.documentId);
        onComplete?.();
      }, 500);
      
    } catch (error) {
      setError('Upload failed. Please try again.');
      setUploadState('idle');
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const resetUpload = () => {
    setUploadState('idle');
    setUploadedFile(null);
    setProgress(0);
    setDocumentId(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // Integrate with payment processor
    console.log('Subscribing to:', plan);
    setShowSubscription(false);
    // Redirect to payment or handle subscription logic
  };

  // Show dashboard if document is uploaded
  if (documentId && uploadState === 'complete') {
    return (
      <>
        <ProcessingDashboard 
          documentId={documentId} 
          onSubscribe={() => setShowSubscription(true)}
        />
        <SubscriptionModal
          isOpen={showSubscription}
          onClose={() => setShowSubscription(false)}
          onSubscribe={handleSubscribe}
        />
      </>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-purple-700 mb-4">
            Upload & Transform
          </div>
          <h2 className="text-gray-900 mb-4">
            Upload Your Document
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload any PDF, Word document, or text file to get started. 
            Our AI will analyze and convert it into an interactive video playlist.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {uploadState === 'idle' && (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`p-12 border-2 border-dashed transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? 'border-purple-600 bg-purple-50 scale-105'
                    : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-600 text-sm mb-4"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}

                <div className="text-center">
                  <motion.div
                    animate={{
                      y: isDragging ? -10 : 0,
                      scale: isDragging ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-block"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Upload className="text-purple-600" size={40} />
                    </div>
                  </motion.div>

                  <h3 className="text-gray-900 mb-2">
                    Drop your document here
                  </h3>
                  <p className="text-gray-600 mb-6">
                    or click to browse
                  </p>

                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Select File
                  </Button>

                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <span>Supported formats:</span>
                    <div className="flex gap-2">
                      {['PDF', 'DOC', 'DOCX', 'TXT'].map((format) => (
                        <span
                          key={format}
                          className="px-2 py-1 bg-gray-100 rounded text-xs"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {(uploadState === 'uploading' || uploadState === 'processing') && uploadedFile && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900">{uploadedFile.name}</h3>
                      <button
                        onClick={resetUpload}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                {uploadState === 'uploading' && (
                  <>
                    <Progress value={progress} className="mb-4" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Uploading...</span>
                      <span className="text-purple-600">{progress}%</span>
                    </div>
                  </>
                )}

                {uploadState === 'analyzing' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-purple-600">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Analyzing document with AI...</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle size={16} className="text-green-600" />
                        <span>Document uploaded successfully</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={16} className="animate-spin text-purple-600" />
                        <span>Extracting content and creating outline...</span>
                      </motion.div>
                    </div>
                  </div>
                )}

                {uploadState === 'generating' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-purple-600">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Generating your first video...</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <motion.div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span>Document analyzed</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span>Topics identified</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-purple-600" />
                        <span>Creating video content...</span>
                      </motion.div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {uploadState === 'complete' && uploadedFile && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="text-green-600" size={40} />
                </motion.div>

                <h3 className="text-gray-900 mb-2">
                  Playlist Generated Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your document has been converted into an interactive video playlist.
                </p>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={resetUpload}
                    variant="outline"
                    className="border-2"
                  >
                    Upload Another
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    View Playlist
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Info */}
        {uploadState === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid sm:grid-cols-3 gap-6 text-center"
          >
            <div>
              <div className="text-purple-600 mb-1">Fast</div>
              <p className="text-sm text-gray-600">
                Processing in seconds
              </p>
            </div>
            <div>
              <div className="text-purple-600 mb-1">Secure</div>
              <p className="text-sm text-gray-600">
                End-to-end encryption
              </p>
            </div>
            <div>
              <div className="text-purple-600 mb-1">Smart</div>
              <p className="text-sm text-gray-600">
                AI-powered analysis
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
