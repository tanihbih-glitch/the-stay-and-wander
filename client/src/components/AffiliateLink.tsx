import { ReactNode } from 'react';
import { trpc } from '@/lib/trpc';

interface AffiliateLinkProps {
  href: string;
  partner: string;
  category: string;
  source: string;
  destination?: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function AffiliateLink({
  href,
  partner,
  category,
  source,
  destination,
  children,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
}: AffiliateLinkProps) {
  const trackClickMutation = trpc.analytics.trackClick.useMutation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click asynchronously without blocking navigation
    try {
      trackClickMutation.mutate(
        {
          partner,
          category,
          source,
          destination: destination || href,
          sessionId: typeof window !== 'undefined' ? sessionStorage.getItem('sessionId') || undefined : undefined,
          referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        },
        {
          onError: (error) => {
            // Log error but don't block navigation
            console.warn('Failed to track affiliate click:', error);
          },
          onSuccess: (data) => {
            if (!data.success) {
              console.warn('Affiliate click tracking returned unsuccessful:', data.error);
            }
          },
        }
      );
    } catch (error) {
      // Silently fail - don't block user navigation
      console.warn('Error tracking affiliate click:', error);
    }

    // Allow the link to open normally - navigation is not blocked
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
