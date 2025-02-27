import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Code, Copy, Check, Sparkles, Download, ExternalLink, ChevronDown } from "lucide-react";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, isClosing }) => {

  const [isCopied, setIsCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'script' | 'guide'>('script');
  const modalRef = useRef<HTMLDivElement>(null);
  
  const loadstring = `skipGameCheck = false;
loadstring(game:HttpGet("https://luau.tech/build"))()`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(loadstring);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [loadstring]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus inside modal for accessibility
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        tabIndex={-1}
        className={`relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/10 rounded-lg w-full max-w-lg 
          backdrop-blur-sm transform transition-all duration-200 shadow-xl
          ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-t-lg" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Starry Script</h3>
              <div className="flex space-x-1 bg-zinc-800/80 rounded-md p-1">
                <button 
                  onClick={() => setSelectedTab('script')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedTab === 'script' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Script
                </button>
                <button 
                  onClick={() => setSelectedTab('guide')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedTab === 'guide' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Guide
                </button>
              </div>
            </div>
            
            {selectedTab === 'script' ? (
              <>
                <p className="text-gray-400 text-sm mb-4">Copy our code below to use Starry today ♥️</p>
                
                <div className="relative group">
                  <div className="p-4 bg-zinc-800/80 rounded-md border border-white/5 group-hover:border-white/10 transition-colors">
                    <pre className="text-sm text-blue-400 font-mono whitespace-pre overflow-x-auto">
                    <code>
                    <span className="text-blue-300">skipGameCheck</span> <span className="text-gray-400">=</span> <span className="text-red-400">false;</span>
                    <span className="text-purple-400">{"\n"}loadstring</span>(<span className="text-blue-300">game</span><span className="text-gray-400">:</span><span className="text-yellow-400">HttpGet</span>(<span className="text-green-400">&quot;https://luau.tech/build&quot;</span>))()
                    </code>
                    </pre>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className="absolute right-2 top-2 p-2 rounded-md hover:bg-white/10 transition-colors"
                    aria-label={isCopied ? "Copied" : "Copy to clipboard"}
                  >
                    {isCopied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4 text-sm text-gray-300">
                <p><strong className="text-white">Step 1:</strong> Copy the script from the Script tab.</p>
                <p><strong className="text-white">Step 2:</strong> Open your Roblox executor of choice.</p>
                <p><strong className="text-white">Step 3:</strong> Paste the script into your executor.</p>
                <p><strong className="text-white">Step 4:</strong> Execute the script while in-game.</p>
                <p><strong className="text-white">Tip:</strong> If you encounter any issues, try waiting until the game fully loads before executing.</p>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <p className="text-blue-300 flex items-start gap-2">
                    <span className="mt-1"><Sparkles className="w-4 h-4" /></span>
                    <span>Need help? Join our Discord community for support and updates!</span>
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-between">
              <a
                href="#discord"
                className="px-4 py-2 rounded-md bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Discord
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [isVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [textGradientPosition, setTextGradientPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollButtonVisible, setScrollButtonVisible] = useState(true);

  const handleButtonClick = useCallback(() => {
    setIsClicked(true);
    setShowModal(true);
    setTimeout(() => setIsClicked(false), 200);
  }, []);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 200);
  }, []);

  const handleTitleHover = useCallback((e: React.MouseEvent<HTMLHeadingElement>) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setTextGradientPosition({ x, y });
    }
  }, []);
  
  // Function to scroll down when button is clicked
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  // Hide scroll button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollButtonVisible(false);
      } else {
        setScrollButtonVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && titleRef.current) {
        setTextGradientPosition(prev => ({
          x: prev.x + (Math.random() * 2 - 1),
          y: prev.y + (Math.random() * 2 - 1)
        }));
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
     
        
        <h1 
          ref={titleRef}
          onMouseMove={handleTitleHover}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-6 
            hover:scale-[1.02] transition-all duration-500 ease-in-out cursor-default"
          style={{
            backgroundImage: `radial-gradient(circle at ${textGradientPosition.x}% ${textGradientPosition.y}%, 
              white 0%, rgba(59, 130, 246, 0.6) 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: '1.4'
          }}
        >
          Experience More using Starry
        </h1>
        
        <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
          Meet the next generation of Roblox exploiting. Powerful features, seamless performance, available now for free.
        </p>
        
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button 
            onClick={handleButtonClick}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-md bg-blue-600 text-white text-sm sm:text-base font-medium 
              hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 
              transform hover:translate-y-[-2px] active:translate-y-[1px] shadow-lg shadow-blue-600/20
              ${isClicked ? 'translate-y-[1px]' : ''}`}
            aria-haspopup="dialog"
          >
            <span className="relative">View Script</span>
            <Code className="w-4 h-4 sm:w-5 sm:h-5 relative transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
          <div className="p-5 rounded-lg bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-600/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Powerful Features</h3>
            <p className="text-sm text-gray-400">Advanced capabilities for seamless gameplay enhancement</p>
          </div>
          
          <div className="p-5 rounded-lg bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-600/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Easy to Use</h3>
            <p className="text-sm text-gray-400">Easily copy and paste the script into your executor</p>
          </div>
          
          <div className="p-5 rounded-lg bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-600/20 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Regular Updates</h3>
            <p className="text-sm text-gray-400">Constantly improving with new features</p>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Down Button */}
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 z-30 ${
          scrollButtonVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button 
          onClick={scrollDown}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center animate-bounce transition-all duration-300"
        >
          Scroll Down
          <ChevronDown className="ml-2 w-5 h-5" />
        </button>
      </div>

      <CodeModal 
        isOpen={showModal} 
        onClose={closeModal} 
        isClosing={isClosing} 
      />
    </section>
  );
};

export default HeroSection;