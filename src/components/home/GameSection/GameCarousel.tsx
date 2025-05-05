'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Star, Sparkles } from 'lucide-react';
import { GameData } from '@/types/GameData';
import GameCard from './GameCard';

interface GameCarouselProps {
  games: GameData[];
}

const GameCarousel = ({ games }: GameCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = 416;
    
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      carouselRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setSelectedGame(null);
      setIsModalClosing(false);
    }, 200);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
       
        <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-white via-[#fb97c6] to-[#d671a0] bg-clip-text text-transparent">
          Supported Games
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 max-w-2xl">
            Explore our ever-expanding library of premium-supported games and their exclusive features
          </p>
          <div className="flex items-center gap-2 ml-4">
            <button 
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-[#fb97c6]/10 hover:bg-[#fb97c6]/20 border border-[#fb97c6]/20 transition-all duration-200 flex items-center justify-center group"
            >
              <ChevronLeft className="w-4 h-4 text-[#fb97c6] group-hover:text-white transition-colors" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-[#fb97c6]/10 hover:bg-[#fb97c6]/20 border border-[#fb97c6]/20 transition-all duration-200 flex items-center justify-center group"
            >
              <ChevronRight className="w-4 h-4 text-[#fb97c6] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={carouselRef}
          className="overflow-hidden flex gap-6 pb-4 snap-x scrollbar-hide"
        >
          {games.map((game, index) => (
            <GameCard 
              key={index} 
              {...game}
              onShowFeatures={() => setSelectedGame(game)}
            />
          ))}
        </div>
      </div>

      {selectedGame && (
        <div 
          className={`fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4
            ${isModalClosing ? 'animate-fade-out' : 'animate-fade-in'}
          `}
          onClick={handleCloseModal}
        >
          <div 
            className={`bg-black/70 rounded-xl border border-[#fb97c6]/30 w-full max-w-4xl max-h-[85vh] overflow-hidden backdrop-blur-xl shadow-2xl
              ${isModalClosing ? 'animate-slide-down' : 'animate-slide-up'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(${selectedGame.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Premium badge overlay */}
              {selectedGame.isPremium && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#fb97c6] to-[#d671a0] px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg flex items-center gap-1.5">
                  <Star className="w-3 h-3" fill="white" />
                  Premium
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-sm text-[#fb97c6] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#fb97c6] animate-pulse" />
                  {selectedGame.status}
                </p>
                <h3 className="text-2xl font-medium">{selectedGame.title}</h3>
                <p className="text-gray-400 text-sm">Starlight Premium - $4.99/month</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 hover:bg-[#fb97c6]/20 rounded-lg transition-colors backdrop-blur-sm text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[40vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedGame.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-[#fb97c6]/5 hover:bg-[#fb97c6]/10 transition-colors border border-[#fb97c6]/10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6] mt-2" />
                    <span className="-mt-0.5 text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-[#fb97c6]/20 flex justify-end gap-3">
              <a 
                href={selectedGame.url}
                target="_blank"
                className="px-6 py-2 rounded-lg bg-[#fb97c6]/10 hover:bg-[#fb97c6]/20 text-[#fb97c6] transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                View Game
              </a>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 rounded-lg bg-[#fb97c6] hover:bg-[#d671a0] text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Subscription note */}
      <div className="mt-12 p-4 rounded-xl border border-[#fb97c6]/20 bg-[#fb97c6]/5 text-center">
        <p className="text-sm flex items-center justify-center gap-2">
          <Star className="w-4 h-4 text-[#fb97c6]" />
          <span className="text-white">All games are included with your <span className="text-[#fb97c6]">$4.99/month</span> Starlight Premium subscription</span>
        </p>
      </div>
    </section>
  );
};

export default GameCarousel;