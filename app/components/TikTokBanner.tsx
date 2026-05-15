import {useState, useEffect} from 'react';

export function TikTokBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isTikTok = /BytedanceWebview|ByteLocale|musical_ly/i.test(ua);
    if (isTikTok) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '20px 24px 32px',
        background: 'linear-gradient(to top, #0a0a0a 80%, transparent)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: 14,
          right: 18,
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.35)',
          fontSize: 20,
          lineHeight: 1,
          cursor: 'pointer',
          padding: 4,
        }}
        aria-label="Dismiss"
      >
        ×
      </button>

      <div style={{display: 'flex', alignItems: 'flex-start', gap: 14}}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 18,
        }}>
          🌐
        </div>

        <div>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'rgba(255,255,255,0.75)',
            marginBottom: 4,
            letterSpacing: '0.02em',
          }}>
            You&rsquo;re in TikTok&rsquo;s browser
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.5,
            marginBottom: 14,
          }}>
            For the full experience — including video previews and smooth checkout — open this in Safari or Chrome. Tap <strong style={{color: 'rgba(255,255,255,0.5)'}}>···</strong> then <strong style={{color: 'rgba(255,255,255,0.5)'}}>Open in browser</strong>.
          </p>

          <button
            onClick={() => setVisible(false)}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.3)',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 6,
              padding: '6px 14px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
