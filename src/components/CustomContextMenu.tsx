'use client';
import React, { useEffect, useState, useRef } from 'react';

const CustomContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasSelection, setHasSelection] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // Default settings if userSettings is not available
  const defaultSettings = {
    contextMenu: true // Default to true
  };
  // Use this state instead of directly accessing a property that might be null
  const [userSettings, setUserSettings] = useState(defaultSettings);

  useEffect(() => {
    // Try to load settings from localStorage
    try {
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setUserSettings(parsedSettings);
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
      // Keep using default settings if there's an error
    }

    // Handle context menu
    const handleContextMenu = (e: MouseEvent) => {
      // Check if context menu is enabled in user settings
      if (!userSettings.contextMenu) return;
      
      e.preventDefault();
      
      // Check if there's text selected
      const selectedText = window.getSelection()?.toString() || '';
      setHasSelection(selectedText.length > 0);
      
      // Calculate position, ensuring menu stays within viewport
      const x = Math.min(e.clientX, window.innerWidth - 200); // Assume menu width ~200px
      const y = Math.min(e.clientY, window.innerHeight - 150); // Reduced height assumption since we only have one option
      
      setPosition({ x, y });
      setIsVisible(true);
    };

    // Handle click outside to close
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleOutsideClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [userSettings]); // Re-run effect when userSettings changes

  // Function to handle copy action
  const handleCopy = () => {
    // Get selected text
    const selectedText = window.getSelection()?.toString();
    
    if (selectedText) {
      navigator.clipboard.writeText(selectedText)
        .then(() => {
          console.log('Text copied to clipboard');
          setIsVisible(false);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    } else {
      console.log('No text selected to copy');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={menuRef}
      className="fixed z-50 bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg p-2 w-48"
      style={{ top: position.y, left: position.x }}
    >
      <div className="space-y-1">
        <button 
          onClick={hasSelection ? handleCopy : undefined}
          disabled={!hasSelection}
          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center ${
            hasSelection 
              ? 'text-white hover:bg-white/10 cursor-pointer' 
              : 'text-gray-500 cursor-not-allowed'
          }`}
        >
          <svg 
            className={`w-4 h-4 mr-2 ${hasSelection ? '' : 'opacity-50'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copy
        </button>
      </div>
    </div>
  );
};

export default CustomContextMenu;