'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertCircle, Check, ChevronDown, Search, X, ChevronLeft, ChevronRight, Trash2, Save, Key } from 'lucide-react';
import Cookies from 'js-cookie';
import Navigation from '@/components/navigation';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  id: string;
  onClose: (id: string) => void;
}

interface License {
  key: string;
  _id?: string;
  type: string;
  expiresAt: string;
  generatedAt: string;
  isExpired: boolean;
  discordId?: string;
  hwid?: string;
  clientIp?: string;
  notes?: string;
  blacklisted?: boolean;
  status?: string;
  lastUsed?: string;
  usageCount?: number;
  createdBy?: string;
  updatedAt?: string;
}

const Toast: React.FC<ToastProps> = ({ message, type, id, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose, id]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-zinc-900" 
        role="alert"
        style={{ 
          animation: 'slideIn 0.2s ease-out'
        }}
      >
        <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${
          type === 'success' 
            ? 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200'
            : 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200'
        }`}>
          {type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="sr-only">{type === 'success' ? 'Check icon' : 'Alert icon'}</span>
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-zinc-900 dark:hover:bg-zinc-600"
          onClick={() => onClose(id)}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <X className="w-8 h-8" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/50 border border-zinc-800 rounded-lg ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pb-2 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-zinc-400 mt-1">
    {children}
  </p>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pt-2 ${className}`}>
    {children}
  </div>
);

