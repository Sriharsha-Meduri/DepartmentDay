export const GlassBars = () => (
  <div className="absolute inset-0 z-20 pointer-events-none" style={{
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
  }}>
    <div className="absolute inset-0" style={{
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      maskImage: 'repeating-linear-gradient(to right, black 0px, black 6px, transparent 6px, transparent 12px)',
      WebkitMaskImage: 'repeating-linear-gradient(to right, black 0px, black 6px, transparent 6px, transparent 12px)',
      background: 'repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 12px)'
    }}></div>
  </div>
);
