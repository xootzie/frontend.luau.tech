import React from 'react';
import { Sparkles, Zap, Shield, Gauge } from 'lucide-react';

const PricingHero = () => {
  const features = [
    {
      title: 'Advanced Features',
      description: 'Access to premium features and exclusive updates',
      icon: Sparkles
    },
    {
      title: 'PlaceHolderPlaceHolderPlaceHolderPlaceHolder',
      description: 'PlaceHolderPlaceHolderPlaceHolderPlaceHolderPlaceHolder',
      icon: Shield
    },
    {
      title: 'PlaceHolderPlaceHolderPlaceHolderPlaceHolder',
      description: 'PlaceHolderPlaceHolderPlaceHolderPlaceHolder',
      icon: Zap
    },
    {
      title: 'PlaceHolder',
      description: 'PlaceHolderPlaceHolderPlaceHolderPlaceHolderPlaceHolder',
      icon: Gauge
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 text-white">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-medium mb-6">
          Get Starry Premium{' '}
          <span className="relative inline-block">
            for cheap
            <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/30 -z-10 transform -rotate-2"></span>
          </span>
          !
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose your preferred way to unlock premium features and enhance your Starry experience!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default PricingHero;