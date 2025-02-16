import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Code, Copy, Check, Sparkles } from "lucide-react";

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / -100;
    const moveY = (clientY - window.innerHeight / 2) / -100;
    setMousePosition({ x: moveX, y: moveY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-96 h-96 rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.${i + 1}) 0%, rgba(59, 130, 246, 0) 70%)`,
            transform: `translate3d(${mousePosition.x * (i + 1) * 2}px, ${mousePosition.y * (i + 1) * 2}px, 0)`,
            left: `${[15, 65, 85][i]}%`,
            top: `${[25, 15, 65][i]}%`,
            transition: 'transform 0.5s ease-out',
            filter: 'blur(40px)',
          }}
        />
      ))}
    </div>
  );
};

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, isClosing }) => {
  const [isCopied, setIsCopied] = useState(false);
  
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
        className={`relative bg-zinc-900/95 border border-white/10 rounded-lg w-full max-w-lg 
          backdrop-blur-xl transform transition-all duration-200 
          ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-t-lg" />
          
          <div className="relative">
            <h3 className="text-xl font-medium mb-2">Raw Code</h3>
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
            
            <div className="mt-6 flex justify-end">
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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      <FloatingElements />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.05),rgba(0,0,0,0))]" />
      
      <div
        className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/30 border border-white/5 mb-8 hover:border-white/10 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs text-gray-400 font-medium">Key System & Premium Released</span>
        </div>
        
        <h1 
          ref={titleRef}
          onMouseMove={handleTitleHover}
          className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-6 
            hover:scale-[1.02] transition-all duration-500 ease-in-out"
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
              transform hover:translate-y-[-2px] active:translate-y-[1px] 
              ${isClicked ? 'translate-y-[1px]' : ''}`}
            aria-haspopup="dialog"
          >
            <span className="relative">View Script</span>
            <Code className="w-4 h-4 sm:w-5 sm:h-5 relative transition-transform group-hover:translate-x-1" />
          </button>
        </div>
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