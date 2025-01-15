import React, { useState, useEffect } from 'react';

const GridBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.pageX,
        y: event.pageY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 min-h-screen w-full -z-10">
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(100 116 139 / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(100 116 139 / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute inset-0 bg-blue-500/30 transition-opacity duration-500 ease-in-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(59 130 246 / 0.2) 0%, transparent 4%)`,
        }}
      />
    </div>
  );
};

export default GridBackground;