
import { useState, useEffect, useRef } from 'react';
import { Code, Copy, Check } from "lucide-react";

interface MousePosition {
  x: number;
  y: number;
}

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / -50;
      const moveY = (clientY - window.innerHeight / 2) / -50;
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.${i + 1}) 0%, rgba(59, 130, 246, 0) 70%)`,
            transform: `translate3d(${mousePosition.x * (i + 1)}px, ${mousePosition.y * (i + 1)}px, 0)`,
            left: `${[20, 60, 80][i]}%`,
            top: `${[30, 10, 60][i]}%`,
            transition: 'transform 0.2s ease-out',
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [textHoverPosition,] = useState<MousePosition>({ x: 0, y: 0 });
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const loadstring = `getgenv().ignoreGameCheck = false
loadstring(game:HttpGet("https://luau.tech/build"))()`;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleButtonClick = () => {
    setIsClicked(true);
    setShowModal(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(loadstring);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 200);
  };

  const handleTextHover = () => {
    if (textRef.current) {
      // const rect = textRef.current.getBoundingClientRect();
      
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-black/20">
        <FloatingElements />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),rgba(0,0,0,0))]" />
        
        <div
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/10 mb-8 hover:border-white/20 transition-colors">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-400">New Website Release</span>
          </div> */}
          
          <h1 
            ref={textRef}
            onMouseMove={handleTextHover}
            className="text-6xl sm:text-7xl font-medium tracking-tight text-white mb-6 
            hover:scale-[1.05] transition-all duration-300 ease-in-out"
            style={{
              background: `radial-gradient(circle at ${textHoverPosition.x}px ${textHoverPosition.y}px, 
                rgba(255,255,255,0.3), 
                transparent 50%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              backgroundImage: 'linear-gradient(to bottom, white, rgba(255,255,255,0.6))'
            }}
          >
            Experience More using Starry
          </h1>
          
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Meet the next generation of Roblox exploiting. Powerful features, seamless performance, available now for free.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button 
              onClick={handleButtonClick}
              className={`relative px-8 py-3 rounded-full bg-blue-600 text-white text-lg font-medium 
                hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 
                transform hover:scale-110 active:scale-95 
                ${isClicked ? 'scale-95' : ''}`}
            >
              <span className="-mt-1 relative">View Script</span>
              <Code className="w-5 h-5 relative transition-transform group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={handleScrollToFeatures}
              className="px-8 py-3 rounded-full text-lg text-gray-400 hover:text-white transition-colors group flex items-center gap-2 hover:bg-white/5"
            >
              Learn More
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
            isClosing ? 'animate-fade-out' : 'animate-fade-in'
          }`}
        >
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          <div 
            className={`relative bg-zinc-900/90 border border-white/10 rounded-xl w-full max-w-lg 
              backdrop-blur-xl transform transition-all duration-200 
              ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-t-xl" />
              
              <div className="relative">
                <h3 className="text-xl font-medium mb-2">Raw Code</h3>
                <p className="text-gray-400 text-sm mb-4">Copy our code below to use Starry today ♥️</p>
                
                <div className="relative group">
                  <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                    <pre className="text-sm text-blue-400 font-mono whitespace-pre overflow-x-auto">
                    <code>
  <span className="text-purple-400">getgenv</span>()<span className="text-gray-400">.</span><span className="text-blue-300">ignoreGameCheck</span> <span className="text-gray-400">=</span> <span className="text-red-400">false</span>
  <span className="text-purple-400">{"\n"}loadstring</span>(<span className="text-blue-300">game</span><span className="text-gray-400">:</span><span className="text-yellow-400">HttpGet</span>(<span className="text-green-400">&quot;https://luau.tech/build&quot;</span>))()
</code>
                    </pre>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className="absolute right-2 top-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
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
                    onClick={closeModal}
                    className="-mt-1 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;