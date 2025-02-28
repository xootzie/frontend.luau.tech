'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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
  const [statusMessage, setStatusMessage] = useState('Please visit the link unlocker first.');
  const [isLoading, setIsLoading] = useState(true);
  const [verifiedKey, setVerifiedKey] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isValidReferrer, setIsValidReferrer] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileWidgetId = useRef<string | null>(null);
  const popupRef = useRef<Window | null>(null);
  const popupCheckInterval = useRef<NodeJS.Timeout | null>(null);

  const checkReferrer = useCallback(() => {
    const referrer = document.referrer;
    const isValid = referrer.includes('https://linkunlocker.com/');
    // const isValid = true;
    
    setIsValidReferrer(isValid);
    
    if (!isValid) {
      setStatusMessage('Please visit the link unlocker first to continue.');
    } else {
      setStatusMessage('Loading verification...');
    }
    
    return isValid;
  }, []);

  // Load Turnstile script
  const loadTurnstileScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
    
      if (window.turnstile) {
        setTurnstileLoaded(true);
        resolve();
        return;
      }

      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com"]');
      if (existingScript) {
      
        const checkInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkInterval);
            setTurnstileLoaded(true);
            resolve();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          reject(new Error('Turnstile script loaded but not initialized'));
        }, 5000);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        const checkTurnstile = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkTurnstile);
            setTurnstileLoaded(true);
            resolve();
          }
        }, 100);
        
        setTimeout(() => {
          clearInterval(checkTurnstile);
          if (!window.turnstile) {
            reject(new Error('Turnstile script loaded but object not initialized'));
          }
        }, 5000);
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Turnstile script:', error);
        reject(new Error('Failed to load Turnstile script'));
      };
      
      document.head.appendChild(script);
    });
  }, []);

  const renderTurnstileWidget = useCallback(() => {
    if (!window.turnstile || !isValidReferrer) return;

      sessionStorage.removeItem('turnstileToken');
  
   

    try {
      const container = document.getElementById('turnstileContainer');
      if (!container) return;
      
      container.innerHTML = '';
      container.style.display = 'block';
      
      if (turnstileWidgetId.current && window.turnstile) {
        try {
          window.turnstile.reset(turnstileWidgetId.current);
        } catch (e) {
          console.error('Failed to reset existing widget:', e);
        }
      }
      
      turnstileWidgetId.current = window.turnstile.render('#turnstileContainer', {
        sitekey: "0x4AAAAAAA4tVIa8BO3ZNLCH",
        theme: 'dark',
        callback: (token) => {
          setTurnstileToken(token);
          const btn_temp1 = document.getElementById('discord-auth-button');
          if (btn_temp1) {
            btn_temp1.classList.remove('bg-yellow-500');
            btn_temp1.classList.remove('hover:bg-yellow-600');
            btn_temp1.classList.add('bg-[#5865F2]');
            btn_temp1.classList.add('hover:bg-[#4752C4]');
            btn_temp1.innerHTML = 'Authorize With Discord';
          }
          setStatusMessage('You may now Authorize with your Discord account.');
          sessionStorage.setItem('turnstileToken', token);
        }
      });
      
      setTimeout(() => {
        const turnstileIframe = document.querySelector('iframe[src*="challenges.cloudflare.com"]');
        if (turnstileIframe) {
          turnstileIframe.classList.add('rounded-lg');
        }
      }, 200);
      
      const btn_temp1 = document.getElementById('discord-auth-button');
      if (btn_temp1) {
        btn_temp1.classList.remove('bg-[#5865F2]');
        btn_temp1.classList.remove('hover:bg-[#4752C4]');
        btn_temp1.classList.add('bg-yellow-500');
        btn_temp1.classList.add('hover:bg-yellow-600');
        btn_temp1.innerHTML = 'Refresh Captcha';
      }
      setStatusMessage('Please complete the security check to continue.');
    } catch (error) {
      console.error('Failed to render Turnstile widget:', error);
      setStatusMessage('Failed to load security check. Please refresh the page.');
    }
  }, [isValidReferrer]);

  // const handleTurnstileVerification = useCallback((token: string) => {
  //   setTurnstileToken(token);
  //   setStatusMessage('Verification complete. Click to continue.');
  //   sessionStorage.setItem('turnstileToken', token);
  // }, []);

  const checkExistingKey = useCallback(async () => {
   

    try {
      const ipResponse = await fetch('https://backend.luau.tech/api/user/information');
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
      
      if (data.success && data.key) {
        const statusBox = document.getElementById('status-box');
        const turnstileContainer = document.getElementById('turnstileContainer');
        
        if (statusBox) statusBox.classList.add("hidden");
        if (turnstileContainer) turnstileContainer.style.display = 'none';
        
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
  }, [isValidReferrer]);

  const verifyKey = async (licenseKey: string) => {
    try {
      const ipResponse = await fetch('https://backend.luau.tech/api/user/information');
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
        
        const statusBox = document.getElementById('status-box');
        const turnstileContainer = document.getElementById('turnstileContainer');
        
        if (statusBox) statusBox.classList.add("hidden");
        if (turnstileContainer) turnstileContainer.style.display = 'none';
      } else {
        setStatusMessage(data.message || 'Key verification failed');
      }
    } catch (error) {
      console.error('Key verification error:', error);
      setStatusMessage('Failed to verify key');
    }
  };

  const clearPopupInterval = () => {
    if (popupCheckInterval.current) {
      clearInterval(popupCheckInterval.current);
      popupCheckInterval.current = null;
    }
  };

  const handleDiscordAuth = async () => {
    if (!isValidReferrer) {
      window.open('https://linkunlocker.com/starry-license-key-dWrla', '_self');
      return;
    }
    
    let token = turnstileToken;
    
    if (!token) {
      token = sessionStorage.getItem('turnstileToken');
    }
    
    if (token) {
      openAuthPopup(token);
      return;
    }
    
    if (!turnstileLoaded) {
      setStatusMessage('Loading verification...');
      try {
        await loadTurnstileScript();
        renderTurnstileWidget();
      } catch (error) {
        console.error('Failed to load Turnstile:', error);
        setStatusMessage('Failed to load security verification. Please refresh the page.');
      }
      return;
    }
    
    setStatusMessage('Please complete the security check first');
    
    if (turnstileWidgetId.current && window.turnstile) {
      renderTurnstileWidget();
    } else {
      renderTurnstileWidget();
    }
  };
  
  const openAuthPopup = (token: string) => {

    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }
    
    clearPopupInterval();
    
    try {
      const popupUrl = `https://backend.luau.tech/api/auth/license/authorize?action=redirect&turnstile=${token}`;
      
      popupRef.current = window.open(
        popupUrl,
        'DiscordAuth',
        'width=500,height=800,resizable=yes,scrollbars=yes'
      );
      
      if (!popupRef.current || popupRef.current.closed || typeof popupRef.current.closed === 'undefined') {
        console.log('Primary popup method failed, trying fallback');
        
        popupRef.current = window.open(popupUrl, '_blank');
        
        if (!popupRef.current || popupRef.current.closed || typeof popupRef.current.closed === 'undefined') {
          setStatusMessage('Popup was blocked. Opening in new tab...');
          window.open(popupUrl, '_blank');
          return;
        }
      }
      
      popupCheckInterval.current = setInterval(() => {
        if (popupRef.current && popupRef.current.closed) {
          clearPopupInterval();
          setStatusMessage('Authentication failed. Please try again.');
          window.location.reload();
        }
      }, 1000);
    } catch (error) {
      console.error('Error opening popup:', error);
      setStatusMessage('Failed to open authentication window. Please try again.');
    }
  };

  const copyKey = async () => {
    if (!verifiedKey) return;
    
    try {
      await navigator.clipboard.writeText(verifiedKey);
      
      const copyButton = document.getElementById('copy-button');
      if (copyButton) {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          if (copyButton) copyButton.textContent = originalText;
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy key: ', err);
      setStatusMessage('Failed to copy key to clipboard');
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const allowedOrigins = [
        'http://localhost:3001',
        'http://localhost:3000', 
        'https://www.luau.tech',
        'https://luau.tech',
        'https://backend.luau.tech'
      ];
      
      const isAllowedOrigin = allowedOrigins.includes(event.origin) || 
                             (popupRef.current && event.source === popupRef.current);
      
      if (!isAllowedOrigin) return;

      try {
        let parsedData;
        if (typeof event.data === 'string') {
          try {
            parsedData = JSON.parse(event.data);
          } catch (e) {
            console.log(e);
            parsedData = { message: event.data };
          }
        } else {
          parsedData = event.data;
        }
        
        if (parsedData && parsedData.key) {
          await verifyKey(parsedData.key);
          
          if (popupRef.current && !popupRef.current.closed) {
            popupRef.current.close();
          }
          clearPopupInterval();
        }
        
        if (parsedData && parsedData.error) {
          setStatusMessage(parsedData.error);
          clearPopupInterval();
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearPopupInterval();
    };
  }, []);

  useEffect(() => {
    const isValid = checkReferrer();
    
   
      checkExistingKey();
      if (isValid) {
        loadTurnstileScript()
        .then(() => {
          renderTurnstileWidget();
        })
        .catch((error) => {
          console.error('Failed to initialize Turnstile:', error);
          setStatusMessage('Failed to load security verification. Please refresh and try again.');
        });
    
    const sessionToken = sessionStorage.getItem('turnstileToken');
    if (sessionToken) {
      const btn_temp1 = document.getElementById('discord-auth-button');
      if (btn_temp1) {
        btn_temp1.classList.remove('bg-yellow-500');
        btn_temp1.classList.remove('hover:bg-yellow-600');
        btn_temp1.classList.add('bg-[#5865F2]');
        btn_temp1.classList.add('hover:bg-[#4752C4]');
        btn_temp1.innerHTML = 'Authorize With Discord';
      }
      setTurnstileToken(sessionToken);
      setStatusMessage('Verification complete. Click to continue.');

    }

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        try {
          window.turnstile.reset(turnstileWidgetId.current);
        } catch (error) {
          console.error('Error cleaning up turnstile:', error);
        }
      }
    };

      }

  }, [checkReferrer, checkExistingKey, loadTurnstileScript, renderTurnstileWidget]);

  return (
    <>
      <Navbar />
      <LoadingScreen/>

      <div className="min-h-screen flex items-center justify-center pt-2 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-opacity-50 rounded-xl p-8 border border-white/10 backdrop-blur-xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-white mb-2">Key System</h2>
              <p className="text-gray-400">Authorize with your Discord account to get a key</p>
            </div>

            <div id="status-box" className={`bg-zinc-800/50 rounded-lg p-4 mb-6 ${verifiedKey ? 'hidden' : ''}`}>
              <div className="flex items-center justify-center space-x-3">
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                )}
                <span className="text-sm text-gray-300">{statusMessage}</span>
              </div>
            </div>

            <div className={`flex justify-center items-center mb-6 ${verifiedKey ? 'hidden' : ''}`}>
              <div 
                id="turnstileContainer" 
                className="overflow-hidden rounded-lg w-full flex justify-center"
                style={{ display: isValidReferrer ? 'flex' : 'none' }}
              />
            </div>

            {verifiedKey ? (
              <div className="mt-6 bg-black/100 rounded-md p-4 backdrop-blur-xl shadow-lg">
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Starry Key</label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    readOnly
                    value={verifiedKey}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-md px-3 py-2 text-white select-all"
                  />
                  <button
                    id="copy-button"
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
                className={`w-full flex items-center justify-center px-4 py-3 rounded-md transition-colors text-white text-sm font-medium ${
                  isValidReferrer && turnstileToken ? 'bg-[#5865F2] hover:bg-[#4752C4]' : 
                  isValidReferrer ? 'bg-[#5865F2] hover:bg-[#4752C4]' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isValidReferrer ? (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.127a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.216.642-1.873.892a.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028a19.834 19.834 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Authorize With Discord
                  </>
                ) : (
                  'Visit Link Unlocker'
                )}
              </button>
            )}
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">Each key will last for 48 hours.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}