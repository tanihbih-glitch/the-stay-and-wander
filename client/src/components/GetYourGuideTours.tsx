import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

type GetYourGuideWindow = Window & {
  gygWidget?: {
    render?: () => void;
  };
};

const PARTNER_ID = 'YOPATWV';
export const GYG_PARTNER_ID = PARTNER_ID;
const GYG_SCRIPT_SELECTOR = `script[data-gyg-partner-id="${GYG_PARTNER_ID}"]`;

interface GetYourGuideToursProps {
  label?: string;
  showHeadline?: boolean;
  showButton?: boolean;
  backgroundColor?: string;
  cardStyle?: boolean;
  fallbackHref?: string;
  fallbackLabel?: string;
}

export default function GetYourGuideTours({ 
  label = 'Top-Rated Tours & Experiences',
  showHeadline = true,
  showButton = true,
  backgroundColor = '#F8EFE0',
  cardStyle = false,
  fallbackHref,
  fallbackLabel = 'Browse tours'
}: GetYourGuideToursProps) {
  useEffect(() => {
    const win = window as GetYourGuideWindow;
    const renderWidget = () => win.gygWidget?.render?.();
    const existingScript = document.querySelector<HTMLScriptElement>(GYG_SCRIPT_SELECTOR);

    if (win.gygWidget) {
      renderWidget();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener('load', renderWidget, { once: true });
      return () => existingScript.removeEventListener('load', renderWidget);
    }

    const script = document.createElement('script');
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
    script.async = true;
    script.defer = true;
    script.dataset.gygPartnerId = GYG_PARTNER_ID;
    script.addEventListener('load', renderWidget, { once: true });
    document.head.appendChild(script);

    return () => script.removeEventListener('load', renderWidget);
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
                data-gyg-partner-id={GYG_PARTNER_ID}
                className="w-full"
              />
            </div>
            {fallbackHref && (
              <div className="mt-5 flex justify-center">
                <a
                  href={fallbackHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-[#0077B6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005c91]"
                >
                  {fallbackLabel}
                </a>
              </div>
            )}
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
              Hand-picked activities across Europe, Asia, Brazil &amp; the Middle East — book instantly.
            </p>
          </div>
        )}

        {/* GetYourGuide Widget */}
        <div className="mb-8 flex justify-center">
          <div 
            data-gyg-widget="auto" 
            data-gyg-partner-id={GYG_PARTNER_ID}
            className="w-full max-w-4xl"
          />
        </div>

        {fallbackHref && (
          <div className="mb-8 flex justify-center">
            <a
              href={fallbackHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-[#0077B6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005c91]"
            >
              {fallbackLabel}
            </a>
          </div>
        )}

        {showButton && (
          <div className="flex justify-center">
            <a
              href={`https://www.getyourguide.com/?partner_id=${GYG_PARTNER_ID}`}
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
