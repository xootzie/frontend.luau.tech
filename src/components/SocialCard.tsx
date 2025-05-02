import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

interface SocialCardProps {
  title: string;
  description: string;
  icon: IconType | LucideIcon;
  link: string;
  glowColor: string;
}

const SocialCard = ({ title, description, icon: Icon, link, glowColor }: SocialCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group overflow-hidden rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 bg-zinc-900/50"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`
            : '',
        }}
      />

      <div className="relative z-10">
        <Icon className="w-8 h-8 mb-4 transition-transform duration-500 group-hover:scale-110" />
        <h3 className="text-xl font-medium mb-2 transition-transform duration-500 group-hover:translate-y-[-0.25rem]">
          {title}
        </h3>
        <p className="text-sm text-white/80 transition-transform duration-500 group-hover:translate-y-[-0.25rem]">
          {description}
        </p>
      </div>
    </a>
  );
};

export default SocialCard;