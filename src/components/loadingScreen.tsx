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
      const isDocumentReady = document.readyState === 'complete';
      const hasNavigationTiming = performance.getEntriesByType('navigation').length > 0;
      if (isDocumentReady && hasNavigationTiming) {
       
        setTimeout(() => {
          setIsLoading(false);
          if (onComplete) {
            onComplete();
          }
        }, 500);
      } else {
        setTimeout(checkPageReadiness, 100);
      }
    };
    checkPageReadiness();
    const maxLoadingTimer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) {
        onComplete();
      }
    }, 3000);
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
          className="loading fixed inset-0 z-[49] flex items-center justify-center min-h-screen bg-black"
        >
          <GridBackground />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="loading relative z-10 text-center"
          >
            <h1 className="loading text-5xl font-medium tracking-tight text-white mb-6">
              Starry ✨
            </h1>
           
            <p className="loading mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
              Preparing your experience...
            </p>
           
            <div className="loading mt-6 flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="loading w-2 h-2 bg-gray-600 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0}s`,
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