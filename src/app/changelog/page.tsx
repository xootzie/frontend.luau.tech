'use client';
import { ChevronDown } from "lucide-react";
import Navbar from '@/components/navigation';
import Footer from '@/components/footer';
import { useState } from 'react';
import LoadingScreen from "@/components/loadingScreen";

interface Update {
  version: string;
  date: string;
  type: 'feature' | 'fix' | 'improvement' | 'breaking';
  changes: string[];
}

interface UpdateGroupProps {
  month: string;
  updates: Update[];
}

const getTypeColor = (type: Update['type']) => {
  switch (type) {
    case 'feature':
      return 'text-green-500';
    case 'fix':
      return 'text-red-500';
    case 'improvement':
      return 'text-blue-500';
    case 'breaking':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
};

const getTypeBg = (type: Update['type']) => {
  switch (type) {
    case 'feature':
      return 'bg-green-500/10';
    case 'fix':
      return 'bg-red-500/10';
    case 'improvement':
      return 'bg-blue-500/10';
    case 'breaking':
      return 'bg-yellow-500/10';
    default:
      return 'bg-gray-500/10';
  }
};

const UpdateGroup = ({ month, updates }: UpdateGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        <h3 className="text-xl font-medium">{month}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {updates.map((update, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-900/30 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium">v{update.version}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getTypeBg(update.type)} ${getTypeColor(update.type)}`}>
                    {update.type}
                  </span>
                </div>
                <span className="text-sm text-gray-400">{update.date}</span>
              </div>
              
              <div className="space-y-2">
                {update.changes.map((change, changeIndex) => (
                  <div key={changeIndex} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <p className="text-gray-300">{change}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ChangelogPage = () => {
 
  const updateLog: Record<string, Update[]> = {
    'February 2025': [
      {
        version: 'v 2.9',
        date: 'Feb 14, 2025',
        type: 'feature',
        changes: [
          'Officially released Starry Premium ✨',
          'Early DOORS release 🚪'
        ]
      }
    ]
  };

  return (
    <div className="bg-black min-h-screen text-white antialiased">

      <Navbar />
      < LoadingScreen />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium mb-4 mt-28">Update Log ✨</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track all the latest changes, improvements, and fixes to Starry
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {Object.entries(updateLog).map(([month, updates]) => (
            <UpdateGroup key={month} month={month} updates={updates} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChangelogPage;