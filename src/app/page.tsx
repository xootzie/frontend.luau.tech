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

import GradientDivider from '@/components/divider';
import { FaDiscord } from "react-icons/fa";

interface GameCardProps {
  image: string;
  title: string;
  status: string;
  statusColor: string;
  url: string;
  features: string[];
  isPremium: boolean;
  hasPremiumFeatures: boolean;
  onShowFeatures?: () => void;
}

const PremiumBadge = ({ message }: { message: string }) => (
  <div className="group relative">
    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black backdrop-blur-sm text-xs font-semibold cursor-help shadow-lg">
      Premium
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 right-0 px-3 py-2 rounded-lg bg-black/95 backdrop-blur-sm text-white text-xs whitespace-nowrap border border-yellow-500/20">
        {message}
      </div>
    </div>
  </div>
);

const PremiumFeaturesBadge = ({ message }: { message: string }) => (
  <div className="group relative">
    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/90 backdrop-blur-sm text-xs font-semibold border border-yellow-500/50 text-yellow-400 cursor-help shadow-lg">
      Premium Features
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 right-0 px-3 py-2 rounded-lg bg-black/95 backdrop-blur-sm text-white text-xs whitespace-nowrap border border-yellow-500/20">
        {message}
      </div>
    </div>
  </div>
);

