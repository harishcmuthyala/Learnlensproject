"use client";

import { motion } from 'motion/react';
import { FileText, Video, BarChart3, Zap, BookOpen, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: FileText,
    title: 'Convert PDFs & Text to Video',
    description: 'Upload any document format and our AI instantly analyzes and converts content into engaging video format.',
    color: 'purple',
  },
  {
    icon: Video,
    title: 'Structured Playlists',
    description: 'Automatically organized chapters and topics into logical, easy-to-follow video playlists.',
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and completion metrics for each playlist.',
    color: 'green',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    description: 'Advanced AI processes documents in seconds, generating high-quality video content instantly.',
    color: 'yellow',
  },
  {
    icon: BookOpen,
    title: 'Interactive Learning',
    description: 'Engage with content through interactive elements, quizzes, and bookmarks within each video.',
    color: 'pink',
  },
  {
    icon: CheckCircle,
    title: 'Smart Recommendations',
    description: 'Get personalized video suggestions based on your learning patterns and interests.',
    color: 'indigo',
  },
];

const colorMap: Record<string, { bg: string; text: string; gradient: string }> = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-purple-500/20 to-purple-600/20' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-blue-500/20 to-blue-600/20' },
  green: { bg: 'bg-green-100', text: 'text-green-600', gradient: 'from-green-500/20 to-green-600/20' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', gradient: 'from-yellow-500/20 to-yellow-600/20' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', gradient: 'from-pink-500/20 to-pink-600/20' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', gradient: 'from-indigo-500/20 to-indigo-600/20' },
};

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-purple-700 mb-4">
            Features
          </div>
          <h2 className="text-gray-900 mb-4 font-display">
            Everything You Need for Effective Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Powerful features designed to transform your documents into engaging,
            interactive learning experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-purple-200">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4 relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <Icon className={`${colors.text} relative z-10`} size={28} />
                  </motion.div>
                  
                  <h3 className="text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-display font-bold mb-4">
                Ready to Transform Your Learning?
              </h3>
              <p className="text-lg text-purple-100 mb-8">
                Join students and professionals who are revolutionizing how they consume educational content.
                Upload your first document and experience AI-powered learning today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors shadow-lg hover:shadow-xl active:scale-95 transform duration-200">
                  Get Started Free
                </button>
                <button className="px-8 py-3 bg-purple-700/50 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors border-2 border-white/20 hover:border-white/40 active:scale-95 transform duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
