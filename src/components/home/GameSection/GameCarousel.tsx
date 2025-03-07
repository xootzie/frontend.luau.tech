'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
      <div className="mb-12">
        <h2 className="text-4xl font-medium mb-4">Our Games ✨</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 max-w-2xl">
            Learn our ever-expanding library of games, and the features that follow
          </p>
          <div className="flex items-center gap-2 ml-4">
            <button 
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 transition-all duration-200 flex items-center justify-center group"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 transition-all duration-200 flex items-center justify-center group"
            >
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
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
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4
            ${isModalClosing ? 'animate-fade-out' : 'animate-fade-in'}
          `}
          onClick={handleCloseModal}
        >
          <div 
            className={`bg-zinc-900 rounded-xl border border-white/10 w-full max-w-4xl max-h-[85vh] overflow-hidden
              ${isModalClosing ? 'animate-slide-down' : 'animate-slide-up'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(${selectedGame.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className={`text-sm text-${selectedGame.statusColor}-500 mb-2 flex items-center gap-2`}>
                  <span className={`w-2 h-2 rounded-full bg-${selectedGame.statusColor}-500 animate-pulse`} />
                  {selectedGame.status}
                </p>
                <h3 className="text-2xl font-medium bold">{selectedGame.title}</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 hover:bg-zinc-800/80 rounded-lg transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[40vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedGame.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 animate-pulse" />
                    <span className="-mt-0.5 text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <a 
                href={selectedGame.url}
                target="_blank"
                className="px-6 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors flex items-center gap-2"
              >
                View Game
              </a>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GameCarousel;