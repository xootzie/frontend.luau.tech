import React from 'react';

const GridBackground = () => {
  return (
    <div className="absolute inset-0 min-h-screen w-full pointer-events-none -z-10" style={{ height: '100%' }}>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(100 116 139 / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(100 116 139 / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: `linear-gradient(
            90deg,
            transparent,
            black 35%,
            black 65%,
            transparent
          )`,
          WebkitMaskImage: `linear-gradient(
            90deg,
            transparent,
            black 35%,
            black 65%,
            transparent
          )`,
          opacity: 0.4
        }}
      />
    </div>
  );
};

export default GridBackground;