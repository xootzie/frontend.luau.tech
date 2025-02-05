'use client';


import { useEffect, useState, useCallback } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';

import LoadingScreen from '@/components/loadingScreen';

interface KeyVerifyResponse {
  key: string;
  success: boolean;
  message?: string;
  expiryDate?: string;
}

interface TurnstileOptions {
  sitekey: string;
  theme?: 'light' | 'dark';
  callback?: (token: string) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      getResponse: (widgetId: string) => string | undefined;
      reset: (widgetId: string) => void;
    };
  }
}

export default function KeySystem() {
  const [statusMessage, setStatusMessage] = useState('Complete verification to continue.');
  const [isLoading, setIsLoading] = useState(true);
  const [verifiedKey, setVerifiedKey] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [isTurnstileMounted, setIsTurnstileMounted] = useState(false);
  const [turnstileWidget, setTurnstileWidget] = useState<string>('');

  const handleTurnstileCallback = useCallback((token: string) => {
    setStatusMessage('Waiting for authentication...');

    const cloudflareTurnstile = document.getElementById("turnstileContainer") as HTMLDivElement;
    if (cloudflareTurnstile instanceof HTMLDivElement) {
      cloudflareTurnstile.classList.add("hidden");
    }
    
    const discordAuthButton = document.getElementById("discord-auth-button");
    if (discordAuthButton instanceof HTMLButtonElement) {
      discordAuthButton.classList.remove("opacity-50");
      discordAuthButton.classList.remove("cursor-not-allowed");
    }
    
    if (token) {
      sessionStorage.setItem('turnstileToken', token);
    }
  }, []);

  const checkExistingKey = async () => {
    try {
     
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const clientIp = encodeURIComponent(ipData.ip);

      const response = await fetch(`https://backend.luau.tech/api/auth/license/exist?providedClientIp=${clientIp}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.status === 404) {
        console.log('License check endpoint not found');
        setIsLoading(false);
        return;
      }
      
      if (!response.ok) {
        console.error(`API error: ${response.status} - ${response.statusText}`);
        setStatusMessage('Unable to check license status. Please try again later.');
        setIsLoading(false);
        return;
      }
      
      const data: KeyVerifyResponse = await response.json();
      console.log('Existing key response:', data);
      
      if (data.success && data.key) {
        const sb = document.getElementById('status-box') as HTMLElement;
        const cloudflareTurnstile = document.getElementById("turnstileContainer") as HTMLDivElement;
        
        if (cloudflareTurnstile instanceof HTMLDivElement) {
          cloudflareTurnstile.classList.add("hidden");
        }
        
        if (sb) {
          sb.classList.add("hidden");
        }
        
        setStatusMessage('');
        setVerifiedKey(data.key);
        if (data.expiryDate) {
          setExpiryDate(data.expiryDate);
        }
        
        window.dispatchEvent(new MessageEvent('message', {
          data: JSON.stringify({ key: data.key }),
          origin: window.location.origin
        }));
      }
    } catch (error) {
      console.error('Error checking existing key:', error);
      setStatusMessage('Unable to connect to the license server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyKey = async (licenseKey: string) => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const clientIp = ipData.ip;
      const encodedIp = encodeURIComponent(clientIp);
      const response = await fetch(`https://backend.luau.tech/api/auth/license/verify?licenseKey=${licenseKey}&providedClientIp=${encodedIp}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorMessage = response.status === 404 ? 
          'License verification service is unavailable' : 
          'Failed to verify license key';
        setStatusMessage(errorMessage);
        return;
      }
      
      const data: KeyVerifyResponse = await response.json();
      
      if (data.success) {
        setVerifiedKey(licenseKey);
        setExpiryDate(data.expiryDate || null);
        setStatusMessage('Key verified successfully!');
        setIsLoading(false);
      } else {
        setStatusMessage(data.message || 'Key verification failed');
      }
    } catch (error) {
      console.error('Key verification error:', error);
      setStatusMessage('Failed to verify key');
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const allowedOrigins = [
        'http://localhost:3001',
        'http://localhost:3000', 
        'https://www.luau.tech',
        'https://luau.tech'
      ];
      
      if (!allowedOrigins.includes(event.origin)) return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.key) {
          await verifyKey(data.key);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    setIsTurnstileMounted(true);
    checkExistingKey();

    if (window.turnstile && isTurnstileMounted) {
      const widgetId = window.turnstile.render('#turnstileContainer', {
        sitekey: "0x4AAAAAAA4tVIa8BO3ZNLCH",
        theme: 'dark',
        callback: handleTurnstileCallback
      });
      setTurnstileWidget(widgetId);

      return () => {
        if (widgetId && window.turnstile) {
          window.turnstile.reset(widgetId);
        }
      };
    }
  }, [isTurnstileMounted, handleTurnstileCallback]);

  const handleDiscordAuth = () => {
    if (!turnstileWidget) {
      return;
    }
    
    const turnstileToken = window.turnstile?.getResponse(turnstileWidget);
    if (!turnstileToken) {
      setStatusMessage('Please complete the Turnstile challenge first');
      return;
    }
    
    const popup = window.open(
      `https://backend.luau.tech/api/auth/license/authorize?action=redirect&turnstile=${turnstileToken}`, 
      'Discord Auth', 
      'width=500,height=800'
    );

    window.addEventListener('message', async function(event) {
      if (event.data && event.data.key) {
        await verifyKey(event.data.key);
        if (popup) popup.close();
      }
  
      if (event.data && event.data.error) {
        setStatusMessage(event.data.error);
        if (popup) popup.close();
      }
    }, false);
  };

  const copyKey = async () => {
    if (!verifiedKey) return;
    try {
      await navigator.clipboard.writeText(verifiedKey);
    } catch (err) {
      console.error('Failed to copy key: ', err);
    }
  };

  return (
    <>
  

      <Navbar />

      <LoadingScreen onComplete={() => {
          console.log(`
 ________   _________   ________   ________   ________ 

                                                                         

      ______                             
     / _____)_                          
    ( (_____| |_ _____  ____  ____ _   _ 
    \____ (_   _|____ |/ ___) ___)| | | |
     _____) )| |_/ ___ | |  | |   | |_| |
    (______/  \__)_____|_|  |_|    \__  |
                                  (____/ 

    discord.gg/luau | @Starry | luau.tech



 ________   _________   ________   ________   ________ 


 Please note that this is a work in progress, report any bugs or issues to the discord server.

`);
          }}/>

      <div className="min-h-screen flex items-center justify-center pt-2 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        
          <div className="bg-black bg-opacity-50  rounded-xl p-8 border border-white/10 backdrop-blur-xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-white mb-2">Key System</h2>
              <p className="text-gray-400">Authorized with your Discord account to get a key</p>
            </div>

            <div id="status-box" className="bg-zinc-800/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-3">
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                )}
                <span className="text-sm text-gray-300">{statusMessage}</span>
              </div>
            </div>

            <div className="">
              <div id="turnstileContainer" />
            </div>

            {verifiedKey ? (
              <div className="mt-6 bg-black/100 rounded-md p-4 backdrop-blur-xl shadow-lg">
                <label className="block text-sm font-medium text-gray-400 mb-2 ">Your Starry Key</label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    readOnly
                    value={verifiedKey}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-md px-3 py-2 text-white select-all"
                  />
                  <button
                    onClick={copyKey}
                    className="px-4 py-2 rounded-md bg-midnight text-white text-sm hover:bg-opacity-25 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                {expiryDate && (
                  <p className="text-xs text-gray-400 mt-2">
                    This key will expire on{' '}
                    <span className="font-bold">
                      {new Date(expiryDate).toLocaleString()}
                    </span>
                    .
                  </p>
                )}
              </div>
            ) : (
              <button 
                id="discord-auth-button"
                onClick={handleDiscordAuth}
                className="opacity-50 cursor-not-allowed w-full flex items-center justify-center px-4 py-3 rounded-md bg-[#5865F2] hover:bg-[#4752C4] transition-colors text-white text-sm font-medium"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.127a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.216.642-1.873.892a.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028a19.834 19.834 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Authorize With Discord
              </button>
            )}
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">Each key will last for 12 hours.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}