import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GetYourGuideTours() {
  useEffect(() => {
    // Load GetYourGuide widget script if not already loaded
    const win = window as any;
    if (win.gygWidget) {
      win.gygWidget.render();
    } else {
      const script = document.createElement('script');
      script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="w-full py-16 md:py-24" style={{ backgroundColor: '#F8EFE0' }}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Headline and Subheadline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Top-Rated Tours & Experiences
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            Hand-picked activities across Europe, Asia & Brazil — book instantly.
          </p>
        </div>

        {/* GetYourGuide Widget */}
        <div className="mb-8 flex justify-center">
          <div 
            data-gyg-widget="auto" 
            data-gyg-partner-id="YOPATWV"
            className="w-full max-w-4xl"
          />
        </div>

        {/* Browse All Tours Button */}
        <div className="flex justify-center">
          <a
            href="https://www.getyourguide.com/?partner_id=YOPATWV"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-lg"
            >
              Browse All Tours
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
