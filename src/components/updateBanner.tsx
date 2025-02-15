'use client';
import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface UpdateNotificationProps {
  version?: string;
}

const UpdateNotification = ({ version = 'v29' }: UpdateNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cookieName = `luau-tech-update-notification-${version}`;

  useEffect(() => {
    const isDismissed = Cookies.get(cookieName);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, [cookieName]);

  const handleDismiss = () => {
    setIsVisible(false);
    Cookies.set(cookieName, 'dismissed', { expires: 7 });
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-28 left-1/2 -translate-x-1/2 z-40 w-full max-w-6xl px-4">
        <div className="rounded-2xl border-2 border-white/10 bg-[rgba(0,10,40,0.4)] backdrop-blur-xl shadow-2xl ring-1 ring-white/5 ring-offset-0">
          <div className="px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <p className="text-sm text-gray-300">Update 2.9 Available, premium & more! 🎉</p>
              </div>
              <div className="flex items-center gap-x-4">
                <Link
                  href="/changelog"
                  className="text-sm text-gray-300 hover:text-white flex items-center gap-x-1 transition-colors group">
                  Details
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-105 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateNotification;