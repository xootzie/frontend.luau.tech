'use client';
import React from 'react';
import Image from 'next/image';
import { NavigationButtons } from '@/app/error/navigation-buttons';
import Navbar from '@/components/navigation';



export default function ErrorPage() {
  const errorCode = '404';
  const errorMessage = 'Page Not Found';
  return (
    <>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(37,38,44,0.2),transparent_40%)] pointer-events-none"></div>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-zinc-900/50 rounded-xl p-8 border border-white/10">
            <div className="w-64 h-64 mx-auto mb-8 rounded-lg overflow-hidden bg-zinc-800/50">
              <Image
                src="/images/404.jpg"
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
                Did you know? Cats always land on their feet due to their &ldquo;righting reflex&rdquo; - just like how we&apos;ll help you find your way back!
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