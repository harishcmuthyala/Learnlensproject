"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, Crown, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'monthly' | 'yearly') => void;
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  if (!isOpen) return null;

  const plans = {
    monthly: {
      price: '$19',
      period: '/month',
      savings: null,
    },
    yearly: {
      price: '$190',
      period: '/year',
      savings: 'Save 17%',
    },
  };

  const features = [
    'Unlimited document uploads',
    'Generate unlimited videos',
    'HD video quality',
    'Priority processing',
    'Advanced AI analysis',
    'Export videos',
    'Premium support',
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Crown className="text-white" size={16} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Go Premium</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-center">
              Unlock unlimited video generation and premium features
            </p>
          </div>

          {/* Plan Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(plans).map(([key, plan]) => (
              <Card
                key={key}
                className={`p-4 cursor-pointer transition-all ${
                  selectedPlan === key
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan(key as 'monthly' | 'yearly')}
              >
                <div className="text-center">
                  <div className="font-bold text-lg text-gray-900">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-600">{plan.period}</div>
                  {plan.savings && (
                    <div className="text-xs text-green-600 font-medium mt-1">
                      {plan.savings}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What's included:</h3>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={() => onSubscribe(selectedPlan)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mb-4"
            size="lg"
          >
            <Zap className="mr-2" size={20} />
            Subscribe Now
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </motion.div>
    </div>
  );
}