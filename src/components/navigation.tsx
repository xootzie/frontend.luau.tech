import React from 'react';
import { ArrowRight, Home, CreditCard, Newspaper, MessageCircle, Key } from "lucide-react";
import Link from 'next/link';

const NavLink = ({ href, children, icon: Icon }) => (
  <Link 
    href={href} 
    className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/5"
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </Link>
);

const Navigation = () => {
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
    { href: "/news", label: "Updates & News", icon: Newspaper },
    { href: "/d?server=luau", label: "Discord Server", icon: MessageCircle },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <nav className="rounded-full border border-white/10 bg-black/5 backdrop-blur-xl shadow-lg">
        <div className="px-6 py-3">
          <div className="flex items-center">
            {/* Logo Section - Using flex-none to prevent shrinking */}
            <div className="flex-none w-48">
              <Link 
                href="/" 
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
              >
                <img 
                  src="/images/brand/icon.png" 
                  alt="Starry Logo" 
                  className="w-8 h-8"
                />
                <span className="-mt-1 text-accent text-xl font-medium">Starry</span>
              </Link>
            </div>

            {/* Navigation Links - Using flex-1 and justify-center for true centering */}
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-2">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} icon={item.icon}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Action Buttons - Using flex-none to prevent shrinking */}
            <div className="flex-none w-48 flex items-center justify-end space-x-4">
              <Link 
                href="/key" 
                className="px-4 py-1.5 rounded-full bg-midnight text-white text-sm hover:bg-opacity-75 transition-colors flex items-center gap-2  transform duration-200"
              >
                <Key className="w-4 h-4" />
                License Key
              </Link>
              
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;