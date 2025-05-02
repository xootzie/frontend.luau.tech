import React, { useState, useEffect, useRef } from 'react';

const GridBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetPosition.current = {
        x: event.pageX,
        y: event.pageY
      };
    };

    const animate = () => {
      setMousePosition(current => ({
        x: current.x + (targetPosition.current.x - current.x) * 0.1,
        y: current.y + (targetPosition.current.y - current.y) * 0.1
      }));
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      

      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
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
          maskImage: `
            linear-gradient(to right, transparent, black 10%, black 90%, transparent),
            linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)
          `,
          maskComposite: 'intersect',
          WebkitMaskImage: `
            linear-gradient(to right, transparent, black 30%, black 90%, transparent),
            linear-gradient(to bottom, transparent, black 30%, black 90%, transparent)
          `,
          WebkitMaskComposite: 'source-in'
        }}
      />
      <div
        className="absolute inset-0 bg-blue-500/30 transition-opacity duration-500 ease-in-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(59 130 246 / 0.2) 0%, transparent 0%)`,
        }}
      />
    </div>
  );
};

export default GridBackground;