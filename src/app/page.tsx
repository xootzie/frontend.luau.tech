'use client';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';
import SocialCard from '@/components/SocialCard';
import { useRef } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Github, 
  Sparkles, 
  ArrowUpRight, 
  Globe, 
} from "lucide-react";

import { FaDiscord } from "react-icons/fa";
import GridBackground from '@/components/gridgb';

interface GameCardProps {
  image: string;
  title: string;
  status: string;
  statusColor: string;
}



const HeroSection = () => (
  <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/10 mb-8">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm text-gray-400">New Features Released</span>
      </div>
      <h1 className="text-5xl font-medium tracking-tight max-w-4xl text-white mb-6">
        Elevate Your Roblox GamePlay with Starry
      </h1>
      <p className="mt-6 text-lg text-gray-400 max-w-2xl">
        Meet the next generation of Roblox exploiting.
        Powerful features, seamless execution, unmatched performance.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <button className="hover:cursor-pointer px-6 py-2.5 rounded-full bg-midnight text-white text-sm hover:bg-opacity-75 transition-all duration-200 flex items-center gap-2">
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="px-6 py-2.5 rounded-full text-sm text-gray-400 hover:text-white transition-colors group flex items-center gap-2">
          Learn More
          <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </div>
  </section>
);

const GameCard = ({ image, title, status, statusColor }: GameCardProps) => (
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
        <button className="px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-sm">
          Features
        </button>
        <a 
          href="https://roblox.com" 
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
  <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

      {/* Second Screenshot Section */}
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

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = 416; 
    
    if (carouselRef.current instanceof HTMLDivElement) {
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth' as ScrollBehavior
      });
    }
  };

  const games = [
    { image: "/images/toh_banner.webp", title: "Tower of Hell", status: "Working", statusColor: "green" },
    { image: "/images/bi2_banner.webp", title: "Break In 2", status: "Working", statusColor: "green" },
    { image: "/images/mm2_banner.webp", title: "Murder Mystery 2", status: "Unreleased", statusColor: "blue" },
    { image: "/images/mm2_banner.webp", title: "Murder Mystery 2", status: "Unreleased", statusColor: "blue" },
    { image: "/images/mm2_banner.webp", title: "Murder Mystery 2", status: "Unreleased", statusColor: "blue" },
    { image: "/images/mm2_banner.webp", title: "Murder Mystery 2", status: "Unreleased", statusColor: "blue" }
  ];

  const socials = [
    {
      title: "ScriptBlox",
      description: "Browse & Follow our Script Blox Account.",
      icon: Globe,
      link: "https://scriptblox.com/u/starry",
      glowColor: "rgba(139, 92, 246, 0.15)" // Purple
    },
    {
      title: "GitHub",
      description: "Check out our open-source projects and help by giving us a Star!",
      icon: Github,
      link: "https://github.com/starry-proj",
      glowColor: "rgba(255, 255, 255, 0.1)"
    },
    {
      title: "RScripts",
      description: "Browse & Follow our RScripts Account",
      icon: Globe,
      link: "https://rscripts.net/@starry",
      glowColor: "rgba(59, 130, 246, 0.15)" 
    },
    {
      title: "Discord",
      description: "Join our community for support and updates",
      icon: FaDiscord,
      link: "https://luau.tech/d?server=luau",
      glowColor: "rgba(88, 101, 242, 0.15)"
    }
  ];

  return (
    <div className=" min-h-screen text-white antialiased">
      <GridBackground />
      <Navbar />
      <LoadingScreen onComplete={() => {
        console.log('Page fully loaded');
      }}/>

      <HeroSection />

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          
          <h2 className="text-4xl font-medium mb-4">Supported Experiences</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-400 max-w-2xl">
              Explore our collection of supported games and their current status
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
            className="overflow-hidden flex gap-6 pb-4 snap-x scrollbar-hide ">
            {games.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </div>
        </div>
      </section>

      <ScreenshotGallery />

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium mb-4">Join Our Community</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with fellow Starry users and stay updated with the latest features and scripts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {socials.map((social, index) => (
  <SocialCard key={index} {...social} />
))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;