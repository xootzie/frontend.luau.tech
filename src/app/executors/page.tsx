'use client';
import React, { useState, useEffect } from 'react';
import { Globe, ExternalLink, CheckCircle, Clock, X, Search } from 'lucide-react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';

const executors = [
  {
    name: "Swift",
    description: "Free executor that supports most Scripts just have to get a key.",
    platforms: {
      windows: true,
      macos: false,
      android: false,
      ios: false
    },
    price: "Freemium",
    website: "https://getswift.xyz/",
    features: [
      "Debug Library",
      "Script Hub",
      "Custom Functions",
      "Auto-Launch",
      "Auto-Attach"
    ],
    lastUpdated: 1737412980,
    type: "Free",
    UNC: "Click to view UNC"
  },
  {
    name: "Seliware",
    description: "Cheap executor that supports most Scripts",
    platforms: {
      windows: true,
      macos: false,
      android: false,
      ios: false
    },
    price: "$10/Month",
    website: "https://discord.gg/ydZwUMBeCe",
    features: [
    "Soon"
    ],
    lastUpdated: 1737419580,
    type: "Premium",
    UNC: "Click to view UNC"
  },
  {
    name: "Nihon",
    description: "Paid executor that supports all Scripts",
    platforms: {
      windows: true,
      macos: false,
      android: false,
      ios: false
    },
    price: "$6.49/Week",
    website: "https://nihon.lol",
    features: [
    "Soon"
    ],
    lastUpdated: 1737419580,
    type: "Premium",
    UNC: "Click to view UNC"
  },
  {
    name: "AWP",
    description: "Paid executor that supports all Scripts",
    platforms: {
      windows: true,
      macos: false,
      android: false,
      ios: false
    },
    price: "$6.99/Week",
    website: "https://discord.com/invite/awpgg",
    features: [
    "Soon"
    ],
    lastUpdated: 1737420000,
    type: "Premium",
    UNC: "None"
  },
  {
    name: "Solara",
    description: "One of the BEST free executors",
    platforms: {
      windows: true,
      macos: false,
      android: false,
      ios: false
    },
    price: "Free",
    website: "https://getsolara.dev/",
    features: [
    "Soon"
    ],
    lastUpdated: 1737420000,
    type: "Free",
    UNC: "Click to view UNC"
  },
];

