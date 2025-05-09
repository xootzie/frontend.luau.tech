'use client';
import { useState, useEffect } from 'react';
import GridBackground from '@/components/gridgb';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPageReadiness = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setIsLoading(false);
          if (onComplete) {
            onComplete();
          }
        }, 300);
      } else {
        setTimeout(checkPageReadiness, 50);
      }
    };
    
    checkPageReadiness();
    
    const maxLoadingTimer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) {
        onComplete();
      }
    }, 2000);
    
    return () => {
      clearTimeout(maxLoadingTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: {
              duration: 0.5,
              ease: "easeInOut"
            }
          }}
          className="fixed inset-0 z-[49] flex items-center justify-center min-h-screen bg-[#0f0a14]"
        >
          <GridBackground />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10 text-center"
          >
            <h1 className="text-5xl font-medium tracking-tight text-white mb-6">
              Starlight ✨
            </h1>
           
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
              Preparing your experience...
            </p>
           
            <div className="mt-6 flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-accent rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.5s'
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;