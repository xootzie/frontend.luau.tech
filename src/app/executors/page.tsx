'use client';
import React, { useState, useEffect } from 'react';
import { Globe, ExternalLink, CheckCircle, Clock, X, Search } from 'lucide-react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';

const executors = [
  {
    name: "Swift",
    description: "Freemium executor that supports most Scripts.",
    platforms: {
      windows: true
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
      windows: true
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
      windows: true
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
      windows: true
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
      windows: true
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
      [key: string]: boolean;
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
  
  const RobloxVersionInfo: React.FC = () => {
    const [windowsVersion, setWindowsVersion] = useState('Waiting for WEAO to respond...');
    const [macVersion, setMacVersion] = useState('Waiting for WEAO to respond...');
    const [windowsLastUpdated, setWindowsLastUpdated] = useState('');
    const [macLastUpdated, setMacLastUpdated] = useState('');

useEffect(() => {
  const fetchVersions = async () => {
    try {
      const response = await fetch('https://whatexpsare.online/api/versions/current', {});
      const data = await response.json();
          setWindowsVersion(data.Windows);
          setMacVersion(data.Mac);
          
          const windowsDate = new Date(data.WindowsDate).getTime() / 1000;
          const macDate = new Date(data.MacDate).getTime() / 1000;
          
          setWindowsLastUpdated(windowsDate.toString());
          setMacLastUpdated(macDate.toString());
        } catch (error) {
          console.error('Failed to fetch versions:', error);
        }
      };

      fetchVersions();
    }, []);

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
    };

    const formatUnixTime = (unixTimestamp: string) => {
      const date = new Date(parseInt(unixTimestamp) * 1000);
      return date.toLocaleString();
    };

    return (
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
        <h3 className="text-lg font-medium text-white ">Roblox Version Information</h3>
        <span className='text-sm font-medium text-gray-400 mb-5 block'>App Versions provided by <a href="https://whatexpsare.online" className="text-accent hover:underline">WEAO</a></span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-zinc-800/50 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300">Windows Version</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm bg-black/20 rounded px-3 py-1.5 text-gray-400">
                {windowsVersion}
              </code>
              <button
                onClick={() => copyToClipboard(windowsVersion)}
                className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-md transition-colors"
              >
                Copy
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Last Updated: {windowsLastUpdated ? formatUnixTime(windowsLastUpdated) : 'Loading...'}
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300">Mac Version</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm bg-black/20 rounded px-3 py-1.5 text-gray-400">
                {macVersion}
              </code>
              <button
                onClick={() => copyToClipboard(macVersion)}
                className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-md transition-colors"
              >
                Copy
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Last Updated: {macLastUpdated ? formatUnixTime(macLastUpdated) : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    );
  };
          

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
          className="group relative flex flex-col overflow-hidden bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-xl 
            border border-zinc-800/50 hover:border-accent/20 transition-all duration-300 hover:shadow-xl
            hover:shadow-accent/5 transform hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl -z-10" />
          
          <div className="flex-1 p-6 pb-0">
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
    
            <p className="mt-5 text-zinc-300 text-sm font-bold">About {executor.name}</p>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-3">
              {executor.description}
            </p>
    
            <div className="mt-6 space-y-3">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Platforms</p>
              <div className=" grid grid-cols-2 gap-2">
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
          </div>
    
          <div className="mt-10 p-6 pt-0">
            <div className="flex items-center justify-between gap-4">
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
          console.log(`
 ________   _________   ________   ________   ________ 

                                                                         

      ______                             
     / _____)_                          
    ( (_____| |_ _____  ____  ____ _   _ 
    \____ (_   _|____ |/ ___) ___)| | | |
     _____) )| |_/ ___ | |  | |   | |_| |
    (______/  \__)_____|_|  |_|    \__  |
                                  (____/ 

    discord.gg/luau | @Starry | luau.tech



 ________   _________   ________   ________   ________ 


 Please note that this is a work in progress, report any bugs or issues to the discord server.

`);




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
                    className="px-4 py-2 bg-zinc-900 text-white border border-white/10 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent 
                      transition-all duration-300 appearance-none"
                    value={filters.platform}
                    onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      paddingRight: '2rem'
                    }}
                  >
                    <option value="all" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      All Platforms
                    </option>
                    <option value="windows" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      Windows
                    </option>
                    <option value="macos" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      MacOS
                    </option>
                    <option value="android" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      Android
                    </option>
                    <option value="ios" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      iOS
                    </option>
                  </select>
                  <select
                    className="px-4 py-2 bg-zinc-900 text-white border border-white/10 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent 
                      transition-all duration-300 appearance-none"
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      paddingRight: '2rem'
                    }}
                  >
                    <option value="all" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      All Types
                    </option>
                    <option value="Free" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      Free
                    </option>
                    <option value="Premium" className="bg-zinc-900 text-white hover:bg-zinc-800">
                      Premium
                    </option>
                  </select>
                </div>
              </div>
          
              <RobloxVersionInfo />

              <div className="py-5 grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                {filteredExecutors.map((executor, index) => (
                  <ExecutorCard key={index} executor={executor} />
                ))}
                {filteredExecutors.length === 0 && (
                  <div className="col-span-3 text-center py-12">
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