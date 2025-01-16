'use client';

import React from 'react';
import { XCircle, Copy, Check } from "lucide-react";
import GridBackground from '@/components/gridgb';
import Navbar from '@/components/navigation';
import Footer from '@/components/footer';




const DeniedPage = () => {
  const [copied, setCopied] = React.useState(false);
  const [errorDetails, setErrorDetails] = React.useState({
    code: '',
    message: '',
    details: '',
    urlLocation: ''
  });
  if (errorDetails.code === 'No code provided') {
    window.location.href = "/"
 }

  React.useEffect(() => {
    const getCookieValue = (name: string) => {
      const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      if (match) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        return decodeURIComponent(match[2]);
      }
      return '';
    };

    setErrorDetails({
      code: getCookieValue('errorCode') || 'No code provided',
      message: getCookieValue('errorMessage') || 'No message provided',
      details: getCookieValue('errorDetails') || 'No details provided',
      urlLocation: getCookieValue('errorLocation') || window.location.href
    });
  }, []);
 
 
  const timestamp = new Date().toLocaleString();

  const copyToClipboard = async () => {
    const textToCopy = `Status: ${errorDetails.code}\nMessage: ${errorDetails.message}\nDetails: ${errorDetails.details}\nTime: ${timestamp}\nLocation: ${errorDetails.urlLocation}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
Location: ${errorDetails.urlLocation}`}
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