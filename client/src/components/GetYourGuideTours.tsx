import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface GetYourGuideToursProps {
  label?: string;
  showHeadline?: boolean;
  showButton?: boolean;
  backgroundColor?: string;
  cardStyle?: boolean;
}

export default function GetYourGuideTours({ 
  label = 'Top-Rated Tours & Experiences',
  showHeadline = true,
  showButton = true,
  backgroundColor = '#F8EFE0',
  cardStyle = false
}: GetYourGuideToursProps) {
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

  if (cardStyle) {
    // Card style for inline placement on itinerary pages
    return (
      <div className="py-8 px-4">
        <div className="container">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {label}
            </h3>
            <div className="flex justify-center">
              <div 
                data-gyg-widget="auto" 
                data-gyg-partner-id="YOPATWV"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-16 md:py-24" style={{ backgroundColor }}>
      <div className="container mx-auto px-4 md:px-6">
        {showHeadline && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
              {label}
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              Hand-picked activities across Europe, Asia & Brazil — book instantly.
            </p>
          </div>
        )}

        {/* GetYourGuide Widget */}
        <div className="mb-8 flex justify-center">
          <div 
            data-gyg-widget="auto" 
            data-gyg-partner-id="YOPATWV"
            className="w-full max-w-4xl"
          />
        </div>

        {showButton && (
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
        )}
      </div>
    </section>
  );
}
