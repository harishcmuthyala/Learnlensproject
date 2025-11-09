"use client";

import { motion } from 'motion/react';
import { Upload, Sparkles, PlayCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface HowItWorksSectionProps {
  onTryNow: () => void;
}

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Document',
    description: 'Simply drag and drop your PDF, Word document, or text file into our secure upload zone.',
    color: 'purple',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Content Analysis & Playlist Generation',
    description: 'Our AI analyzes your document structure, identifies key topics, and generates a structured video playlist.',
    color: 'blue',
  },
  {
    number: '03',
    icon: PlayCircle,
    title: 'Interactive Learning Interface',
    description: 'Start learning with interactive videos, track your progress, and engage with content at your own pace.',
    color: 'green',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
};

export function HowItWorksSection({ onTryNow }: HowItWorksSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 mb-4">
            How It Works
          </div>
          <h2 className="text-gray-900 mb-4">
            Three Simple Steps to Better Learning
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your documents into interactive learning experiences in just a few clicks.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = colorMap[step.color];
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className={`p-8 hover:shadow-xl transition-all duration-300 ${isEven ? 'ml-auto' : 'mr-auto'} max-w-4xl`}>
                  <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                    {/* Icon and Number */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className={`w-24 h-24 ${colors.bg} rounded-2xl flex items-center justify-center relative`}
                      >
                        <Icon className={colors.text} size={40} />
                        <div className={`absolute -top-3 -right-3 w-12 h-12 bg-white border-2 ${colors.border} rounded-full flex items-center justify-center text-sm ${colors.text}`}>
                          {step.number}
                        </div>
                      </motion.div>
                      
                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                          className={`hidden md:block absolute left-1/2 top-full w-0.5 h-20 ${colors.bg} transform -translate-x-1/2`}
                        >
                          <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                          >
                            <ArrowRight className={`${colors.text} rotate-90`} size={20} />
                          </motion.div>
                        </motion.div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                      <h3 className="text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onTryNow}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group"
          >
            Try It Yourself
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
