'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { NavigationButtons } from '@/app/error/navigation-buttons';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';
import { Search, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage() {
  const errorCode = '404';
  const errorMessage = 'Page Not Found';
  const [searchQuery, setSearchQuery] = useState('');
  const [didYouMean, setDidYouMean] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [catFact, setCatFact] = useState('Cats always land on their feet due to their "righting reflex" - just like how we\'ll help you find your way back!');
  
  // Array of cat facts to cycle through
  const catFacts = [
    'Cats always land on their feet due to their "righting reflex" - just like how we\'ll help you find your way back!',
    'Cats sleep for about 70% of their lives - but our servers are always awake!',
    'A house cat could beat Usain Bolt in a race, reaching speeds up to 30mph - faster than this page loaded!',
    'Cats can make over 100 vocal sounds, while humans can only make about 10 - including "Oops" when hitting a 404 page.',
    'A cat\'s brain is more similar to a human\'s brain than a dog\'s brain - they\'re smart enough to avoid 404 pages!'
  ];
  
  // Simulate search functionality
  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
  
      const suggestions = [
        { query: 'premium', suggestion: '/premium' },
        { query: 'license', suggestion: '/key' },
        { query: 'key', suggestion: '/key' },
        { query: 'home', suggestion: '/' },
        { query: 'discord', suggestion: '/d' },
        { query: 'support', suggestion: '/d?invite=luau' },
        { query: 'server', suggestion: '/d?invite=luau' },
        { query: 'contact', suggestion: '/d?invite=luau' },
        { query: 'about', suggestion: '/about' },
        { query: 'privacy', suggestion: '/security#privacy-policy' },
        { query: 'terms', suggestion: '/security#terms-of-service' },
        { query: 'tos', suggestion: '/security#terms-of-service' },
       
      ];
      
      const match = suggestions.find(s => searchQuery.toLowerCase().includes(s.query));
      setDidYouMean(match ? match.suggestion : '/');
      setIsSearching(false);
    }, 800);
  };
  
  // Cycle through cat facts every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
      setCatFact(randomFact);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(37,38,44,0.2),transparent_40%)] pointer-events-none"></div>
      
      <LoadingScreen onComplete={() => {
        console.log(`
 ________   _________   ________   ________   ________
                                                                         
      ______                            
     / _____)_                          
    ( (_____| |_ _____  ____  ____ 
    \____ (_   |___ |/ ___) ___)| | | |
     _____) )| |_/ ___ | |  | |   | |_| |
    (______/  \__)_____|_|  |_|    \__  |
                                  (____/
    discord.gg/luau | @Starry | luau.tech
 ________   _________   ________   ________   ________
 Please note that this is a work in progress, report any bugs or issues to the discord server.
`);
      }}/>
      
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center shadow-lg transition-all duration-300 hover:border-white/20 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Cat image - smaller on mobile, side by side on larger screens */}
              <div className="w-48 h-48 mx-auto md:mx-0 mb-4 md:mb-0 rounded-lg overflow-hidden bg-zinc-800/50 group relative transition-transform duration-300 hover:scale-105 cursor-pointer">
                <Image
                  src="/images/404.jpg"
                  alt="404 Cat"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Error info and search */}
              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-2 text-white animate-pulse">{errorCode}</h1>
                <h2 className="text-xl font-medium mb-2 text-white">{errorMessage}</h2>
                <p className="text-gray-400 mb-4 text-sm">Looks like this page got lost in space...</p>
                
                {/* Navigation buttons */}
                <NavigationButtons />
                
                {/* Search functionality */}
                <div className="mt-4">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Looking for something?"
                      className="flex-grow px-3 py-1 text-sm bg-zinc-800/70 border border-white/10 rounded-l-md text-white focus:outline-none focus:border-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-r-md transition-colors duration-200"
                      disabled={isSearching}
                    >
                      {isSearching ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    </button>
                  </form>
                  
                  {didYouMean && (
                    <div className="mt-2 text-xs">
                      <span className="text-gray-400">Did you mean: </span>
                      <Link href={didYouMean} className="text-blue-400 hover:text-blue-300 underline">
                        {didYouMean}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bottom sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Last visited pages */}
              <div className="p-3 bg-zinc-800/30 rounded-lg">
                <h3 className="text-xs font-medium text-gray-300 mb-2">Recent pages you visited:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link 
                    href="/"
                    className="px-3 py-1 bg-zinc-700/50 hover:bg-zinc-600/50 rounded-full text-xs text-gray-300 flex items-center transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3 mr-1" /> /home
                  </Link>
                </div>
              </div>
              
              {/* Cat fact */}
              <div className="p-3 bg-zinc-800/30 rounded-lg">
                <p className="text-xs text-gray-400 transition-opacity duration-300">
                  <span className="font-medium text-gray-300">Did you know? </span>
                  {catFact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}