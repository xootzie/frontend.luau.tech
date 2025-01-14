'use client';
import { useEffect } from 'react';

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon = ({
  title = "Coming Soon",
  description = "We're working hard to bring you something amazing"
}: ComingSoonProps) => {
  useEffect(() => {
 
    const scrollY = 0;
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center relative px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 bg-black/80 p-12 rounded-xl border border-white/10 hover:border-white/20 transition-all">
          <h1 className="text-5xl font-medium tracking-tight text-white ">
            {title}
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto ">
            {description}
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-400">Development in Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;