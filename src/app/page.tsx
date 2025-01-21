'use client';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';
import SocialCard from '@/components/SocialCard';
import HeroSection from '@/components/hero';
import { useRef, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Github, 

  ArrowUpRight, 
  Globe,
  X 
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";

interface GameCardProps {
  image: string;
  title: string;
  status: string;
  statusColor: string;
  url: string;
  features: string[];
}



const GameCard = ({ image, title, status, statusColor, url, onShowFeatures }: GameCardProps & { onShowFeatures: () => void }) => (
  <div className="min-w-[385px] bg-zinc-900/50 rounded-xl p-6 border border-white/10 snap-start hover:border-white/20 transition-all duration-300 group">
    <div 
      className="h-48 rounded-lg mb-6 bg-cover bg-center transform group-hover:scale-[1.02] transition-all duration-300" 
      style={{ backgroundImage: `url(${image})` }} 
    />
    <p className={`text-sm text-${statusColor}-500 mb-3 flex items-center gap-2`}>
      <span className={`w-2 h-2 rounded-full bg-${statusColor}-500 animate-pulse`} />
      {status}
    </p>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex items-center gap-2">
        <button 
          onClick={onShowFeatures}
          className="px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-sm"
        >
          Features
        </button>
        <a 
          href={url} 
          target="_blank" 
          className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

const ScreenshotGallery = () => (
  <section id="features-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-medium mb-4">Powerful Features in Action</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Take a look at what Starry can do in your favorite games
      </p>
    </div>
    <div className="space-y-16">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-2/3">
          <div className="relative group overflow-hidden rounded-xl">
            <div 
              className="w-full h-[250px] md:h-[300px] lg:h-[400px] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(/images/screenshots/temp_screenshot.png)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          </div>
        </div>
        <div className="w-full lg:w-1/3 space-y-4">
          <h3 className="text-2xl font-medium">Why Starry?</h3>
          <p className="text-gray-400">
            Elevate your gameplay with Starry✨ - the best script you will ever need, featuring premium features and constant updates supporting popular games like Doors, Murder Mystery 2, and many more. Join thousands of players experiencing features today!
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Multi-Game support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Frequent Updates
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Quick Support
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
        <div className="w-full lg:w-2/3">
          <div className="relative group overflow-hidden rounded-xl">
            <div 
              className="w-full h-[250px] md:h-[300px] lg:h-[400px] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(/images/screenshots/temp_screenshot2.png)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          </div>
        </div>
        <div className="w-full lg:w-1/3 space-y-4">
          <h3 className="text-2xl font-medium">Optiminal Performance</h3>
          <p className="text-gray-400">
            Starry is built with performance in mind, ensuring that your gameplay experience is smooth and responsive. With optimized code and efficient algorithms, you can enjoy a seamless and uninterrupted exploiting experience.
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Quick Execution
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Anti-Lag
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Best Performance
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);



const HomePage = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameCardProps | null>(null);
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

  const games = [
    { 
      image: "/images/toh_banner.webp", 
      title: "Tower of Hell", 
      status: "Working", 
      statusColor: "green", 
      url: "https://www.roblox.com/games/1962086868",
      features: [
        "Auto Farm",
        "Bypass Anti-Cheat",
        "Disable Modifiers",
        "Godmode",
        "& Much more!"
      ]
    },
    { 
      image: "/images/doors_banner.webp", 
      title: "Doors", 
      status: "Working", 
      statusColor: "green", 
      url: "https://www.roblox.com/games/6516141723",
      features: [
        "Entity ESP",
        "Item ESP",
        "Auto Complete",
        "Walking Speed Modifier",
        "Entity Spawner",
        "Entity Notifier",
        "& Much more!"
      ]
    },
    { 
      image: "/images/mm2_banner.webp", 
      title: "Murder Mystery 2", 
      status: "Unreleased", 
      statusColor: "blue", 
      url: "https://www.roblox.com/games/142823291",
      features: [
        "Role ESP",
        "Kill All",
        "Auto Unboxing",
        "Become Sheriff",
        "Coin Farm (Includes Events)",
        "& Much more!"
      ]
    },
    { 
      image: "/images/sp_banner.webp", 
      title: "Sound Space", 
      status: "Working", 
      statusColor: "green", 
      url: "https://www.roblox.com/games/2677609345",
      features: [
        "Auto Play",
        "Anti Spectate",
        "Block Score",
        "Change Background",
        "& More!"
      ]
    },
  ];

  const socials = [
    {
      title: "Scriptblox ❤️",
      description: "Browse & Follow our Script Blox Account.",
      icon: Globe,
      link: "https://scriptblox.com/u/starry",
      glowColor: "rgba(139, 92, 246, 0.15)"
    },
    {
      title: "GitHub 📜",
      description: "View and star the open sourced portions of Starry",
      icon: Github,
      link: "https://github.com/starry-proj",
      glowColor: "rgba(255, 255, 255, 0.1)"
    },
    {
      title: "Rscripts ⚡",
      description: "Browse and follow our official Rscripts account",
      icon: Globe,
      link: "https://rscripts.net/@starry",
      glowColor: "rgba(59, 130, 246, 0.15)" 
    },
    {
      title: "Discord",
      description: "Join our community for sneak peaks, script updates, upcoming features, and more",
      icon: FaDiscord,
      link: "https://luau.tech/d?server=luau",
      glowColor: "rgba(88, 101, 242, 0.15)"
    }
  ];

  return (
    <div className="min-h-screen text-white antialiased">
     
      <Navbar />
      <LoadingScreen onComplete={() => {
        console.log('Page fully loaded');
      }}/>

      <HeroSection />

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
            className="overflow-hidden flex gap-6 pb-4 snap-x scrollbar-hide">
            {games.map((game, index) => (
              <GameCard 
                key={index} 
                {...game} 
                onShowFeatures={() => setSelectedGame(game)}
              />
            ))}
          </div>
        </div>
      </section>

      <ScreenshotGallery />

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium mb-4">Join the Community</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet & connect with our lovely community, get script news & updates, and more!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((social, index) => (
            <SocialCard key={index} {...social} />
          ))}
        </div>
      </section>

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
                <h3 className="text-2xl font-medium">{selectedGame.title}</h3>
                <p className="text-gray-400 text-sm">We&apos;re working on providing each game a proper status..</p>
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
                    <span className=" w-1.5 h-1.5 rounded-full bg-accent mt-2 animate-pulse" />
                    <span className= "-mt-0.5 text-gray-300">{feature}</span>
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

      <Footer />
    </div>
  );
};

export default HomePage;