interface DeleteConfirmationProps {
  isOpen: boolean;
  licenseKey: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ 
  isOpen, 
  licenseKey, 
  onClose, 
  onConfirm,
  isDeleting
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Delete License Key</h3>
        <p className="text-zinc-300 mb-6">
          Are you sure you want to delete the license key: <span className="font-mono text-red-400">{licenseKey}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete License'}
            {!isDeleting && <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

interface PurgeConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPurging: boolean;
}

const PurgeConfirmation: React.FC<PurgeConfirmationProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  isPurging
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Purge Expired Licensess</h3>
        <p className="text-zinc-300 mb-6">
          Are you sure you want to delete all expired free-tier licenses? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
            disabled={isPurging}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors flex items-center gap-2"
            disabled={isPurging}
          >
            {isPurging ? 'Purging...' : 'Purge Licenses'}
            {!isPurging && <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

const LicenseDetails: React.FC<{ license: License }> = ({ license }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-zinc-400">Discord ID</p>
        <p className="font-medium">{license.discordId || 'Unathorized'}</p>
      </div>
      <div>
        <p className="text-sm text-zinc-400">Hardware ID</p>
        <p className="font-medium">{license.hwid || 'Unathorized'}</p>
      </div>
      <div>
        <p className="text-sm text-zinc-400">Client IP</p>
        <p className="font-medium">{license.clientIp || 'Unathorized'}</p>
      </div>
      <div>
        <p className="text-sm text-zinc-400">Status</p>
        <p className="font-medium">{license.status || 'Unathorized'}</p>
      </div>
    </div>
    
    <div className="space-y-2">
      <div>
        <p className="text-sm text-zinc-400">Last Used</p>
        <p className="font-medium">
          {license.lastUsed ? new Date(license.lastUsed).toLocaleString() : 'Never'}
        </p>
      </div>
      <div>
        <p className="text-sm text-zinc-400">Usage Count</p>
        <p className="font-medium">{license.usageCount || 0}</p>
      </div>
      {license.notes && (
        <div>
          <p className="text-sm text-zinc-400">Notes</p>
          <p className="font-medium">{license.notes}</p>
        </div>
      )}
    </div>

    <div className="flex gap-2 flex-wrap">
      {license.blacklisted && (
        <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs">
          Blacklisted
        </span>
      )}
      {license.createdBy && (
        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">
          Created by: {license.createdBy}
        </span>
      )}
      <span className="px-2 py-1 bg-zinc-500/10 text-zinc-400 rounded text-xs">
        Updated: {new Date(license.updatedAt || license.generatedAt).toLocaleString()}
      </span>
    </div>
  </div>
);

const LicenseCard: React.FC<{ 
  license: License; 
  onSelect: (key: string) => void;
  expanded: boolean;
  onToggle: () => void;
  onDelete: (license: License) => void;
}> = ({ license, onSelect, expanded, onToggle, onDelete }) => (
  <div className="p-4 bg-black/40 border border-zinc-800 rounded-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium">{license.key}</p>
        <p className="text-sm text-zinc-400 mt-1">Type: {license.type}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-zinc-400">
          Expires: {new Date(license.expiresAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-zinc-400">
          Generated: {new Date(license.generatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
    
    {expanded && (
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <LicenseDetails license={license} />
      </div>
    )}

    <div className="mt-2 flex items-center gap-2">
      <div className={`px-2 py-1 rounded text-xs ${
        new Date(license.expiresAt) < new Date()
          ? 'bg-red-500/10 text-red-400'
          : 'bg-emerald-500/10 text-emerald-400'
      }`}>
        {new Date(license.expiresAt) < new Date() ? 'Expired' : 'Active'}
      </div>
      <button
        onClick={() => onSelect(license.key)}
        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
      >
        Use this key
      </button>
      <button
        onClick={onToggle}
        className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>
      <button
        onClick={() => onDelete(license)}
        className="text-xs text-red-400 hover:text-red-300 transition-colors ml-auto"
        aria-label="Delete license"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const LicenseManager = () => {
  // Input states
  const [tokenInput, setTokenInput] = useState('');
  const [bypassKeyInput, setBypassKeyInput] = useState('');
  
  // Actual values used for API calls
  const [licenseKey, setLicenseKey] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [bypassKey, setBypassKey] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [selectedField, setSelectedField] = useState<keyof typeof fields>('x-client-ip');
  const [fieldValue, setFieldValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [discordId, setDiscordId] = useState('');
  const [activeKeys, setActiveKeys] = useState<License[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allLicenses, setAllLicenses] = useState<License[]>([]);
  const [loadingAllLicenses, setLoadingAllLicenses] = useState(false);
  const [licenseSearchTerm, setLicenseSearchTerm] = useState('');
  const [expandedLicenses, setExpandedLicenses] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [licensesPerPage] = useState(5);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    license: null as License | null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [purgeConfirmation, setPurgeConfirmation] = useState(false);
  const hasInitializedRef = useRef(false);

  interface ToastState {
    message: string;
    type: 'success' | 'error';
    id: string;
  }
  
  const [toast, setToast] = useState<ToastState | null>(null);

  // Only load cookies once during initialization
  useEffect(() => {
    if (hasInitializedRef.current) return;
    
    const savedBearerToken = Cookies.get('bearerToken');
    const savedBypassKey = Cookies.get('bypassKey');
    
    if (savedBearerToken) {
      setBearerToken(savedBearerToken);
      setTokenInput(savedBearerToken);
    }
    
    if (savedBypassKey) {
      setBypassKey(savedBypassKey);
      setBypassKeyInput(savedBypassKey);
    }
    
    hasInitializedRef.current = true;
  }, []);

  const fetchAllLicenses = useCallback(async () => {
    if (!bearerToken) {
      showToast('Bearer token is required', 'error');
      return;
    }

    // Prevent multiple simultaneous requests
    if (loadingAllLicenses) return;

    setLoadingAllLicenses(true);
    try {
      const headers: { 
        authorization: string;
        'x-bypass-key'?: string;
      } = {
        'authorization': `Bearer ${bearerToken}`
      };

      if (bypassKey) {
        headers['x-bypass-key'] = bypassKey;
      }

      const response = await fetch('https://backend.luau.tech/api/auth/license/list', {
        method: 'GET',
        headers
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAllLicenses(data.keys);
        showToast(`Loaded ${data.keys.length} licenses`);
        setCurrentPage(1);
      } else {
        showToast(data.message || 'Failed to fetch licenses', 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Failed to connect to server', 'error');
    } finally {
      setLoadingAllLicenses(false);
    }
  }, [bearerToken, bypassKey, loadingAllLicenses]);

  const handleAuthenticate = () => {
    setAuthLoading(true);
    
    // Update the actual bearer token and bypass key
    setBearerToken(tokenInput);
    setBypassKey(bypassKeyInput);
    
    // Save to cookies
    if (tokenInput) {
      Cookies.set('bearerToken', tokenInput, { expires: 30 });
    }
    
    if (bypassKeyInput) {
      Cookies.set('bypassKey', bypassKeyInput, { expires: 30 });
    }
    
    // Fetch licenses if bearer token is provided
    if (tokenInput) {
      fetchAllLicenses().finally(() => {
        setAuthLoading(false);
      });
    } else {
      setAuthLoading(false);
    }
  };

  const fields = {
    'x-client-ip': 'Client IP',
    'x-discord-id': 'Discord ID',
    'x-hwid': 'Hardware ID',
    'x-type': 'License Type',
    'x-expires-at': 'Expiration Date'
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ message, type, id });
  };

  const handleToastClose = () => {
    setToast(null);
  };

  const toggleLicenseExpanded = (key: string) => {
    setExpandedLicenses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleDeleteLicense = async () => {
    if (!deleteConfirmation.license || !bearerToken) return;
    
    setIsDeleting(true);
    try {
      const headers: { 
        authorization: string;
        'x-license-key'?: string;
        'x-license-key-id'?: string;
        'x-bypass-key'?: string;
      } = {
        'authorization': `Bearer ${bearerToken}`
      };
  
      if (deleteConfirmation.license._id) {
        headers['x-license-key-id'] = deleteConfirmation.license._id;
      } else {
        headers['x-license-key'] = deleteConfirmation.license.key;
      }
  
      if (bypassKey) {
        headers['x-bypass-key'] = bypassKey;
      }
  
      const response = await fetch('https://backend.luau.tech/api/auth/license/delete', {
        method: 'DELETE',
        headers
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        showToast('License deleted successfully');

        setAllLicenses(prev => prev.filter(license => 
          license._id !== deleteConfirmation.license?._id && 
          license.key !== deleteConfirmation.license?.key
        ));
        setActiveKeys(prev => prev.filter(license => 
          license._id !== deleteConfirmation.license?._id && 
          license.key !== deleteConfirmation.license?.key
        ));
        setDeleteConfirmation({ isOpen: false, license: null });
        
        if (licenseKey === deleteConfirmation.license.key) {
          setLicenseKey('');
        }
      } else {
        showToast(data.message || 'Failed to delete license', 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Failed to connect to server', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePurgeExpiredLicenses = async () => {
    if (!bearerToken) {
      showToast('Bearer token is required', 'error');
      return;
    }

    setIsPurging(true);
    try {
      const response = await fetch('https://backend.luau.tech/api/auth/license/delete/purge', {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${bearerToken}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(`Successfully purged ${data.deletedCount} expired free licenses`);
        fetchAllLicenses();
      } else {
        showToast(data.message || 'Failed to purge licenses', 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Failed to connect to server', 'error');
    } finally {
      setIsPurging(false);
      setPurgeConfirmation(false);
    }
  };

  const handleReset = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const headers: { 
        authorization: string; 
        'x-license-key': string; 
        'x-client-ip': string; 
        'x-bypass-key'?: string 
      } = {
        'authorization': `Bearer ${bearerToken}`,
        'x-license-key': licenseKey,
        'x-client-ip': '0.0.0.0/0'
      };

      if (bypassKey) {
        headers['x-bypass-key'] = bypassKey;
      }

      const response = await fetch('https://backend.luau.tech/api/auth/license/edit', {
        method: 'POST',
        headers
      });

      const data = await response.json();

      if (response.ok) {
        showToast('IP reset successfully');
        fetchAllLicenses();
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Failed to connect to server', 'error');
    }

    setLoading(false);
  };

  const handleUpdate = async () => {
    if (loading) return;
    
    if (!selectedField || !fieldValue) {
      showToast('Please select a field and enter a value', 'error');
      return;
    }

    setLoading(true);

    try {
      const headers: { 
        authorization: string; 
        'x-discord-id': string; 
        'x-license-key': string;
        'x-bypass-key'?: string 
      } & Record<string, string> = {
        'authorization': `Bearer ${bearerToken}`,
        'x-license-key': licenseKey,
        [selectedField]: fieldValue,
        'x-discord-id': ''
      };

      if (bypassKey) {
        headers['x-bypass-key'] = bypassKey;
      }

      const response = await fetch('https://backend.luau.tech/api/auth/license/edit', {
        method: 'POST',
        headers
      });

      const data = await response.json();

      if (response.ok) {
        showToast('License updated successfully');
        fetchAllLicenses();
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Failed to connect to server', 'error');
    }

    setLoading(false);
  };

  const handleDiscordSearch = async () => {
    if (searchLoading) return;
    
    if (!discordId || !bearerToken) {
      showToast('Please enter Discord ID and Bearer Token', 'error');
      return;
    }

    setSearchLoading(true);

    try {
      const headers: {
        authorization: string;
        'x-discord-id': string;
        'x-bypass-key'?: string;
      } = {
        'authorization': `Bearer ${bearerToken}`,
        'x-discord-id': discordId
      };

      if (bypassKey) {
        headers['x-bypass-key'] = bypassKey;
      }

      const response = await fetch('https://backend.luau.tech/api/auth/license/search/discordId', {
        method: 'GET',
        headers
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setActiveKeys(data.licenseKeys);
        showToast(`Found ${data.count} connected license(s)`);
      } else {
        showToast(data.message || 'Failed to fetch licenses', 'error');
        setActiveKeys([]);
      }
    } catch (error) {
      console.log(error);
      showToast('Failed to connect to server', 'error');
      setActiveKeys([]);
    }

    setSearchLoading(false);
  };

  // Filter licenses based on search term
  const filteredLicenses = allLicenses.filter(license => 
    license.key.toLowerCase().includes(licenseSearchTerm.toLowerCase()) ||
    license.type.toLowerCase().includes(licenseSearchTerm.toLowerCase()) ||
    (license.discordId?.toLowerCase() || '').includes(licenseSearchTerm.toLowerCase()) ||
    (license.clientIp?.toLowerCase() || '').includes(licenseSearchTerm.toLowerCase()) ||
    (license.hwid?.toLowerCase() || '').includes(licenseSearchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastLicense = currentPage * licensesPerPage;
  const indexOfFirstLicense = indexOfLastLicense - licensesPerPage;
  const currentLicenses = filteredLicenses.slice(indexOfFirstLicense, indexOfLastLicense);
  const totalPages = Math.ceil(filteredLicenses.length / licensesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased p-6">
      <Navigation/>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          id={toast.id}
          onClose={handleToastClose}
        />
      )}
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        licenseKey={deleteConfirmation.license?.key || ''}
        onClose={() => setDeleteConfirmation({ isOpen: false, license: null })}
        onConfirm={handleDeleteLicense}
        isDeleting={isDeleting}
      />
      <PurgeConfirmation
        isOpen={purgeConfirmation}
        onClose={() => setPurgeConfirmation(false)}
        onConfirm={handlePurgeExpiredLicenses}
        isPurging={isPurging}
      />
      <div className="mt-48 max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin License Manager</h1>
            <p className="text-zinc-400">Manage and monitor license keys</p>
          </div>
          <button
            onClick={() => setPurgeConfirmation(true)}
            disabled={!bearerToken || isPurging}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
              !bearerToken || isPurging
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-amber-500/10 text-amber-300 hover:text-red-200 hover:bg-red-600 '
            } transition-all duration-300 font-medium`}
          >
            <Trash2 className="w-5 h-5" />
            {isPurging ? 'Purging...' : 'Purge Expired Licensess'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Enter your credentials to manage the license</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Bearer Token</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-black/40 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  placeholder="Enter Bearer Token"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">License Key</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/40 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  placeholder="Enter License Key"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Bypass Key (Optional)</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-black/40 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  placeholder="Enter Bypass Key"
                  value={bypassKeyInput}
                  onChange={(e) => setBypassKeyInput(e.target.value)}
                />
              </div>
              
              <button
                onClick={handleAuthenticate}
                disabled={!tokenInput || authLoading}
                className={`w-full px-4 py-3 rounded-lg ${
                  !tokenInput || authLoading
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors flex items-center justify-center gap-2`}
              >
                {authLoading ? 'Authenticating...' : 'Authenticate'}
                {!authLoading && <Key className="w-4 h-4" />}
              </button>
           
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>License Management</CardTitle>
              <CardDescription>Modify and reset license information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between gap-2 w-40 px-4 py-2 bg-black/40 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  >
                    <span>{fields[selectedField]}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-lg">
                      {Object.entries(fields).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedField(key as keyof typeof fields);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-black/40 transition-colors"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <input
                  type="text"
                  className="flex-1 px-4 py-2 bg-black/40 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  placeholder={`Enter ${fields[selectedField]}`}
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  disabled={!bearerToken || !licenseKey || loading}
                  className={`flex-1 px-4 py-2 rounded-lg ${
                    !bearerToken || !licenseKey || loading
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                  } transition-colors flex items-center justify-center gap-2`}
                >
                  {loading ? 'Updating...' : 'Update License'}
                  {!loading && <Save className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={handleReset}
                  disabled={!bearerToken || !licenseKey || loading}
                  className={`flex-1 px-4 py-2 rounded-lg ${
                    !bearerToken || !licenseKey || loading
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  } transition-colors`}
                >
                  {loading ? 'Resetting...' : 'Reset IP'}
                </button>
                <button
                onClick={() => setDeleteConfirmation({ isOpen: true, license: activeKeys.find(key => key.key === licenseKey) || null })}
                disabled={!bearerToken || !licenseKey || loading}
                className={`px-4 py-2 rounded-lg ${
                  !bearerToken || !licenseKey || loading
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                } transition-colors flex items-center justify-center gap-2`}
              >
                {loading ? 'Deleting...' : ''}
                {!loading && <Trash2 className="w-4 h-4" />}
              </button>
              </div>
              
              <hr className="border-zinc-800" />
              
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Discord ID Search</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 bg-black/40 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    placeholder="Enter Discord ID"
                    value={discordId}
                    onChange={(e) => setDiscordId(e.target.value)}
                  />
                  <button
                    onClick={handleDiscordSearch}
                    disabled={!bearerToken || !discordId || searchLoading}
                    className={`px-4 py-2 rounded-lg ${
                      !bearerToken || !discordId || searchLoading
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    } transition-colors flex items-center justify-center gap-2`}
                  >
                    {searchLoading ? 'Searching...' : 'Search'}
                    {!searchLoading && <Search className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {activeKeys.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-zinc-400">Found {activeKeys.length} license(s) for Discord ID: {discordId}</p>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {activeKeys.map((key, i) => (
                      <div 
                        key={i} 
                        className="p-3 bg-black/40 border border-zinc-800 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="font-mono">{key.key}</p>
                          <p className="text-xs text-zinc-400">
                            Type: {key.type} | Expires: {new Date(key.expiresAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => setLicenseKey(key.key)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Use this key
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
           
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>License Database</CardTitle>
              <CardDescription>View and manage all licenses</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                <input
                  type="text"
                  placeholder="Search licenses..."
                  value={licenseSearchTerm}
                  onChange={(e) => setLicenseSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-black/40 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 w-60"
                />
              </div>
              <button
                onClick={fetchAllLicenses}
                disabled={!bearerToken || loadingAllLicenses}
                className={`px-4 py-2 rounded-lg ${
                  !bearerToken || loadingAllLicenses
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                } transition-colors flex items-center justify-center`}
              >
                {loadingAllLicenses ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingAllLicenses ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {currentLicenses.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-zinc-400">No licenses found</p>
                    {!bearerToken && (
                      <p className="text-sm text-zinc-500 mt-2">Please authenticate to view licenses</p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {currentLicenses.map((license) => (
                        <LicenseCard
                          key={license._id || license.key}
                          license={license}
                          onSelect={(key) => setLicenseKey(key)}
                          expanded={expandedLicenses.has(license.key)}
                          onToggle={() => toggleLicenseExpanded(license.key)}
                          onDelete={(license) => setDeleteConfirmation({ isOpen: true, license })}
                        />
                      ))}
                    </div>
                    
                    {filteredLicenses.length > licensesPerPage && (
                      <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-zinc-400">
                          Showing {indexOfFirstLicense + 1}-{Math.min(indexOfLastLicense, filteredLicenses.length)} of {filteredLicenses.length} licenses
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg ${
                              currentPage === 1
                                ? 'text-zinc-700 cursor-not-allowed'
                                : 'text-zinc-400 hover:bg-zinc-800'
                            }`}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Show pages around current page
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={i}
                                onClick={() => paginate(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                  currentPage === pageNum
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'text-zinc-400 hover:bg-zinc-800'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          
                          <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg ${
                              currentPage === totalPages
                                ? 'text-zinc-700 cursor-not-allowed'
                                : 'text-zinc-400 hover:bg-zinc-800'
                            }`}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LicenseManager;