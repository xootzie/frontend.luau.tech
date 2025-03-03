'use client';

import { useState, useEffect } from 'react';
import * as crypto from 'crypto';

async function validateLicenseAction(
  licenseKey: string, 
  clientIP: string, 
  clientNonce: string, 
  timestamp: string, 
  encryptedPayload: string, 
  signature: string
) {
  

  try {
    const response = await fetch('https://backend.luau.tech/api/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'clientIP': clientIP,
        'clientNonce': clientNonce,
        'timestamp': timestamp
      },
      body: JSON.stringify({
        payload: encryptedPayload,
        signature
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error in server action:', error);
    return { error: error instanceof Error ? error.message : 'Internal server error' };
  }
}

export default function LicenseValidationPage() {
  const [licenseKey, setLicenseKey] = useState('');
  const [result, setResult] = useState<{ error?: string; status?: boolean; type?: string; expiryDate?: string; serverNonce?: string }>({});
  const [loading, setLoading] = useState(false);
  const [clientIP, setClientIP] = useState('');

  useEffect(() => {
  
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setClientIP(data.ip))
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  function generateSignature(data: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }

  function encrypt(data: string, key: string, iv: string): string {
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    return `${iv}:${authTag}:${encrypted}`;
  }

  function decrypt(encryptedData: string, key: string): string {
    try {
      const [iv, authTag, encrypted] = encryptedData.split(':');
      
      const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
      decipher.setAuthTag(Buffer.from(authTag, 'hex'));
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  function generateSecureKey(ip: string, secret: string): string {
    return crypto.createHash('sha256').update(ip + secret).digest('hex');
  }

  function generateIV(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  const handleValidation = async () => {
    try {
      setLoading(true);
      
      const SERVER_SECRET = "7F4D8EE2A91C3B5609D7EC5F2A8B6C0E1F3D2A5B8C9E7F6D3A2B1C0E9F8D7A6";
      
      const clientNonce = crypto.randomBytes(16).toString('hex');
      const timestamp = Date.now().toString();
      
      const encryptionKey = generateSecureKey(clientIP, SERVER_SECRET);
      
      const iv = generateIV();
      const payloadData = JSON.stringify({ licenseKey });
      const encryptedPayload = encrypt(payloadData, encryptionKey, iv);
      
      const signature = generateSignature(encryptedPayload + clientNonce + timestamp, SERVER_SECRET);
      
      const responseData = await validateLicenseAction(
        licenseKey,
        clientIP,
        clientNonce,
        timestamp,
        encryptedPayload,
        signature
      );
      
      if (responseData.error) {
        setResult({ error: responseData.error });
        return;
      }
      
      const { payload: encryptedResponse, signature: responseSignature } = responseData;
      
      const expectedSignature = generateSignature(encryptedResponse + clientNonce, SERVER_SECRET);
      
      if (responseSignature !== expectedSignature) {
        setResult({ error: 'Invalid server signature' });
        return;
      }
      
      const decryptedResponse = decrypt(encryptedResponse, encryptionKey);
      const parsedResponse = JSON.parse(decryptedResponse);
      
      if (parsedResponse.status === "eurt") {
        parsedResponse.status = true;
      } else if (parsedResponse.status === "eslaf") {
        parsedResponse.status = false;
      }
      
      setResult(parsedResponse);
    } catch (error) {
      console.error('Validation error:', error);
      setResult({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">License Validation Test</h1>
      
      <div className="mb-4">
        <p className="mb-2">Your IP: {clientIP || 'Loading...'}</p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="licenseKey" className="block mb-2 font-medium">
          License Key
        </label>
        <input
          id="licenseKey"
          type="text"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your license key"
        />
      </div>
      
      <button
        onClick={handleValidation}
        disabled={!licenseKey || loading || !clientIP}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {loading ? 'Validating...' : 'Validate License'}
      </button>
      
      {result && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-white text-xl font-semibold mb-2">Result</h2>
          {result.error ? (
            <div className="text-red-600">Error: {result.error}</div>
          ) : (
            <div>
              <p className="mb-1">
                Status: <span className={result.status ? 'text-green-600' : 'text-red-600'}>
                  {result.status ? 'Valid' : 'Invalid'}
                </span>
              </p>
              {result.type && <p className="mb-1">License Type: {result.type}</p>}
              {result.expiryDate && (
                <p className="mb-1">
                  Expiry Date: {new Date(result.expiryDate).toLocaleDateString()}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                Server Nonce: {result.serverNonce}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}