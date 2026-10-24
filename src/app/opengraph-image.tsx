import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Petrol Price Today in Pakistan - Official OGRA Verified Rates';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px 80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 900,
              color: 'white',
            }}
          >
            PK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.5px' }}>
              Petrol Price Pakistan
            </span>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
              Official Consumer Rates
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '18px',
              fontWeight: 700,
              color: '#6ee7b7',
              width: 'fit-content',
            }}
          >
            ● Official OGRA &amp; Ministry of Energy Rates
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>
            Live Petrol &amp; Fuel Prices in Pakistan
          </h1>
          <p style={{ fontSize: '24px', color: '#cbd5e1', margin: 0 }}>
            Fortnightly notified rates, fuel fill-up calculators, and historical price archive.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#94a3b8',
          }}
        >
          <span>petrolpricepakistan.pk</span>
          <span>Zero-Tolerance for Unverified Rumors</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
