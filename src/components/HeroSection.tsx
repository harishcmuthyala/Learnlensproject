"use client";

import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Play, FileText, Video, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-black rounded-full text-black font-medium">
                <Play size={16} />
                <span>Revolutionizing Learning</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-black font-display"
            >
              Transform Documents into Interactive Video Playlists
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-lg leading-relaxed"
            >
              Upload any PDF or text document and watch as Pius AI automatically
              converts it into engaging, structured video playlists. Learn smarter,
              not harder with AI-powered interactive learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={onGetStarted}
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onGetStarted}
              >
                <Play className="mr-2" size={20} />
                Watch Demo
              </Button>
            </motion.div>

            {/* Features Highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Instant Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Interactive Playlists</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1647539761535-e55f1c25e02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjE0MzE1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Interactive Learning"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Document Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl border border-gray-200 shadow-clean p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-black" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-900 text-sm font-medium">Document.pdf</div>
                    <div className="text-gray-500 text-xs">Uploaded</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Video Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-xl border border-gray-200 shadow-clean p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="text-black" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-900 text-sm font-medium">5 Videos</div>
                    <div className="text-gray-500 text-xs">Generated</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
