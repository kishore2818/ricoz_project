import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation for Favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #1d4ed8 0%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 900,
          borderRadius: 8,
          letterSpacing: -0.5,
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          fontFamily: 'sans-serif'
        }}
      >
        AP
      </div>
    ),
    {
      ...size,
    }
  );
}
