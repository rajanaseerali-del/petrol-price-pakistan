import React from 'react';

interface AdPlacementProps {
  slotId?: string;
  format?: 'banner' | 'rectangle' | 'leaderboard';
  className?: string;
}

/**
 * AdSense-ready Reusable Component
 * In compliance with Google AdSense best practices:
 * - Disabled by default until the publisher configures their official client ID via NEXT_PUBLIC_ADSENSE_CLIENT_ID
 * - Pre-allocated min-height to prevent Cumulative Layout Shift (CLS)
 * - Distinct, honest label so users know it is reserved for advertising without deceptive elements
 */
export function AdPlacement({ slotId, format = 'rectangle', className = '' }: AdPlacementProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!isEnabled || !clientId) {
    return (
      <div
        className={`my-6 mx-auto border border-dashed border-slate-200 bg-slate-50/50 rounded-xl flex flex-col items-center justify-center p-4 text-center transition ${className}`}
        style={{
          minHeight: format === 'leaderboard' ? '90px' : format === 'banner' ? '100px' : '250px',
          maxWidth: format === 'leaderboard' ? '728px' : '100%',
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Advertisement Placement
        </span>
        <span className="text-xs text-slate-400 mt-1">
          AdSense placeholder — automatically enabled when publisher credentials are configured.
        </span>
      </div>
    );
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
