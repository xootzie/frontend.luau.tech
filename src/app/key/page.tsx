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
  const [isTurnstileMounted, setIsTurnstileMounted] = useState(false);
  const [turnstileWidget, setTurnstileWidget] = useState<string>('');
  const [isValidReferrer, setIsValidReferrer] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const popupCheckInterval = useRef<NodeJS.Timeout | null>(null);

  const checkReferrer = useCallback(() => {
    const referrer = document.referrer;
    const isValid = referrer.includes('https://linkunlocker.com/');
    // const isValid = true;
   
    setIsValidReferrer(isValid);
    
    if (!isValid) {
      setStatusMessage('Please visit the link unlocker first to continue.');
      const turnstileContainer = document.getElementById("turnstileContainer");
      if (turnstileContainer) {
        // turnstileContainer.classList.add("hidden");
      }
    } else {
      setStatusMessage('Complete verification to continue.');
    }
    
    return isValid;
  }, []);

  const handleTurnstileCallback = useCallback((token: string) => {
    if (!isValidReferrer) {
      setStatusMessage('Please visit the link unlocker first to continue.');
      return;
    }

    setStatusMessage('Waiting for authentication...');

    const cloudflareTurnstile = document.getElementById("turnstileContainer") as HTMLDivElement;
    if (cloudflareTurnstile instanceof HTMLDivElement) {
      // cloudflareTurnstile.classList.add("hidden");
    }
    
    if (token) {
      sessionStorage.setItem('turnstileToken', token);
    }
  }, [isValidReferrer]);

  const checkExistingKey = async () => {
    if (!isValidReferrer) {
      setIsLoading(false);
      return;
    }

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
      
      if (data.success && data.key) {
        const sb = document.getElementById('status-box') as HTMLElement;
        const cloudflareTurnstile = document.getElementById("turnstileContainer") as HTMLDivElement;
        
        if (cloudflareTurnstile instanceof HTMLDivElement) {
          // cloudflareTurnstile.classList.add("hidden");
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
        setIsLoading(false);
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

  const handleDiscordAuth = () => {
    console.log('=== Starting handleDiscordAuth ===');
    console.log('isValidReferrer:', isValidReferrer);
    console.log('turnstileWidget state:', !!turnstileWidget);
    
    if (!isValidReferrer) {
        console.log('ERROR: Invalid referrer detected, redirecting to link unlocker');
        setStatusMessage('Please visit the link unlocker first to continue.');
        console.log('Redirecting to:', 'https://linkunlocker.com/starry-license-key-dWrla');
        window.open('https://linkunlocker.com/starry-license-key-dWrla', '_self');
        return;
    }
    
    // Check if window.turnstile exists
    if (!window.turnstile) {
        console.log('ERROR: Turnstile script not loaded or not available');
        
        // Check if the turnstile script is present
        const turnstileScript = document.querySelector('script[src*="challenges.cloudflare.com"]');
        if (!turnstileScript) {
            console.log('Adding Turnstile script dynamically');
            
            // Add Turnstile script dynamically
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.onload = () => {
                console.log('Turnstile script loaded successfully');
                // Retry the function after script loads
                setTimeout(handleDiscordAuth, 1000);
            };
            script.onerror = (error) => {
                console.error('Failed to load Turnstile script:', error);
                setStatusMessage('Failed to load security check. Please refresh the page.');
            };
            document.head.appendChild(script);
            return;
        } else {
            // Script exists but not initialized yet
            console.log('Turnstile script exists but not initialized');
            setStatusMessage('Security check is loading. Please try again in a moment.');
            return;
        }
    }
    
    // Force initialize turnstileWidget if it's not initialized
    if (!turnstileWidget && window.turnstile) {
        console.log('Attempting to initialize missing turnstileWidget');
        try {
            // Check if the container exists
            const container = document.getElementById('turnstileContainer');
            if (!container) {
                console.error('ERROR: Turnstile container not found');
                setStatusMessage('Security check container not found. Please refresh the page.');
                return;
            }
            
            console.log('turnstileContainer found:', !!container);
            
            // Make sure the container is visible
            container.style.display = 'block';
            
            // Initialize turnstile widget
            const newTurnstileWidget = window.turnstile.render('#turnstileContainer', {
                sitekey: "0x4AAAAAAA4tVIa8BO3ZNLCH",
                theme: 'dark',
                callback: (token) => {
                    console.log('Turnstile callback received token:', !!token);
                    handleTurnstileCallback(token);
                    // Automatically proceed with auth after getting token
                    setTimeout(() => {
                        console.log('Auto-proceeding with Discord auth after Turnstile completion');
                        handleDiscordAuth();
                    }, 500);
                }
            });
            
            if (newTurnstileWidget) {
                console.log('Successfully created new turnstileWidget:', newTurnstileWidget);
                // Update the turnstileWidget state
                setTurnstileWidget(newTurnstileWidget);
                setStatusMessage('Please complete the security check to continue.');
                
                // Add the rounded corners to the iframe after a short delay
                setTimeout(() => {
                    const turnstileIframe = document.querySelector('iframe[src*="challenges.cloudflare.com"]');
                    if (turnstileIframe) {
                        turnstileIframe.classList.add('rounded-lg');
                    }
                }, 100);
                
                return; // Exit to let the user complete the challenge
            } else {
                console.log('ERROR: Failed to create turnstileWidget');
            }
        } catch (error) {
            console.error('ERROR: Failed to initialize turnstileWidget:', error);
            // Try a more direct approach as a last resort
            try {
                const directContainer = document.getElementById('turnstileContainer');
                if (directContainer) {
                    console.log('Trying direct innerHTML approach');
                    // Clear the container and add a button as fallback
                    directContainer.innerHTML = '';
                    
                    const button = document.createElement('button');
                    button.className = 'w-full flex items-center justify-center px-4 py-3 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm font-medium';
                    button.textContent = 'Refresh Security Check';
                    button.onclick = () => {
                        location.reload();
                    };
                    directContainer.appendChild(button);
                }
            } catch (innerError) {
                console.error('Failed even with direct DOM manipulation:', innerError);
            }
        }
    }
   
    // If we're here with no turnstileWidget, try proceeding anyway if there's a token in session storage
    if (!turnstileWidget) {
        console.log('ERROR: turnstileWidget is still not initialized, checking session storage');
        const sessionToken = sessionStorage.getItem('turnstileToken');
        
        if (sessionToken) {
            console.log('Found token in session storage, proceeding with auth');
            // Continue with the token from session storage
            proceedWithAuth(sessionToken);
            return;
        }
        
        console.error('ERROR: No token available in any source');
        setStatusMessage('Security check not initialized. Please refresh the page and try again.');
        return;
    }
   
    console.log('Attempting to get Turnstile response...');
    const turnstileToken = window.turnstile?.getResponse(turnstileWidget);
    console.log('Turnstile token received:', !!turnstileToken);
    
    if (!turnstileToken) {
        // Check session storage as a backup
        const sessionToken = sessionStorage.getItem('turnstileToken');
        if (sessionToken) {
            console.log('No widget token, but found token in session storage');
            // Continue with the token from session storage
            proceedWithAuth(sessionToken);
            return;
        }
        
        console.log('ERROR: No Turnstile token received');
        setStatusMessage('Please complete the security check first');
        
        // Try to reset the widget to make it more noticeable
        try {
            console.log('Resetting turnstile widget to prompt user');
            window.turnstile?.reset(turnstileWidget);
        } catch (resetError) {
            console.error('Failed to reset turnstile widget:', resetError);
        }
        return;
    }
    
    // Proceed with the authentication using the token
    proceedWithAuth(turnstileToken);
    
    // Helper function to proceed with authentication
    function proceedWithAuth(token: string) {
        if (popupRef.current && !popupRef.current.closed) {
            console.log('Closing existing popup');
            popupRef.current.close();
        }
       
        console.log('Clearing popup interval');
        clearPopupInterval();
       
        try {
            console.log('Starting authentication process');
            const popupUrl = `https://backend.luau.tech/api/auth/license/authorize?action=redirect&turnstile=${token}`;
            console.log('Auth URL:', popupUrl);
         
            // Try to open popup with the typical approach
            console.log('Attempting to open popup with features');
            popupRef.current = window.open(
                popupUrl,
                'DiscordAuth',
                'width=500,height=800,resizable=yes,scrollbars=yes'
            );
         
            // Check if popup was successfully opened
            console.log('Popup open status:', !!popupRef.current);
            console.log('Popup closed status:', popupRef.current?.closed);
            console.log('Popup closed is defined:', typeof popupRef.current?.closed !== 'undefined');
            
            // If popup is blocked or not opened properly
            if (!popupRef.current || popupRef.current.closed || typeof popupRef.current.closed === 'undefined') {
                console.log('Primary popup method failed, trying fallback (blank window)');
                // Fallback: Try opening without popup features
                popupRef.current = window.open(popupUrl, '_blank');
               
                console.log('Fallback popup status:', !!popupRef.current);
                console.log('Fallback popup closed status:', popupRef.current?.closed);
                
                if (!popupRef.current || popupRef.current.closed || typeof popupRef.current.closed === 'undefined') {
                    // Ultimate fallback: redirect in the same window
                    console.log('All popup methods failed, using ultimate fallback');
                    setStatusMessage('Popup was blocked. Opening in new tab...');
                    console.log('Opening URL in new tab');
                    window.open(popupUrl, '_blank');
                    return;
                }
            }
         
            // Start checking if popup is closed
            console.log('Setting up popup check interval');
            popupCheckInterval.current = setInterval(() => {
                console.log('Checking if popup is still open:', !popupRef.current?.closed);
                if (popupRef.current && popupRef.current.closed) {
                    console.log('Popup was closed by user');
                    clearPopupInterval();
                    setStatusMessage('Authentication window was closed. Please try again.');
                }
            }, 1000);
            
            console.log('Auth popup successfully launched');
        } catch (error) {
            console.error('CRITICAL ERROR opening popup:', error);
            if (error instanceof Error) {
                console.error('Error name:', error.name);
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            } else {
                console.error('Unknown error:', error);
            }
            setStatusMessage('Failed to open authentication window. Please try again.');
        }
    }
    
    console.log('=== handleDiscordAuth completed ===');
};

  const copyKey = async () => {
    if (!verifiedKey) return;
    try {
      await navigator.clipboard.writeText(verifiedKey);
      // Provide visual feedback
      const copyButton = document.getElementById('copy-button');
      if (copyButton) {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = originalText;
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
        'https://backend.luau.tech'  // Add the backend domain
      ];
      
      // Check if origin is allowed or if it's from our popup (which might have a different origin)
      const isAllowedOrigin = allowedOrigins.includes(event.origin) || 
                             (popupRef.current && event.source === popupRef.current);
      
      if (!isAllowedOrigin) return;

      try {
        // Handle string data
        let parsedData;
        if (typeof event.data === 'string') {
          try {
            parsedData = JSON.parse(event.data);
          } catch (e) {
            console.log(e);
            parsedData = { message: event.data };
          }
        } else {
          // Already an object
          parsedData = event.data;
        }
        
        // Process the data
        if (parsedData && parsedData.key) {
          await verifyKey(parsedData.key);
          // Close popup if it exists
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
    if (isValid) {
      setIsTurnstileMounted(true);
      checkExistingKey();
    }

    if (window.turnstile && isTurnstileMounted && isValid) {
      const widgetId = window.turnstile.render('#turnstileContainer', {
        sitekey: "0x4AAAAAAA4tVIa8BO3ZNLCH",
        theme: 'dark',
        callback: handleTurnstileCallback
      });
      setTurnstileWidget(widgetId);

      setTimeout(() => {
        const turnstileIframe = document.querySelector('iframe[src*="challenges.cloudflare.com"]');
        if (turnstileIframe) {
          turnstileIframe.classList.add('rounded-lg');
        }
      }, 100);

      return () => {
        if (widgetId && window.turnstile) {
          window.turnstile.reset(widgetId);
        }
      };
    }
  }, [isTurnstileMounted, handleTurnstileCallback, checkReferrer]);

  return (
    <>
      <Navbar />
      <LoadingScreen onComplete={() => {/* ... */}}/>

      <div className="bg-black min-h-screen flex items-center justify-center pt-2 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-black bg-opacity-50 rounded-xl p-8 border border-white/10 backdrop-blur-xl shadow-lg">
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

            <div className={`flex justify-center items-center ${verifiedKey ? 'hidden' : ''}`}>
              <div id="turnstileContainer" className="overflow-hidden rounded-lg" />
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