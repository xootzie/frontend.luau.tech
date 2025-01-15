'use client';
import React, { useState } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';

const APITestPage = () => {
  const [response, setResponse] = useState({
    status: 0,
    data: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authToken, setAuthToken] = useState('0');
  
  const testEndpoint = async (customHeaders = {}) => {
    setLoading(true);
    setError('');
    
    try {
      const resp = await fetch('http://localhost:3001/api/auth/bootstrapper', {
        headers: {
          'Authorization': authToken,
          ...customHeaders
        }
      });
      
      const contentType = resp.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        const data = await resp.json();
        setResponse({
          status: resp.status,
          data: data
        });
      } else {
        const text = await resp.text();
        setResponse({
          status: resp.status,
          data: text
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4 bg-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100">API Test Interface</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium block text-slate-300">Authorization Token</label>
            <input
              type="text"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              placeholder="Enter auth token"
              className="w-full max-w-xs px-3 py-2 bg-slate-700 border border-slate-600 rounded-md 
                text-slate-100 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <div className="flex space-x-2">
              <button 
                onClick={() => testEndpoint()}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Test Normal Request
              </button>
              
              
            </div>
          </div>

          {loading && (
            <div className="text-sm text-slate-400">
              Loading...
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-900/50 border border-red-700 rounded-md flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {response.status > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-300">Status:</span>
                <span className={`flex items-center ${
                  response.status >= 200 && response.status < 300 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {response.status}
                  {response.status >= 200 && response.status < 300 ? 
                    <Check className="ml-1 h-4 w-4" /> : 
                    <X className="ml-1 h-4 w-4" />
                  }
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="text-sm font-medium text-slate-300">Response:</span>
                <pre className="bg-slate-700 p-4 rounded-lg overflow-x-auto text-slate-100">
                  {typeof response.data === 'string' 
                    ? response.data 
                    : JSON.stringify(response.data, null, 2)
                  }
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APITestPage;