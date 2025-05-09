'use client';
import React from 'react';
import Image from 'next/image';
import { NavigationButtons } from '@/app/error/navigation-buttons';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';

export default function ErrorPage() {
  const errorCode = '404';
  const errorMessage = 'Page Not Found';
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0f0a14]">
    
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,151,198,0.05),transparent_40%),radial-gradient(circle_at_top_right,rgba(251,151,198,0.05),transparent_40%)] pointer-events-none"></div>
      
      <LoadingScreen onComplete={() => {
          console.log(`
 ________   _________   ________   ________   ________ 

 Please note that this is a work in progress, report any bugs or issues to the discord server.

`);
      }}/>
      
      <Navbar />

      {/* Subtle glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[40vw] h-[40vw] rounded-full opacity-10 bg-accent blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full opacity-8 bg-accent-dark blur-[100px]" />
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-[#150015]/50 rounded-xl p-8 border border-accent/10 text-center backdrop-blur-sm">
      
            <div className="w-64 h-64 mx-auto mb-8 rounded-lg overflow-hidden bg-[#150015]/50 border border-accent/20">
              <Image
                src="/images/404.jpg"
                alt="404 Cat"
                width={256}
                height={256}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            
            <h1 className="text-6xl font-bold mb-4 text-white">{errorCode}</h1>
            <h2 className="text-2xl font-medium mb-2 text-white">{errorMessage}</h2>
            <p className="text-gray-400 mb-8">Looks like this page got lost in the Starlight...</p>
            
            <NavigationButtons />
            
            <div className="mt-8 p-4 bg-[#150015]/30 rounded-lg border border-accent/5">
              <p className="text-sm text-gray-400">
                Did you know? Cats always land on their feet due to their &ldquo;righting reflex&rdquo; - just like how we&apos;ll help you find your way back!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}