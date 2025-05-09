import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Code, Copy, Check, Sparkles, ExternalLink, Star, Shield, Zap, Lock } from "lucide-react";

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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        tabIndex={-1}
        className={`relative bg-black/70 border border-[#fb97c6]/30 rounded-2xl w-full max-w-lg overflow-hidden
          backdrop-blur-xl transform transition-all duration-300 shadow-2xl
          ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#fb97c6]/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-[#fb97c6]/5 blur-3xl"></div>
        </div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#fb97c6] to-[#d671a0] flex items-center justify-center">
                <Star className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#fb97c6]/80">Starlight Script</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="text-xs px-2 py-0.5 rounded-full bg-[#fb97c6]/20 text-[#fb97c6]">Premium</div>
                  <div className="text-xs text-gray-400">$4.99/month</div>
                </div>
              </div>
            </div>
            
            <div className="flex bg-black/50 rounded-xl p-1 border border-white/10">
              <button 
                onClick={() => setSelectedTab('script')}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  selectedTab === 'script' 
                    ? 'bg-[#fb97c6] text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Script
              </button>
              <button 
                onClick={() => setSelectedTab('guide')}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  selectedTab === 'guide' 
                    ? 'bg-[#fb97c6] text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Guide
              </button>
            </div>
          </div>
          
          {selectedTab === 'script' ? (
            <>
              <p className="text-gray-400 text-sm mb-5">Activate your subscription using your license key! ♥️</p>
              
              <div className="relative group">
                <div className="p-5 bg-black/50 rounded-xl border border-[#fb97c6]/20 group-hover:border-[#fb97c6]/40 transition-all duration-300">
                  <pre className="text-sm font-mono whitespace-pre overflow-x-auto">
                  <code>
                  <span className="text-[#ffc1df]">skipGameCheck</span> <span className="text-gray-400">=</span> <span className="text-red-400">false;</span>
                  <span className="text-purple-400">{"\n"}loadstring</span>(<span className="text-[#ffc1df]">game</span><span className="text-gray-400">:</span><span className="text-yellow-400">HttpGet</span>(<span className="text-green-400">&quot;https://luau.tech/build&quot;</span>))()
                  </code>
                  </pre>
                </div>
                
                <button
                  onClick={handleCopy}
                  className="absolute right-3 top-3 p-2 rounded-lg bg-black/30 hover:bg-[#fb97c6]/20 transition-all duration-300"
                  aria-label={isCopied ? "Copied" : "Copy to clipboard"}
                >
                  {isCopied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-[#fb97c6]" />
                  )}
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-[#fb97c6]/10 border border-[#fb97c6]/20 rounded-lg">
                <p className="text-xs text-gray-300">
                  Note: This script requires an active Starlight subscription ($4.99/month). 
                  Visit our site to purchase if you haven&apos;t already.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-5 text-sm">
              <div className="flex gap-4 p-4 bg-black/30 rounded-xl border border-white/5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#fb97c6]/20 flex items-center justify-center text-[#fb97c6]">1</div>
                <div>
                  <h4 className="font-medium text-white mb-1">Purchase subscription</h4>
                  <p className="text-gray-400">Get your Starlight premium access for only $4.99/month</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-black/30 rounded-xl border border-white/5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#fb97c6]/20 flex items-center justify-center text-[#fb97c6]">2</div>
                <div>
                  <h4 className="font-medium text-white mb-1">Copy the script</h4>
                  <p className="text-gray-400">Switch to the Script tab and copy the provided code</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-black/30 rounded-xl border border-white/5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#fb97c6]/20 flex items-center justify-center text-[#fb97c6]">3</div>
                <div>
                  <h4 className="font-medium text-white mb-1">Execute in-game</h4>
                  <p className="text-gray-400">Paste the script and run it while in-game</p>
                </div>
              </div>
              
              <div className="p-4 bg-[#fb97c6]/10 border border-[#fb97c6]/30 rounded-xl">
                <p className="text-white flex items-start gap-2">
                  <span className="mt-1"><Sparkles className="w-4 h-4 text-[#fb97c6]" /></span>
                  <span>Need help with your subscription? Join our Discord for support!</span>
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            <a
              href="/pricing?product=starlight"
              className="px-5 py-3 rounded-xl bg-[#fb97c6]/10 text-[#fb97c6] hover:bg-[#fb97c6]/20 transition-all duration-300 text-sm font-medium flex items-center gap-2 border border-[#fb97c6]/20"
            >
              <ExternalLink className="w-4 h-4" />
              Purchase
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-sm font-medium border border-white/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  
  // For the star field effect
  const starsRef = useRef<HTMLDivElement>(null);
  
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
    }, 300);
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
        setScrollIndicatorVisible(false);
      } else {
        setScrollIndicatorVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!starsRef.current) return;
      
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      const moveFactor = 25; // How much the stars move
      
      starsRef.current.style.transform = `translate(${mouseX * -moveFactor}px, ${mouseY * -moveFactor}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-[#150015] to-[#1c0023] z-0"
      />
      
      {/* Star field */}
      <div 
        ref={starsRef}
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
      >
       
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.8)`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full opacity-20 bg-[#fb97c6]/40 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full opacity-15 bg-[#d671a0]/30 blur-[100px]" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 py-20">
       
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
        
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#fb97c6]/10 border border-[#fb97c6]/20 text-[#fb97c6] text-sm">
            <Star className="w-3.5 h-3.5 mr-2" fill="#fb97c6" />
            <span>Starlight Released!</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="block">Elevate Your</span>
            <span className="bg-gradient-to-r from-white via-[#fb97c6] to-[#d671a0] bg-clip-text text-transparent">Exploiting Experience</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-xl">
            The next evolution in Roblox enhancement. Powerful premium features with stunning performance, available for just $4.99/month.
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-2 bg-[#fb97c6]/10 rounded-xl p-4 border border-[#fb97c6]/20 max-w-md">
            <div className="p-2 rounded-lg bg-[#fb97c6]/20">
              <Sparkles className="w-6 h-6 text-[#fb97c6]" />
            </div>
            <div className="text-left">
              <div className="text-xl font-bold text-white flex items-center">
                $4.99 <span className="text-gray-400 text-sm font-normal ml-1">/month</span>
              </div>
              <div className="text-sm text-gray-300">Premium access to all features</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
            <button 
              onClick={handleButtonClick}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#fb97c6] px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-[#d671a0] focus:outline-none focus:ring-2 focus:ring-[#fb97c6]/70 focus:ring-offset-2 z-10"
            >
              <span className="relative flex items-center gap-2">
                Get Premium Script
                <Code className="w-5 h-5 transition-transform" />
              </span>
            </button>
            
            <a 
              href="/d?invite=luau" 
              className="inline-flex items-center justify-center rounded-xl bg-transparent px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-white/5 border border-white/20 hover:border-white/40 gap-2"
            >
              Join Discord
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
         
        </div>
        
        {/* Right side - 3D mockup/illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative max-w-lg">
           
            
            {/* Card with glow effect */}
            <div className="relative w-[320px] h-[480px] rounded-2xl bg-gradient-to-br from-[#fb97c6]/40 to-[#fc4caa]/20 p-1 backdrop-blur-xl shadow-2xl rotate-1 transform transition-all duration-500 hover:rotate-3 hover:scale-105">
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black/50">
                <div className="absolute inset-0 opacity-30">
                  {/* Grid pattern */}
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fb97c6 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>
                
                {/* Faint glow spots */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#fb97c6]/40 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#d671a0]/30 blur-3xl"></div>
                
                <div className="relative h-full flex flex-col p-6">
                  {/* Card content */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#fb97c6] to-[#d671a0] flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" fill="white" />
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white">Starlight</span>
                      <div className="text-xs text-[#fb97c6]">Premium Experience</div>
                    </div>
                  </div>
                  
                  {/* Price tag */}
                  <div className="bg-black/30 rounded-xl p-4 border border-[#fb97c6]/20 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Monthly cost</span>
                      <span className="text-2xl font-bold text-white">$4.99</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Billed monthly • Cancel anytime</div>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                    {/* Feature items */}
                    <div className="space-y-3">
                      {[
                        { icon: Shield, name: "Premium Features", desc: "Exclusive premium modules" },
                        { icon: Zap, name: "Fast Updates", desc: "Lightning fast updates" },
                        { icon: Star, name: "Fast Support", desc: "Dedicated assistance" },
                        { icon: Lock, name: "Secure Access", desc: "Always undetected" },
                        { icon: ExternalLink, name: "Exclusive Content", desc: "Access to popular games" },
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-md bg-[#fb97c6]/20 flex items-center justify-center mt-0.5">
                            <feature.icon className="w-4 h-4 text-[#fb97c6]" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{feature.name}</div>
                            <div className="text-xs text-gray-400">{feature.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    
                  </div>
                  
                   
                </div>
              </div>
              
              {/* Reflection effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-10" />
              </div>
            </div>
            
            {/* Floating elements around the card */}
            <div className="absolute -top-8 -left-8 w-16 h-16 rounded-xl bg-gradient-to-br from-[#fb97c6]/80 to-[#d671a0] p-0.5 shadow-lg rotate-12 animate-float-slow">
              <div className="bg-black/70 w-full h-full rounded-[inherit] flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            
            <div className="absolute -bottom-12 -right-10 w-24 h-24 rounded-lg bg-gradient-to-br from-[#fb97c6]/60 to-[#d671a0]/60 p-0.5 shadow-lg -rotate-6 animate-float-slow-reverse backdrop-blur-sm">
              <div className="bg-black/70 w-full h-full rounded-[inherit] flex flex-col items-center justify-center p-3">
                <span className="text-[#fb97c6] text-xs">User Rating</span>
                <div className="flex mt-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#fb97c6]" fill="#fb97c6" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-500 z-20 ${
          scrollIndicatorVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button 
          onClick={scrollDown}
          className="group flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Explore More</span>
          <div className="w-8 h-12 rounded-full border-2 border-[#fb97c6]/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#fb97c6] rounded-full animate-bounce"></div>
          </div>
        </button>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(12deg); }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 6s ease-in-out infinite;
        }
      `}</style>

      <CodeModal isOpen={showModal} onClose={closeModal} isClosing={isClosing} />
    </section>
  );
};

export default HeroSection;