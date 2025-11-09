"use client";

import { motion } from 'motion/react';
import { FileText, Video, BarChart3, Zap, BookOpen, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const features = [
  {
    icon: FileText,
    title: 'Convert PDFs & Text to Video',
    description: 'Upload any document format and our AI instantly analyzes and converts content into engaging video format.',
  },
  {
    icon: Video,
    title: 'Structured Playlists',
    description: 'Automatically organized chapters and topics into logical, easy-to-follow video playlists.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and completion metrics for each playlist.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    description: 'Advanced AI processes documents in seconds, generating high-quality video content instantly.',
  },
  {
    icon: BookOpen,
    title: 'Interactive Learning',
    description: 'Engage with content through interactive elements, quizzes, and bookmarks within each video.',
  },
  {
    icon: CheckCircle,
    title: 'Smart Recommendations',
    description: 'Get personalized video suggestions based on your learning patterns and interests.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 border border-black rounded-full text-black font-medium mb-4">
            Features
          </div>
          <h2 className="text-black mb-4 font-display">
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

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="p-6 h-full">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-black" size={28} />
                  </div>

                  <h3 className="text-black mb-2 font-semibold">
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-black rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-display font-bold mb-4">
                Ready to Transform Your Learning?
              </h3>
              <p className="text-lg text-gray-300 mb-8">
                Join students and professionals who are revolutionizing how they consume educational content.
                Upload your first document and experience AI-powered learning today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
