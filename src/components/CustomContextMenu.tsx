"use client";
import React from "react";

export default function CustomContextMenu() {
  const [show, setShow] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const [hasSelection, setHasSelection] = React.useState(false);
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(null);
  const [isCodeElement, setIsCodeElement] = React.useState(false);
  const [codeContent, setCodeContent] = React.useState("");

  React.useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let closestSelectableElement: HTMLElement | null = null;
      let isCode = false;
      let codeText = "";
      
      // Check if the element or any of its parents is a code element
      let element: HTMLElement | null = target;
      while (element) {
        if (element.tagName === 'CODE') {
          isCode = true;
          // For code elements, get the text without formatting
          codeText = element.innerText || element.textContent || "";
          closestSelectableElement = element;
          break;
        }
        
        // Also check for other selectable elements
        if (
          element.tagName === 'INPUT' ||
          element.tagName === 'TEXTAREA' ||
          element.getAttribute('contenteditable') === 'true'
        ) {
          closestSelectableElement = element;
          if (!isCode) break;
        }
        
        element = element.parentElement;
      }
      
      // If no code or input element was found, check direct element
      if (!closestSelectableElement) {
        const isSelectableElement =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.getAttribute('contenteditable') === 'true';
        
        if (isSelectableElement) {
          closestSelectableElement = target;
        }
      }
      
      if (closestSelectableElement) {
        e.preventDefault();
        
        // Check if there's selected text
        let hasText = false;
        
        if (isCode) {
          hasText = true; // For code elements, we'll always allow copying
        } else if (closestSelectableElement.tagName === 'INPUT' || closestSelectableElement.tagName === 'TEXTAREA') {
          const inputElement = closestSelectableElement as HTMLInputElement | HTMLTextAreaElement;
          hasText = inputElement.selectionStart !== inputElement.selectionEnd;
        } else {
          const selection = window.getSelection();
          hasText = !!selection && selection.toString().length > 0;
        }
        
        setHasSelection(hasText);
        setTargetElement(closestSelectableElement);
        setIsCodeElement(isCode);
        setCodeContent(codeText);
        setPosition({ x: e.clientX, y: e.clientY });
        setShow(true);
      } else {
        e.preventDefault();
        setShow(false);
      }
    };
    
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
   
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleCut = async () => {
    try {
      if (hasSelection && !isCodeElement) {
        // Get the selected text
        let text = '';
        if (targetElement) {
          if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
            const input = targetElement as HTMLInputElement | HTMLTextAreaElement;
            text = input.value.substring(input.selectionStart || 0, input.selectionEnd || 0);
            
            // Remove the selected text
            const start = input.selectionStart || 0;
            const end = input.selectionEnd || 0;
            input.value = input.value.substring(0, start) + input.value.substring(end);
            input.setSelectionRange(start, start);
          } else {
            const selection = window.getSelection();
            if (selection) {
              text = selection.toString();
              document.execCommand('cut'); // Still needed for contenteditable
            }
          }
        }
        
        // Write to clipboard
        await navigator.clipboard.writeText(text);
      }
    } catch (err) {
      console.error('Failed to cut text: ', err);
    }
    
    setShow(false);
  };

  const handleCopy = async () => {
    try {
      if (isCodeElement) {
        // Copy the whole code block
        await navigator.clipboard.writeText(codeContent);
      } else if (hasSelection) {
        // Get the selected text
        let text = '';
        if (targetElement) {
          if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
            const input = targetElement as HTMLInputElement | HTMLTextAreaElement;
            text = input.value.substring(input.selectionStart || 0, input.selectionEnd || 0);
          } else {
            const selection = window.getSelection();
            if (selection) {
              text = selection.toString();
            }
          }
        }
        
        // Write to clipboard
        await navigator.clipboard.writeText(text);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    setShow(false);
  };

  const handlePaste = async () => {
    try {
      // Don't paste into code elements
      if (isCodeElement) {
        setShow(false);
        return;
      }
      
      const text = await navigator.clipboard.readText();
      
      if (targetElement) {
        if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
          const input = targetElement as HTMLInputElement | HTMLTextAreaElement;
          const start = input.selectionStart || 0;
          const end = input.selectionEnd || 0;
          
          // Replace selected text with clipboard content
          input.value = input.value.substring(0, start) + text + input.value.substring(end);
          input.setSelectionRange(start + text.length, start + text.length);
          input.focus();
        } else {
          // For contenteditable, we still need to use document.execCommand
          document.execCommand('paste');
        }
      }
    } catch (err) {
      console.error('Failed to paste text: ', err);
    }
    
    setShow(false);
  };

  const handleSelectAll = () => {
    if (targetElement) {
      if (isCodeElement) {
        // Select all text in code block
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(targetElement);
        selection?.removeAllRanges();
        selection?.addRange(range);
      } else if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
        const input = targetElement as HTMLInputElement | HTMLTextAreaElement;
        input.select();
        input.focus();
      } else {
        // For contenteditable
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(targetElement);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
    
    setShow(false);
  };

  if (!show) return null;
  
  return (
    <div
      ref={menuRef}
      className="fixed backdrop-blur-md bg-accent/30 shadow-lg rounded-md border border-accent/20 py-2 z-50 font-mono"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        minWidth: '140px',
        boxShadow: '0 0 15px 2px rgba(var(--accent), 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {!isCodeElement && (
        <button
          disabled={!hasSelection}
          className={`w-full text-left px-4 py-2 ${hasSelection ? 'hover:bg-accent/40 text-white' : 'text-gray-400'} text-sm flex items-center transition-colors duration-200`}
          onClick={handleCut}
        >
          <span className="mr-2">✂️</span> Cut
        </button>
      )}
      
      <button
        disabled={!hasSelection && !isCodeElement}
        className={`w-full text-left px-4 py-2 ${hasSelection || isCodeElement ? 'hover:bg-accent/40 text-white' : 'text-gray-400'} text-sm flex items-center transition-colors duration-200`}
        onClick={handleCopy}
      >
        <span className="mr-2">📋</span> {isCodeElement ? "Copy Code" : "Copy"}
      </button>
      
      {!isCodeElement && (
        <button
          className="w-full text-left px-4 py-2 hover:bg-accent/40 text-white text-sm flex items-center transition-colors duration-200"
          onClick={handlePaste}
        >
          <span className="mr-2">📌</span> Paste
        </button>
      )}
      
      <hr className="my-1 border-accent/20" />
      
      <button
        className="w-full text-left px-4 py-2 hover:bg-accent/40 text-white text-sm flex items-center transition-colors duration-200"
        onClick={handleSelectAll}
      >
        <span className="mr-2">🔍</span> {isCodeElement ? "Select All Code" : "Select All"}
      </button>
    </div>
  );
}