import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PricingHero = () => {
  return (
    <div className="pt-52 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 text-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full opacity-20 bg-accent/40 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full opacity-15 bg-accent-dark/30 blur-[100px]" />
      </div>
      
      {/* Large Disclaimer Banner */}
      <div className="mb-12 w-full max-w-4xl mx-auto">
        <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-6 shadow-lg ">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-yellow-300 text-2xl font-bold mb-2">IMPORTANT NOTICE</h2>
              <p className="text-white text-lg mb-2">
                This pricing page will still lead to purchasing Starry, which is being discontinued.
              </p>
              <p className="text-white text-lg font-medium">
                <span className="bg-yellow-500/20 px-2 py-0.5 rounded">Premium Starry members will get Starlight for FREE!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-medium mb-8 relative inline-block transition-all transform hover:text-accent hover:scale-105 duration-300 ease-out">
          Get Starlight
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
          Choose your preferred way to unlock premium features and enhance your Roblox experience!
        </p>
      </div>
    </div>
  );
};

export default PricingHero;