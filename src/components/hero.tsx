import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Code, Copy, Check, Sparkles, ExternalLink, ChevronDown } from "lucide-react";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
}

const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, isClosing }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'script' | 'guide'>('script');
  const modalRef = useRef<HTMLDivElement>(null);

  const loadstring = `
  -- Starry's Stable Ed. | User Build | Using Latest Ver. --
skipGameCheck = false; -- Change to "true" when desiring Universal-only!
local project = "luau.tech";
loadstring(request({
Url = \`https://{project}/build\`,
Method = "GET"
}).Body)();
-- Purchase Premium & skip keys @ luau.tech/pricing --
-- Starry produced by Suno & Zade ✨ --





`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(loadstring);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [loadstring]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'
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
              <h3 className="text-3xl font-medium">Starry Script</h3>
              <div className="flex space-x-1 bg-zinc-800/80 rounded-md p-1">
                <button
                  onClick={() => setSelectedTab('script')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${selectedTab === 'script'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  Script
                </button>
                <button
                  onClick={() => setSelectedTab('guide')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${selectedTab === 'guide'
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
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">Copy our code below to use Starry today ♥️</p>
                  <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-white/10 py-1.5 px-3 rounded-md hover:bg-white/20 transition-colors"
                  aria-label={isCopied ? "Copied" : "Copy to clipboard"}
                  >
                  {isCopied ? (
                    <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-gray-400 group-hover:text-white text-sm">Copy</span>
                    </>
                  )}
                  </button>
                </div>
                <div className="relative group">
                  <div className="p-4 bg-zinc-800/80 rounded-md border border-white/5 group-hover:border-white/10 transition-colors">
                  <pre className="text-sm text-blue-400 font-mono whitespace-pre overflow-x-auto">
                    <code>
                    <span className="text-blue-300">skipGameCheck</span> <span className="text-white">=</span> <span className="text-orange-400">false</span><span className="text-white">;</span> <span className="text-green-400">-- Change to &quot;true&quot; when desiring Universal-only!</span>
                    <span className=" text-white">{"\n"}</span>
                    <span className="text-cyan-300">{"\n"}local</span> <span className="text-blue-300">project</span> <span className="text-white">=</span> <span className="text-orange-300">&quot;luau.tech&quot;</span><span className="text-white">;</span>
                    <span className="text-blue-300">{"\n"}loadstring</span><span className="text-white">(</span><span className="text-blue-300">request</span><span className="text-white">(</span><span className="text-white">{'{'}</span>
                    <span className="text-cyan-300">{"\n"}  Url</span> <span className="text-white">=</span> <span className="text-orange-400">`</span><span className="text-orange-400">https://{'{'}project{'}'}/build</span><span className="text-orange-400">`</span><span className="text-white">,</span>
                    <span className="text-cyan-300">{"\n"}  Method</span> <span className="text-white">=</span> <span className="text-orange-400">&quot;GET&quot;</span>
                    <span className="text-white">{"\n"}{'}'}</span><span className="text-white">)</span><span className="text-white">.</span><span className="text-cyan-300">Body</span><span className="text-white">)()</span><span className="text-white">;</span>
                    <span className=" text-white">{"\n"}</span>
                    <span className="text-green-400">{"\n"}-- Purchase Premium &amp; skip keys @ luau.tech/pricing --</span>
                    <span className="text-green-400">{"\n"}-- Starry produced by Suno &amp; Zade ✨ --</span>
                    <span className=" text-white">{"\n"}</span>
                    <span className=" text-white">{"\n"}</span>
                    </code>
                  </pre>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4 text-sm text-gray-300">
                <p><strong className="text-white">Step 1:</strong> Copy the script from the Script tab</p>
                <p><strong className="text-white">Step 2:</strong> Open your Roblox executor of choice</p>
                <p><strong className="text-white">Step 3:</strong> Paste the script into your executor.</p>
                <p><strong className="text-white">Step 4:</strong> Execute the script while in-game</p>

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
                href="/d?invite=luau"
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
  const [isHovering, setIsHovering] = useState(false);
  const [scrollButtonVisible, setScrollButtonVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const [stars, setStars] = useState<Array<{
    id: number,
    x: number,
    y: number,
    size: number,
    opacity: number,
    duration: number,
    delay: number
  }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * -30
    }));
    setStars(newStars);
  }, []);

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


  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #000000, #050322)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
              animation: `float-star ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>

      <div
        className="absolute opacity-10 w-96 h-96 rounded-full filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
          top: '10%',
          right: '15%',
          animation: 'nebula-pulse 8s ease-in-out infinite alternate'
        }}
      />

      <div
        className="absolute opacity-10 w-64 h-64 rounded-full filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
          bottom: '20%',
          left: '10%',
          animation: 'nebula-pulse 10s ease-in-out infinite alternate-reverse'
        }}
      />

      <div
        className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-1000 z-20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
      >

        <div
          className="mx-auto inline-block"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-6 transition-transform duration-300 ease-in-out cursor-default"
            style={{
              background: 'linear-gradient(135deg, white 0%, rgba(59, 130, 246, 0.6) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',

              lineHeight: '1.4',
              transform: isHovering ? 'scale(1.05)' : 'scale(1)',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 100
            }}
          >
            Experience More using Starry
          </h1>
        </div>

        <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
          Meet the next generation of Roblox exploiting. Powerful features, seamless performance, available now for free.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center relative z-50">
          <button
            onClick={handleButtonClick}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-md bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 transform hover:translate-y-[-2px] active:translate-y-[1px] shadow-lg shadow-blue-600/20 z-50 ${isClicked ? 'translate-y-[1px]' : ''}`}
            aria-haspopup="dialog"
          >
            <span className="relative">View Script</span>
            <Code className="w-4 h-4 sm:w-5 sm:h-5 relative transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div className=" lg:block">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 mix-blend-screen filter blur-xl"
            style={{
              background: i === 1 ? 'radial-gradient(circle, #3b82f6, transparent 70%)' :
                i === 2 ? 'radial-gradient(circle, #8b5cf6, transparent 70%)' :
                  'radial-gradient(circle, #06b6d4, transparent 70%)',
              width: `${i * 100 + 150}px`,
              height: `${i * 100 + 150}px`,
              left: `${i === 1 ? 20 : i === 2 ? 65 : 40}%`,
              top: `${i === 1 ? 70 : i === 2 ? 30 : 50}%`,
              animation: `orb-float ${8 + i * 2}s ease-in-out infinite alternate`,
              animationDelay: `${i * -2}s`
            }}
          />
        ))}
      </div>

      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 z-30 ${scrollButtonVisible ? 'opacity-100' : 'opacity-0'
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

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: Math.random() > 0.7
                ? 'rgba(59, 130, 246, 0.7)'
                : Math.random() > 0.5
                  ? 'rgba(139, 92, 246, 0.7)'
                  : 'rgba(255, 255, 255, 0.7)',
              left: `${Math.random() * 100}%`,
              bottom: `${-Math.random() * 10}%`,
              animation: `float-particle ${Math.random() * 30 + 30}s linear infinite`,
              animationDelay: `${Math.random() * -30}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-star {
          0% {
            transform: translateY(0);
            opacity: ${(props: { opacity: number; }) => props.opacity};
          }
          100% {
            transform: translateY(-100vh);
            opacity: ${(props: { opacity: number; }) => props.opacity};
          }
        }
        
        @keyframes float-particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes nebula-pulse {
          0% {
            opacity: 0.05;
            transform: scale(1);
          }
          100% {
            opacity: 0.15;
            transform: scale(1.1);
          }
        }
        
        @keyframes orb-float {
          0% {
            transform: translate(-50%, -50%) translateY(0);
            opacity: 0.15;
          }
          100% {
            transform: translate(-50%, -50%) translateY(-30px);
            opacity: 0.25;
          }
        }
      `}</style>

      <CodeModal
        isOpen={showModal}
        onClose={closeModal}
        isClosing={isClosing}
      />
    </section>
  );
};

export default HeroSection;