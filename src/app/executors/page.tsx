'use client';
import React, { useState, useEffect } from 'react';
import { Globe, ExternalLink, CheckCircle, Clock, X, Search, Apple, Grid2X2, Check, Copy } from 'lucide-react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';

type Platform = 'windows' | 'MacOS' | 'android' | 'ios';

type Platforms = {
  [key in Platform]?: boolean;
}

interface Executor {
  name: string;
  description: string;
  platforms: Platforms;
  price: string;
  website: string;
  features: string[];
  lastUpdated: number;
  type: string;
  UNC: string;
}

const executors = [
  {
    name: "Swift",
    description: "Swift is known as the best Free executor, very easy to use and can run most scripts",
    platforms: {
      windows: true
    },
    price: "Freemium",
    website: "https://getswift.xyz/",
    features: [
      "Coming Soon"
    ],
    lastUpdated: 1737412980,
    type: "Free",
    UNC: "View UNC"
  },
  {
    name: "Seliware",
    description: "Seliware is one of the cheapest paid executors but is also very powerful",
    platforms: {
      windows: true
    },
    price: "$10/Month",
    website: "https://discord.gg/ydZwUMBeCe",
    features: [
      "Coming Soon"
    ],
    lastUpdated: 1737419580,
    type: "Premium",
    UNC: "View UNC"
  },
  {
    name: "Nihon",
    description: "Nihon is a paid executor that has one of the nicest UI design and is very premium with up to 90&+ UNC",
    platforms: {
      windows: true
    },
    price: "$6.49/Week",
    website: "https://nihon.lol",
    features: [
      "Coming Soon"
    ],
    lastUpdated: 1737419580,
    type: "Premium",
    UNC: "View UNC"
  },
  {
    name: "AWP",
    description: "AWP is a paid executor with a very minilistic and modern UI design, it is a premium executor that supports basically every script",
    platforms: {
      windows: true
    },
    price: "$6.99/Week",
    website: "https://discord.com/invite/awpgg",
    features: [
      "Coming Soon"
    ],
    lastUpdated: 1737420000,
    type: "Premium",
    UNC: "None"
  },
  {
    name: "Solara",
    description: "Solara is the number one free executor, it has a very basic UI design and is very easy to use",
    platforms: {
      windows: true
    },
    price: "Free",
    website: "https://getsolara.dev/",
    features: [
      "Coming Soon"
    ],
    lastUpdated: 1737420000,
    type: "Free",
    UNC: "View UNC"
  },
  {
    name: "Synapse Z",
    description: "Synapse Z is a recreation of Synapse X, very powerful and premium executor",
    platforms: {
      windows: true
    },
    price: "$4.99-$6.49",
    website: "https://synapsez.net/",
    features: [
      "Coming Soon"
    ],
    lastUpdated: 1738078080,
    type: "Premium",
    UNC: "None"
  },
  {
    name: "Macsploit",
    description: "Macsploit is the only currently available MacOS executor for cheap",
    platforms: {
      MacOS: true
    },
    price: "$9.99",
    website: "https://www.abyssdigital.xyz/",
    features: [
      "Coming Soon"
    ],
    lastUpdated: 1738078230,
    type: "Premium",
    UNC: "None"
  },
];

interface FilterState {
  platform: string;
  type: string;
  search: string;
}

const TimeAgo: React.FC<{ timestamp: number }> = ({ timestamp }) => {
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

  return timeAgo;
};

