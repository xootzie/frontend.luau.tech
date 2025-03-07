'use client';

import { GameData } from "@/types/GameData";
import { ArrowUpRight } from "lucide-react";

interface GameCardProps extends GameData {
  onShowFeatures: () => void;
}

const PremiumBadge = ({ message }: { message: string }) => (
  <div className="group relative">
    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black backdrop-blur-sm text-xs font-semibold cursor-help shadow-lg">
      Premium
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 right-0 px-3 py-2 rounded-lg bg-black/95 backdrop-blur-sm text-white text-xs whitespace-nowrap border border-yellow-500/20">
        {message}
      </div>
    </div>
  </div>
);

const PremiumFeaturesBadge = ({ message }: { message: string }) => (
  <div className="group relative">
    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/90 backdrop-blur-sm text-xs font-semibold border border-yellow-500/50 text-yellow-400 cursor-help shadow-lg">
      Premium Features
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 right-0 px-3 py-2 rounded-lg bg-black/95 backdrop-blur-sm text-white text-xs whitespace-nowrap border border-yellow-500/20">
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
  <div className="min-w-[385px] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 rounded-xl p-6 border border-white/5 snap-start hover:border-white/20 transition-all duration-300 group backdrop-blur-sm shadow-xl">
    <div 
      className="relative h-48 rounded-lg mb-6 bg-cover bg-center transform group-hover:scale-[1.02] transition-all duration-300 shadow-lg overflow-hidden" 
      style={{ backgroundImage: `url(${image})` }} 
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {isPremium && <PremiumBadge message="This game requires a Premium license to use" />}
      {!isPremium && hasPremiumFeatures && <PremiumFeaturesBadge message="Some features for this require Premium" />}
    </div>
    <p className={`text-sm mb-3 flex items-center gap-2 ${statusColor === 'green' ? 'text-emerald-400' : 'text-blue-400'}`}>
      <span className={`w-2 h-2 rounded-full ${statusColor === 'green' ? 'bg-emerald-400' : 'bg-blue-400'} animate-pulse`} />
      {status}
    </p>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-white/90">{title}</h3>
      <div className="flex items-center gap-2">
        <button 
          onClick={onShowFeatures}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          Features
        </button>
        <a 
          href={url} 
          target="_blank" 
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

export default GameCard;