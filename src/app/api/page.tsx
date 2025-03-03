'use client';

import { useState, useEffect } from 'react';
import * as crypto from 'crypto';

// Same obfuscated values as server
const LICENSE_VALID = "4a7c9d3b2e1f5a8c6b";
const LICENSE_INVALID = "3e7d8c9b5a2f1e6d4c";

async function validateLicenseAction(
  licenseKey: string, 
  clientIP: string, 
  clientNonce: string, 
  timestamp: string, 
  encryptedPayload: string, 
  signature: string
) {
  console.log('Starting license validation with server', {
    licenseKey,
    clientIP,
    clientNonce: clientNonce.substring(0, 8) + '...',
    timestamp,
    encryptedPayload: encryptedPayload.substring(0, 20) + '...',
    signature: signature.substring(0, 8) + '...',
  });

  try {
    console.log('Sending request to server:', 'https://backend.luau.tech/api/api');
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
    
    const data = await response.json();
    console.log('Server response received:', {
      status: response.status,
      hasError: !!data.error,
      hasPayload: !!data.payload,
      hasSignature: !!data.signature
    });
    return data;
  } catch (error) {
    console.error('Error in server action:', error);
    return { error: error instanceof Error ? error.message : 'Internal server error' };
  }
}

// Generate a secure hash matching the server's implementation
function generateSecureHash(value: string, salt: string): string {
  return crypto.createHash('sha256').update(value + salt).digest('hex').substring(0, 16);
}