const RobloxVersionInfo: React.FC = () => {
  const [windowsVersion, setWindowsVersion] = useState('Waiting for WEAO to respond...');
  const [macVersion, setMacVersion] = useState('Waiting for WEAO to respond...');
  const [windowsLastUpdated, setWindowsLastUpdated] = useState('');
  const [macLastUpdated, setMacLastUpdated] = useState('');

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch('https://whatexpsare.online/api/versions/current');
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

  const [copying, setCopying] = useState<{[key: string]: boolean}>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopying({...copying, [id]: true});
    setTimeout(() => {
      setCopying({...copying, [id]: false});
    }, 2000);
  };

  const formatUnixTime = (unixTimestamp: string) => {
    const date = new Date(parseInt(unixTimestamp) * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
      <h3 className="text-lg font-medium text-white">Roblox Version Information</h3>
      <span className="text-sm font-medium text-gray-400 mb-5 block">
        App Versions provided by <a href="https://whatexpsare.online" className="text-accent hover:underline">WEAO</a>
      </span>
      
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
  onClick={() => copyToClipboard(windowsVersion, 'win')}
  className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-md transition-colors flex items-center gap-1"
>
  {copying['win'] ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
  {copying['win'] ? 'Copied!' : 'Copy'}
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
  onClick={() => copyToClipboard(macVersion, 'mac')}
  className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-md transition-colors flex items-center gap-1"
>
  {copying['mac'] ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
  {copying['mac'] ? 'Copied!' : 'Copy'}
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

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

const FeaturesModal: React.FC<{
  executor: Executor;
  onClose: () => void;
  isClosing: boolean;
}> = ({ executor, onClose, isClosing }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`relative bg-zinc-900 rounded-xl border border-white/10 w-full max-w-4xl shadow-xl
          ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}
          focus-within:outline-none focus-within:ring-2 focus-within:ring-accent/50`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-32 sm:h-48 overflow-hidden rounded-t-xl bg-gradient-to-b from-zinc-800 to-zinc-900">
          <div className="absolute left-0 p-6">
            <h3 id="modal-title" className="text-2xl font-medium tracking-tight">
              {executor.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {executor.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-zinc-800/80 rounded-lg transition-colors backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[40vh] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {executor.features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-3 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/80 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 group-hover:animate-pulse" />
                <span className="text-gray-300 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-zinc-900/50">
          <a
            href={executor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors flex items-center gap-2
              focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            Visit Website
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors
              focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ExecutorCard: React.FC<{ executor: Executor }> = ({ executor }) => {
  const modalContext = React.useContext(ModalContext);
  const [, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col h-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40
        border border-zinc-800/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl
        hover:shadow-accent/10 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent opacity-0 
        group-hover:opacity-100 transition-all duration-700 rounded-xl blur-2xl -z-10" />
      
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold bg-gradient-to-br from-white via-gray-100 to-gray-300 
            bg-clip-text text-transparent group-hover:to-accent/80 transition-colors duration-500">
            {executor.name}
          </h3>
          <div className="flex flex-wrap gap-2 items-start">
            {executor.price === "Free" ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                Free
              </span>
            ) : executor.price === "Freemium" || executor.price === "Key" ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                Freemium
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                {executor.price}
              </span>
            )}
            {executor.UNC !== "None" && (
              <a href={`/unc/${executor.name.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                  bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm gap-1
                  hover:bg-purple-500/30 transition-colors duration-300"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {executor.UNC}
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <TimeAgo timestamp={executor.lastUpdated} />
        </div>
      </div>

      <div className="px-6 py-4">
        <p className="text-sm text-gray-300 leading-relaxed">
          {executor.description}
        </p>
      </div>

      <div className="px-6 py-4 mt-auto">
  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
    Supported Platforms
  </p>
  <div className="grid grid-cols-2 gap-2">
    {Object.entries(executor.platforms)
      .filter(([, supported]) => supported)
      .map(([platform]) => (
        <div
          key={platform}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm transition-all duration-300
            ${platform === "windows" 
              ? "bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/15 group-hover:border-blue-500/30" 
              : platform === "MacOS"
              ? "bg-gray-500/10 border border-gray-500/20 group-hover:bg-gray-500/15 group-hover:border-gray-500/30"
              : "bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/15 group-hover:border-blue-500/30"
            }`}
        >
          {platform === "windows" ? (
            <Grid2X2 className="w-3.5 h-3.5 text-blue-400" />
          ) : platform === "MacOS" ? (
            <Apple className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <Globe className="w-3.5 h-3.5 text-gray-400" />
          )}
          <span className={`text-xs font-medium capitalize ${
            platform === "windows" ? "text-blue-400" : "text-gray-400"
          }`}>
            {platform}
          </span>
        </div>
      ))}
  </div>
</div>

      <div className="p-6 mt-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => modalContext?.showModal(executor)}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white
              rounded-lg bg-accent/20 hover:bg-accent/30 border border-accent/30 hover:border-accent/40
              transition-all duration-300 backdrop-blur-sm"
          >
            View Features
          </button>
          <a
            href={executor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg
              bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-zinc-700
              transition-all duration-300 backdrop-blur-sm text-sm font-medium text-white
              hover:text-accent group"
          >
            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Website
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

const ExecutorDatabase: React.FC = () => {
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
          console.log('Loading complete');
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
                  <option value="all">All Platforms</option>
                  <option value="windows">Windows</option>
                  <option value="MacOS">MacOS</option>
                  <option value="android">Android</option>
                  <option value="ios">iOS</option>
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
                  <option value="all">All Types</option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
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