interface Executor {
    name: string;
    description: string;
    platforms: {
      windows: boolean;
      macos: boolean;
      android: boolean;
      ios: boolean;
    };
    price: string;
    website: string;
    features: string[];
    lastUpdated: number;
    type: string;
    UNC: string;
  }
  
  interface FilterState {
    platform: string;
    type: string;
    search: string;
  }
  
  const ModalContext = React.createContext<{
    showModal: (executor: Executor) => void;
    hideModal: () => void;
  } | null>(null);
  
  const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedExecutor, setSelectedExecutor] = useState<Executor | null>(null);
    const [isModalClosing, setIsModalClosing] = useState(false);
  
    const showModal = (executor: Executor) => {
      setSelectedExecutor(executor);
      setIsModalClosing(false);
    };
  
    const hideModal = () => {
      setIsModalClosing(true);
      setTimeout(() => {
        setSelectedExecutor(null);
        setIsModalClosing(false);
      }, 200);
    };
  
    return (
      <ModalContext.Provider value={{ showModal, hideModal }}>
        {children}
        {selectedExecutor && (
          <FeaturesModal
            executor={selectedExecutor}
            onClose={hideModal}
            isClosing={isModalClosing}
          />
        )}
      </ModalContext.Provider>
    );
  };
  
  const TimeAgo = ({ timestamp }: { timestamp: number, className?: string }) => {
    const [timeAgo, setTimeAgo] = useState('');
  
    useEffect(() => {
      const updateTimeAgo = () => {
        const now = Math.floor(Date.now() / 1000);
        const diff = now - timestamp;
  
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
        if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
        return `${Math.floor(diff / 31536000)} years ago`;
      };
  
      setTimeAgo(updateTimeAgo());
      const interval = setInterval(() => setTimeAgo(updateTimeAgo()), 60000);
      return () => clearInterval(interval);
    }, [timestamp]);
  
    return (
      <div className="flex items-center gap-1 text-sm text-gray-400">
        <Clock className="mt-0.5 w-4 h-4" />
        
        Updated<span className="text-accent"> {timeAgo}</span>
      </div>
    );
  };
  
  const FeaturesModal = ({ 
    executor, 
    onClose,
    isClosing 
  }: { 
    executor: Executor;
    onClose: () => void;
    isClosing: boolean;
  }) => {
    return (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center"
        onClick={onClose}
      >
        <div 
          className={`relative bg-zinc-900 rounded-xl border border-white/10 w-full max-w-4xl mx-4
            ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-medium">{executor.name}</h3>
              
              <p className="text-gray-400 text-sm">{executor.description}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-zinc-800/80 rounded-lg transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
  
          <div className="p-6 overflow-y-auto max-h-[40vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {executor.features.map((feature, index) => (
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
              href={executor.website}
              target="_blank"
              className="px-6 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors flex items-center gap-2"
            >
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const ExecutorCard = ({ executor }: { executor: Executor }) => {
    const modalContext = React.useContext(ModalContext);
    const [,setIsHovered] = useState(false);
  
    return (
      <div
        className="group relative overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-xl p-6
          border border-zinc-800/50 hover:border-accent/20 transition-all duration-300 hover:shadow-xl
          hover:shadow-accent/5 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent opacity-0 
          group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl -z-10" />
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-white to-zinc-300 
              bg-clip-text text-transparent">
              {executor.name}
            </h3>
            <div className="flex space-x-2">
              {executor.price === "Free" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Free
            </span>
              ) : executor.price === "Freemium" || executor.price === "Key" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              bg-orange-500/10 text-orange-400 border border-orange-500/20">
              Freemium
            </span>
              ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              bg-blue-500/10 text-blue-400 border border-blue-500/20 gap-1">
              {executor.price}
            </span>
              )}
              {executor.UNC !== "None" && (
            <a 
              href={`/unc/${executor.name.toLowerCase()}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                bg-purple-500/10 text-purple-400 border border-purple-500/20 gap-1"
            >
              <CheckCircle className="w-3 h-3" />
              {executor.UNC}
            </a>
              )}
            </div>
          </div>
          <TimeAgo timestamp={executor.lastUpdated} className="text-zinc-500 text-sm" />
        </div>
  
        <p className= "mt-5 text-zinc-300 text-sm font-bold">About {executor.name}</p>
<p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-3">
  {executor.description}
</p>
  
        <div className="mt-6 space-y-3">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Platforms</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(executor.platforms)
              .filter(([supported]) => supported)
              .map(([platform]) => (
                <div
                  key={platform}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg
                    bg-emerald-500/5 border border-emerald-500/10"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-medium capitalize text-zinc-300">
                    {platform}
                  </span>
                </div>
              ))}
          </div>
        </div>
  
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => modalContext?.showModal(executor)}
            className="flex-1 px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white
              rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
              transition-all duration-300"
          >
            View Features
          </button>
          <a
            href={executor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20
              text-accent border border-accent/20 hover:border-accent/30 transition-all duration-300
              text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            Website
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  };
  
  

const ExecutorDatabase = () => {
  const [filters, setFilters] = useState<FilterState>({
    platform: 'all',
    type: 'all',
    search: ''
  });

  const filteredExecutors = executors.filter(executor => {
    const matchesSearch = executor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         executor.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPlatform = filters.platform === 'all' || executor.platforms[filters.platform as keyof typeof executor.platforms];
    const matchesType = filters.type === 'all' || executor.type === filters.type;

    return matchesSearch && matchesPlatform && matchesType;
  });

  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 border-b border-white/10">
          <Navbar />
        </div>
        
        <LoadingScreen onComplete={() => {
          console.log('Page fully loaded');
        }}/>
        
        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Executor Database
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse our curated list of Roblox executors with detailed information about their features and compatibility
              </p>
            </div>
        
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search executors..."
                    className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg 
                      focus:outline-none focus:border-accent/50 transition-colors"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <select
                  className="px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg 
                    focus:outline-none focus:border-accent/50 transition-colors"
                  value={filters.platform}
                  onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
                >
                  <option value="all">All Platforms</option>
                  <option value="windows">Windows</option>
                  <option value="macos">MacOS</option>
                  <option value="android">Android</option>
                  <option value="ios">iOS</option>
                </select>
                <select
                  className="px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg 
                    focus:outline-none focus:border-accent/50 transition-colors"
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="all">All Types</option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredExecutors.map((executor, index) => (
                <ExecutorCard key={index} executor={executor} />
              ))}
              {filteredExecutors.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-400">No executors found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ModalProvider>
  );
};

export default ExecutorDatabase;