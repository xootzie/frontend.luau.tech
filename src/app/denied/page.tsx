'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle, Copy, Check } from "lucide-react";
import GridBackground from '@/components/gridgb';
import Navbar from '@/components/navigation';
import Footer from '@/components/footer';

const DeniedPage = () => {
  const [copied, setCopied] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [timestamp, setTimestamp] = React.useState('');
  const searchParams = useSearchParams();
  
  const errorDetails = React.useMemo(() => ({
    code: searchParams.get('code') || 'No code provided',
    message: decodeURIComponent(searchParams.get('message') || 'No message provided'),
    details: decodeURIComponent(searchParams.get('details') || 'No details provided'),
    urlLocation: decodeURIComponent(searchParams.get('location') || '')
  }), [searchParams]);

  React.useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().toLocaleString());
    
    if (errorDetails.code === 'No code provided') {
      window.location.href = "/";
    }
  }, [errorDetails.code]);

  const copyToClipboard = async () => {
    if (!mounted) return;
    
    const textToCopy = `Status: ${errorDetails.code}
Message: ${errorDetails.message}
Details: ${errorDetails.details}
Time: ${timestamp}
Location: ${errorDetails.urlLocation || window.location.href}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen text-white antialiased">
        <GridBackground />
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white antialiased">
      <GridBackground />
      <Navbar />
      
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-red-500/20 mb-8">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="-mt-0.5 text-sm text-red-400">Error {errorDetails.code}</span>
          </div>
          
          <h1 className="text-5xl font-medium tracking-tight max-w-4xl text-white mb-6">
            {errorDetails.message}
          </h1>
          
          <p className="mt-6 text-lg text-gray-400 max-w-2xl">
            {errorDetails.details}
          </p>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="p-8 bg-zinc-900/50 rounded-xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-medium mb-4">Need Help?</h2>
              <p className="text-gray-400 mb-6">
                If you believe this is an error or need assistance accessing this page,
                please reach out to our support team.
              </p>
            </div>
            <div className="bg-zinc-800/50 p-6 rounded-lg border border-white/5">
              <div className="text-sm text-gray-400">
                <div className="flex justify-between items-center mb-4">
                  <p>Error Details:</p>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-zinc-700/50 rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <pre className="bg-black/30 p-4 rounded-md overflow-x-auto">
                  {`Status: ${errorDetails.code}
Message: ${errorDetails.message}
Details: ${errorDetails.details}
Time: ${timestamp}
Location: ${errorDetails.urlLocation || window.location.href}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DeniedPage;