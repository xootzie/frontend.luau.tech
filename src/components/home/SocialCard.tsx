'use client';

import { Globe, ArrowUpRight, Github } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { SocialData } from '@/types/SocialData';

const SocialCard = ({ title, description, icon, link, glowColor }: SocialData) => {
  
  const renderIcon = () => {
    switch (icon) {
      case 'Github':
        return <Github className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'FaDiscord':
        return <FaDiscord className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden backdrop-blur-sm shadow-xl"
      style={{ 
        boxShadow: `0 0 80px ${glowColor}`,
      }}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-lg bg-zinc-800">
            {renderIcon()}
          </div>
          <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
    </a>
  );
};

export default SocialCard;