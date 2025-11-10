"use client";

import { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { SampleVideosSection } from '@/components/SampleVideosSection';
import { UploadSection } from '@/components/UploadSection';

export default function Page() {
  const [currentSection, setCurrentSection] = useState('home');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setCurrentSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const yOffset = -80; // Account for fixed nav height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentSection={currentSection} onNavigate={scrollToSection} />

      <main>
        {/* Home Section */}
        <div
          ref={(el) => { sectionRefs.current['home'] = el; }}
          data-section="home"
          id="home"
        >
          <HeroSection onGetStarted={() => scrollToSection('upload')} />
          <FeaturesSection />
        </div>

        {/* How It Works Section */}
        <div
          ref={(el) => { sectionRefs.current['how-it-works'] = el; }}
          data-section="how-it-works"
          id="how-it-works"
        >
          <HowItWorksSection onTryNow={() => scrollToSection('upload')} />
          <SampleVideosSection />
        </div>

        {/* Upload Section */}
        <div
          ref={(el) => { sectionRefs.current['upload'] = el; }}
          data-section="upload"
          id="upload"
        >
          <UploadSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8 items-start">
            <div>
              <h4 className="mb-4 font-semibold text-black">Pius AI</h4>
              <p className="text-gray-600 text-sm">
                Transform documents into interactive video playlists for better learning.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-black">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-black">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-black">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Pius AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
