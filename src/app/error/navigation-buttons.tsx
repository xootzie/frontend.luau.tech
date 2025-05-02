'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export function NavigationButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        onClick={() => window.history.back()}
        className="px-6 py-2 rounded-md bg-zinc-800/50 text-white text-sm hover:bg-zinc-800 transition-colors flex items-center justify-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </button>
      <Link 
        href="/"
        className="px-6 py-2 rounded-md bg-midnight text-white text-sm hover:bg-opacity-25 transition-colors flex items-center justify-center"
      >
        <Home className="w-4 h-4 mr-2" />
        Return Home
      </Link>
    </div>
  );
}