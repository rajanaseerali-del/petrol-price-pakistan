import React from 'react';

interface AdPlacementProps {
  slotId?: string;
  format?: 'banner' | 'rectangle' | 'leaderboard';
  className?: string;
}

/**
 * AdSense-ready Reusable Component
 * - Returns null when AdSense is not configured, completely eliminating any visible placeholder on the front end
 * - Only renders the Google AdSense container when publisher credentials and approval are active
 */
export function AdPlacement({ slotId, format = 'rectangle', className = '' }: AdPlacementProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!isEnabled || !clientId) {
    return null;
  }

  return (
    <div
      className={`my-6 mx-auto text-center overflow-hidden ${className}`}
      style={{
        minHeight: format === 'leaderboard' ? '90px' : format === 'banner' ? '100px' : '250px',
      }}
    >
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slotId || '1234567890'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
