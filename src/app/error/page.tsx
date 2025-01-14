import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NavigationButtons } from '@/app/error/navigation-buttons';
import { Metadata } from 'next';

interface PageProps {
  searchParams: { 
    code?: string; 
    message?: string;
  };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const errorCode = searchParams.code || '404';
  const errorMessage = searchParams.message || 'Page Not Found';
  
  return {
    title: `Error ${errorCode} - ${errorMessage}`,
    description: errorMessage,
  };
}

export default function ErrorPage({ searchParams }: PageProps) {
  const errorCode = searchParams.code || '404';
  const errorMessage = searchParams.message || 'Page Not Found';

  return (
    <>
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(37,38,44,0.2),transparent_40%)] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-xl text-accent font-medium">
              <Image 
                src="/images/brand/icon.png"
                alt="Starry Logo" 
                width={32} 
                height={32} 
                className="shadow-md"
              />
              <span className="text-xl text-accent font-medium">Starry</span>
            </Link>

            <div className="flex justify-center space-x-6 ml-36">
              <Link href="/" className="text-sm text-gray-400 hover:text-accent transition-colors">Home</Link>
              <Link href="/premium" className="text-sm text-gray-400 hover:text-accent transition-colors">Premium</Link>
              <Link href="/news" className="text-sm text-gray-400 hover:text-accent transition-colors">Updates & News</Link>
              <Link href="/d?server=luau" className="text-sm text-gray-400 hover:text-accent transition-colors">Discord Server</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/key" className="hidden md:block px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors border border-white/10 rounded-md">
                License Key
              </Link>
              <Link
                href="/get-started"
                className="px-4 py-1.5 rounded-md bg-midnight text-white text-sm hover:bg-opacity-25 transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Content */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* Error Card */}
          <div className="bg-zinc-900/50 rounded-xl p-8 border border-white/10">
            {/* Cat GIF Container */}
            <div className="w-64 h-64 mx-auto mb-8 rounded-lg overflow-hidden bg-zinc-800/50">
              <Image 
                src="/images/404-animation-cat.gif" 
                alt="404 Cat" 
                width={256} 
                height={256} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Error Message */}
            <h1 className="text-6xl font-bold mb-4">{errorCode}</h1>
            <h2 className="text-2xl font-medium mb-2">{errorMessage}</h2>
            <p className="text-gray-400 mb-8">Looks like this page got lost in the stars...</p>

            {/* Navigation Buttons - Client Component */}
            <NavigationButtons />

            {/* Fun Facts (Optional) */}
            <div className="mt-8 p-4 bg-zinc-800/30 rounded-lg">
              <p className="text-sm text-gray-400">
                Did you know? Cats always land on their feet due to their "righting reflex" - just like how we'll help you find your way back!
              </p>
            </div>
          </div>

          {/* Stars Animation */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            {[
              { top: '20%', left: '10%' },
              { top: '30%', left: '20%' },
              { top: '40%', left: '80%' },
              { top: '60%', left: '90%' },
              { top: '70%', left: '30%' },
            ].map((style, index) => (
              <div 
                key={index}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={style}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}