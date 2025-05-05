'use client';

import { GameData } from "@/types/GameData";
import { ArrowUpRight, Star } from "lucide-react";

interface GameCardProps extends GameData {
  onShowFeatures: () => void;
}

const PremiumBadge = ({ message }: { message: string }) => (
  <div className="group relative">
    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#fb97c6] to-[#d671a0] text-white backdrop-blur-sm text-xs font-semibold cursor-help shadow-lg flex items-center gap-1.5">
      <Star className="w-3 h-3" fill="white" />
      Premium
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 right-0 px-3 py-2 rounded-lg bg-black/95 backdrop-blur-sm text-white text-xs whitespace-nowrap border border-[#fb97c6]/20">
        {message}
      </div>
    </div>
  </div>
);

const PremiumFeaturesBadge = ({ message }: { message: string }) => (
  <div className="group relative">
    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/90 backdrop-blur-sm text-xs font-semibold border border-[#fb97c6]/50 text-[#fb97c6] cursor-help shadow-lg flex items-center gap-1.5">
      <Star className="w-3 h-3" fill="#fb97c6" />
      Premium Features
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 right-0 px-3 py-2 rounded-lg bg-black/95 backdrop-blur-sm text-white text-xs whitespace-nowrap border border-[#fb97c6]/20">
        {message}
      </div>
    </div>
  </div>
);

const GameCard = ({ 
  image, 
  title, 
  status, 
  statusColor, 
  url, 
  isPremium,
  hasPremiumFeatures,
  onShowFeatures 
}: GameCardProps) => (
  <div className="min-w-[385px] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 rounded-xl p-6 border border-[#fb97c6]/10 snap-start hover:border-[#fb97c6]/30 transition-all duration-300 group backdrop-blur-sm shadow-xl hover:shadow-[#fb97c6]/5 hover:shadow-lg">
    <div 
      className="relative h-48 rounded-lg mb-6 bg-cover bg-center transform group-hover:scale-[1.02] transition-all duration-300 shadow-lg overflow-hidden" 
      style={{ backgroundImage: `url(${image})` }} 
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {isPremium && <PremiumBadge message="Included in your Starlight premium subscription" />}
      {!isPremium && hasPremiumFeatures && <PremiumFeaturesBadge message="Some features require your Starlight premium subscription" />}
    </div>
    <p className={`text-sm mb-3 flex items-center gap-2 ${statusColor === 'green' ? 'text-[#fb97c6]' : 'text-[#fb97c6]'}`}>
      <span className={`w-2 h-2 rounded-full ${statusColor === 'green' ? 'bg-[#fb97c6]' : 'bg-[#fb97c6]'} animate-pulse`} />
      {status}
    </p>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-white/90">{title}</h3>
      <div className="flex items-center gap-2">
        <button 
          onClick={onShowFeatures}
          className="px-4 py-2 rounded-lg bg-[#fb97c6]/10 hover:bg-[#fb97c6]/20 transition-colors text-sm font-medium text-[#fb97c6]"
        >
          Features
        </button>
        <a 
          href={url} 
          target="_blank" 
          className="p-2 rounded-lg bg-[#fb97c6]/10 hover:bg-[#fb97c6]/20 transition-colors text-[#fb97c6]"
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

export default GameCard;