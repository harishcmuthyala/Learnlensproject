"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'upload', label: 'Upload' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b border-gray-200' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-semibold text-black">Pius AI</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors font-medium ${
                  currentSection === item.id
                    ? 'text-black border-b-2 border-black pb-1'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => onNavigate('upload')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-all min-h-[44px] font-medium ${
                    currentSection === item.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="lg"
                onClick={() => {
                  onNavigate('upload');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px]"
              >
                Get Started
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
