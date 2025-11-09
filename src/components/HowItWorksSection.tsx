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
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Content Analysis & Playlist Generation',
    description: 'Our AI analyzes your document structure, identifies key topics, and generates a structured video playlist.',
  },
  {
    number: '03',
    icon: PlayCircle,
    title: 'Interactive Learning Interface',
    description: 'Start learning with interactive videos, track your progress, and engage with content at your own pace.',
  },
];

export function HowItWorksSection({ onTryNow }: HowItWorksSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 border border-black rounded-full text-black font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-black mb-4">
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

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-8 max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Icon and Number */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                        <Icon className="text-black" size={40} />
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center text-sm font-bold text-black">
                          {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-black mb-3 font-semibold">
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onTryNow}
            className="group"
          >
            Try It Yourself
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
