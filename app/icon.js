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
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2DD4BF 0%, #06B6D4 50%, #6366F1 100%)',
          borderRadius: 8,
          padding: 2,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#0A0E1A',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 32 32"
            width="22"
            height="22"
            fill="none"
          >
            <path
              d="M16 4L6 22C5.5 23 6.2 24.2 7.3 24.2H12.5L16 17.5L13.5 10L16 4Z"
              fill="#2DD4BF"
            />
            <path
              d="M16 4L26 22C26.5 23 25.8 24.2 24.7 24.2H19.5L16 17.5L18.5 10L16 4Z"
              fill="#06B6D4"
            />
            <polygon
              points="16,8 19.5,15 16,22 12.5,15"
              fill="#6366F1"
            />
            <path
              d="M16 9L18.5 14H13.5L16 9Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