export default function LicenseValidationPage() {
  const [licenseKey, setLicenseKey] = useState('');
  const [result, setResult] = useState<{ 
    error?: string; 
    status?: boolean; 
    type?: string; 
    expiryDate?: string; 
    serverNonce?: string;
    clientIpHash?: string;
    sessionId?: string;
    timestamp?: number;
    verificationToken?: string;
    verificationStatus?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [clientIP, setClientIP] = useState('');
  const [debugLog, setDebugLog] = useState<string[]>([]);

  // Helper function to add to debug log
  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setDebugLog(prev => [...prev, logMessage]);
  };

  useEffect(() => {
    addDebugLog('Component mounted, fetching client IP');
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setClientIP(data.ip);
        addDebugLog(`Client IP fetched: ${data.ip}`);
      })
      .catch(error => {
        console.error('Error fetching IP:', error);
        addDebugLog(`Error fetching IP: ${error.message}`);
      });
  }, []);

  function generateSignature(data: string, secret: string): string {
    addDebugLog(`Generating signature for data of length ${data.length}`);
    const signature = crypto.createHmac('sha256', secret).update(data).digest('hex');
    addDebugLog(`Signature generated: ${signature.substring(0, 8)}...`);
    return signature;
  }

  function encrypt(data: string, key: string, iv: string): string {
    try {
      addDebugLog(`Encrypting data of length ${data.length} with key and IV`);
      const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      const authTag = cipher.getAuthTag().toString('hex');
      
      const result = `${iv}:${authTag}:${encrypted}`;
      addDebugLog(`Encryption successful, result length: ${result.length}`);
      return result;
    } catch (error) {
      addDebugLog(`Encryption error: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  function decrypt(encryptedData: string, key: string): string {
    try {
      addDebugLog(`Decrypting data of length ${encryptedData.length}`);
      const [iv, authTag, encrypted] = encryptedData.split(':');
      
      addDebugLog(`Decryption parts: IV=${iv.substring(0, 8)}..., AuthTag=${authTag.substring(0, 8)}..., Encrypted data length=${encrypted.length}`);
      
      const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
      decipher.setAuthTag(Buffer.from(authTag, 'hex'));
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      addDebugLog(`Decryption successful, decrypted data length: ${decrypted.length}`);
      return decrypted;
    } catch (error) {
      addDebugLog(`Decryption error: ${error instanceof Error ? error.message : String(error)}`);
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  function generateSecureKey(ip: string, secret: string): string {
    addDebugLog(`Generating secure key from IP and secret`);
    const key = crypto.createHash('sha256').update(ip + secret).digest('hex');
    addDebugLog(`Secure key generated: ${key.substring(0, 8)}...`);
    return key;
  }

  function generateIV(): string {
    addDebugLog('Generating random IV');
    const iv = crypto.randomBytes(16).toString('hex');
    addDebugLog(`IV generated: ${iv.substring(0, 8)}...`);
    return iv;
  }

  interface ParsedResponse {
    status: string;
    sessionId: string;
    timestamp: number;
    clientIpHash: string;
    verificationToken: string;
  }
  
  const verifyResponseIntegrity = (
      parsedResponse: ParsedResponse, 
      licenseKey: string, 
      clientIP: string, 
      serverSecret: string
    ) => {
    try {
    
      const parsed = parsedResponse;
      const { 
        status, 
        sessionId, 
        timestamp, 
        clientIpHash, 
        verificationToken 
      } = parsed;

      addDebugLog('Verifying response integrity');
      
      // First verify IP hash
      const expectedIpHash = generateSecureHash(clientIP, sessionId);
      const ipVerified = expectedIpHash === clientIpHash;
      addDebugLog(`IP hash verification: ${ipVerified ? 'PASSED' : 'FAILED'}`);
      
      // Then verify the full verification token
      const isValid = status === LICENSE_VALID;
      const expectedVerificationToken = generateSecureHash(
        licenseKey + clientIP + timestamp.toString() + (isValid ? '1' : '0'),
        serverSecret.substring(0, 16)
      );
      
      const tokenVerified = expectedVerificationToken === verificationToken;
      addDebugLog(`Verification token: ${tokenVerified ? 'PASSED' : 'FAILED'}`);
      
      // Check if response is too old (optional, increase window if needed)
      const maxAgeMs = 60000; // 1 minute
      const ageVerified = Date.now() - timestamp < maxAgeMs;
      addDebugLog(`Age verification (${Date.now() - timestamp}ms): ${ageVerified ? 'PASSED' : 'FAILED'}`);
      
      return {
        verified: ipVerified && tokenVerified && ageVerified,
        ipVerified,
        tokenVerified,
        ageVerified
      };
    } catch (e) {
      addDebugLog(`Verification error: ${e instanceof Error ? e.message : String(e)}`);
      return { verified: false, ipVerified: false, tokenVerified: false, ageVerified: false };
    }
  };

  const handleValidation = async () => {
    try {
      setLoading(true);
      setDebugLog([]);
      addDebugLog(`Starting license validation for key: ${licenseKey.substring(0, 4)}...`);
      
      const SERVER_SECRET = "7F4D8EE2A91C3B5609D7EC5F2A8B6C0E1F3D2A5B8C9E7F6D3A2B1C0E9F8D7A6";
      addDebugLog('Using server secret (first 8 chars): ' + SERVER_SECRET.substring(0, 8) + '...');
      
      const clientNonce = crypto.randomBytes(16).toString('hex');
      const timestamp = Date.now().toString();
      addDebugLog(`Generated client nonce: ${clientNonce.substring(0, 8)}... and timestamp: ${timestamp}`);
      
      const encryptionKey = generateSecureKey(clientIP, SERVER_SECRET);
      
      const iv = generateIV();
      const payloadData = JSON.stringify({ licenseKey });
      addDebugLog(`Payload to encrypt: ${payloadData}`);
      
      const encryptedPayload = encrypt(payloadData, encryptionKey, iv);
      
      const signature = generateSignature(encryptedPayload + clientNonce + timestamp, SERVER_SECRET);
      
      addDebugLog('Calling validateLicenseAction with server');
      const responseData = await validateLicenseAction(
        licenseKey,
        clientIP,
        clientNonce,
        timestamp,
        encryptedPayload,
        signature
      );
      
      addDebugLog(`Server response received: ${JSON.stringify(responseData, null, 2)}`);
      
      if (responseData.error) {
        addDebugLog(`Error in response: ${responseData.error}`);
        setResult({ error: responseData.error });
        return;
      }
      
      const { payload: encryptedResponse, signature: responseSignature } = responseData;
      addDebugLog(`Encrypted response received, length: ${encryptedResponse?.length || 0}`);
      addDebugLog(`Response signature: ${responseSignature?.substring(0, 8) || 'none'}...`);
      
      const expectedSignature = generateSignature(encryptedResponse + clientNonce, SERVER_SECRET);
      
      if (responseSignature !== expectedSignature) {
        addDebugLog(`Signature validation failed!`);
        addDebugLog(`Expected: ${expectedSignature}`);
        addDebugLog(`Received: ${responseSignature}`);
        setResult({ error: 'Invalid server signature' });
        return;
      }
      
      addDebugLog('Signature validated successfully, decrypting response');
      const decryptedResponse = decrypt(encryptedResponse, encryptionKey);
      addDebugLog(`Decrypted response: ${decryptedResponse}`);
      
      const parsedResponse = JSON.parse(decryptedResponse);
      addDebugLog(`Parsed response: ${JSON.stringify(parsedResponse, null, 2)}`);
      
      // Verify the response integrity
      const verificationResult = verifyResponseIntegrity(
        parsedResponse,
        licenseKey,
        clientIP,
        SERVER_SECRET
      );
      
      if (!verificationResult.verified) {
        addDebugLog('Response verification failed! Possible tampering detected.');
        setResult({ 
          error: 'Response verification failed. The license information may have been tampered with.',
          verificationStatus: 'Failed: ' + JSON.stringify(verificationResult)
        });
        return;
      }
      
      addDebugLog('Response integrity verified successfully');
      
      let status = false;
      if (parsedResponse.status === LICENSE_VALID) {
        addDebugLog('Valid license detected');
        status = true;
      } else if (parsedResponse.status === LICENSE_INVALID) {
        addDebugLog('Invalid license detected');
        status = false;
      } else {
        addDebugLog(`Unknown status value: ${parsedResponse.status}`);
        setResult({ error: 'Invalid license status format' });
        return;
      }
      
      const finalResult = {
        ...parsedResponse,
        status,
        verificationStatus: 'Passed'
      };
      
      addDebugLog(`Final result: ${JSON.stringify(finalResult, null, 2)}`);
      setResult(finalResult);
    } catch (error) {
      console.error('Validation error:', error);
      addDebugLog(`Validation error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
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
                  Expiry Date: {new Date(Number(result.expiryDate)).toLocaleDateString()}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                Server Nonce: {result.serverNonce}
              </p>
              <p className="text-sm text-gray-600">
                Session ID: {result.sessionId?.substring(0, 8)}...
              </p>
              <p className="text-sm text-gray-600">
                Verification: <span className={result.verificationStatus?.includes('Failed') ? 'text-red-600' : 'text-green-600'}>
                  {result.verificationStatus}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Debug Log Display */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Debug Log</h2>
          <button 
            onClick={() => setDebugLog([])} 
            className="text-sm px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Clear Log
          </button>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded h-64 overflow-y-auto font-mono text-sm">
          {debugLog.length > 0 ? (
            debugLog.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No logs yet. Validate a license to see debug information.</div>
          )}
        </div>
      </div>
    </div>
  );
}