const GameCard = ({ 
  image, 
  title, 
  status, 
  statusColor, 
  url, 
  isPremium,
  hasPremiumFeatures,
  onShowFeatures 
}: GameCardProps) => (
  <div className="min-w-[385px] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 rounded-xl p-6 border border-white/5 snap-start hover:border-white/20 transition-all duration-300 group backdrop-blur-sm shadow-xl">
    <div 
      className="relative h-48 rounded-lg mb-6 bg-cover bg-center transform group-hover:scale-[1.02] transition-all duration-300 shadow-lg overflow-hidden" 
      style={{ backgroundImage: `url(${image})` }} 
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {isPremium && <PremiumBadge message="This game requires a premium license to use" />}
      {!isPremium && hasPremiumFeatures && <PremiumFeaturesBadge message="This game has some features that require premium" />}
    </div>
    <p className={`text-sm mb-3 flex items-center gap-2 ${statusColor === 'green' ? 'text-emerald-400' : 'text-blue-400'}`}>
      <span className={`w-2 h-2 rounded-full ${statusColor === 'green' ? 'bg-emerald-400' : 'bg-blue-400'} animate-pulse`} />
      {status}
    </p>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-white/90">{title}</h3>
      <div className="flex items-center gap-2">
        <button 
          onClick={onShowFeatures}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
        >
          Features
        </button>
        <a 
          href={url} 
          target="_blank" 
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
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
        View what Starry can do in your favorite games
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
          <h3 className="text-2xl font-medium">Why Use Starry?</h3>
          <p className="text-gray-400">
            Starry includes many insanely overpowered features for a high variety of games we think you&apos;d love. Enjoy game breaking modules, available for the low price of <b>$5.49</b>, or use our powerful project <b>entirely for free</b> today!
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Includes a high variety of games
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Quick and heavy releases
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Efficient and helpful support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              & so much more, available <b>for free</b>!
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
          <h3 className="text-2xl font-medium">Good Performance & Reliability</h3>
          <p className="text-gray-400">
            Another broken script? Not anymore. With Starry, we ensure you&apos;re able to ruin another iPad kid&apos;s day using our high-performant project!
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Instant execution
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Seamless Key System usage
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Quick and reliable
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
        "Godmode",
        "Auto Win",
        "Complete Tower",
        "Change Walking Speed",
        "Change Jumping Power",
        "Auto Play Stacker",
        "ScreenSaver Custom Logo",
        "Fling Player",
        "Extra Jumps",
        "Goto Stage",
        "Disable Conveyors",
        "Give Purchasable Gear",
        "Give Hidden Gear",
        "Goto Server Type",
        "Open Shop",
        "Experience Earned Label",
        "Levels Earned Label",
        "Coins Earned Label",
        "Customize Teleport Method",
        "Customize Farming Method",
        "Disable Anti Gravity",
        "Disable Fog",
        "Disable Speed",
        "Disable Bunnyhop",
        "Auto Promote after Win"
      ],
      isPremium: false,
    hasPremiumFeatures: false,
    },
    { 
      image: "/images/doors_banner.webp", 
      title: "Doors", 
      status: "Working",
      statusColor: "green", 
      url: "https://www.roblox.com/games/6516141723",
      features: [
        "Room Number Label",
        "Toggle Speed Hacks",
        "Change Walking Speed",
        "Notify on Rush",
        "Correct Painting ESP",
        "Highlight Door",
        "Fullbright",
        "Key ESP",
        "Switch ESP",
        "Rush ESP",
        "Instant Use",
        "Exit Shaft",
        "Join Elevator",
        "Gamemode Selection",
        "Exclude Randos",
        "Create Lift"
      ],
      isPremium: true,
      hasPremiumFeatures: true,
    },
    { 
      image: "/images/mm2_banner.webp", 
      title: "Murder Mystery 2", 
      status: "Unreleased", 
      statusColor: "blue", 
      url: "https://www.roblox.com/games/142823291",
      features: [
        "Murderer Label",
        "Sheriff Label",
        "Map Label",
        "Time Remaining Label",
        "Grab Gun",
        "Auto Grab Gun",
        "Announce Roles",
        "Kill Everyone",
        "Xray Vision",
        "Teleport to Location",
        "Disable Bank Scanner",
        "Murderer ESP",
        "Sheriff ESP",
        "Innocents ESP",
        "Dropped Gun ESP",
        "Trap ESP"
      ],
      isPremium: false,
      hasPremiumFeatures: true,
    },
    {
      image: "/images/bi2_banner.webp",
      title: "Break In 2",
      status: "Working",
      statusColor: "green",
      url: "",
      features: [
        "Accept Uncle Pete's Quest",
        "Unlock Custom NPC",
        "Unlock All NPCs",
        "Open Secret Door",
        "Disable Ice Slip",
        "Fullbright",
        "Collect Outside Foods",
        "Global Teleports",
        "Spoof Indoors",
        "Teleport to Player",
        "Heal Player",
        "Godmode",
        "Upgrade Buff of Choice",
        "Max Buffs",
        "Visually Show Speed",
        "Kill Nearby Enemies",
        "Kill Aura",
        "Kill Bosses",
        "Kill Pizza Boss",
        "Give Best Weapon",
        "Equip Armor",
        "Heal Everyone",
        "Infinite Golden Pizza",
        "Stack on Foods",
        "Spin Bad Guys",
        "Kick Player",
        "Kick Everyone",
        "Delete Entire Map",
        "Delete Item",
        "Squash Player",
        "Slip on Ice",
        "Give Area Item",
        "Total Badge Counter",
        "Instantly Load",
        "Join Quickest Ride",
        "Join Bus",
        "Leave Current Bus",
        "Swap Outfits on Role Change",
        "Choose a Paid Role",
        "Pick a Free Role",
        "Change Animation"
      ],
      isPremium: false,
      hasPremiumFeatures: false,
    },
    { 
      image: "/images/sp_banner.webp", 
      title: "Sound Space", 
      status: "Working", 
      statusColor: "green", 
      url: "https://www.roblox.com/games/2677609345",
      features: [
        "Auto Player",
        "Anti Spectate",
        "Block Score",
        "Smoothness Changer",
        "Background Changer"
      ],
      isPremium: false,
      hasPremiumFeatures: true,
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
    <div className="bg-black min-h-screen text-white antialiased">
     
      <Navbar />
     
      <LoadingScreen />

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
      className="overflow-hidden flex gap-6 pb-4 snap-x scrollbar-hide"
    >
      {games.map((game, index) => (
        <GameCard 
          key={index} 
          {...game}
          isPremium={game.isPremium}
          hasPremiumFeatures={game.hasPremiumFeatures}
          onShowFeatures={() => setSelectedGame(game)}
        />
      ))}
    </div>
        </div>
      </section>
      < GradientDivider />
      <ScreenshotGallery />
            
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      < GradientDivider />
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
