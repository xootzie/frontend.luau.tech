'use client';
import React, { useState } from 'react';
import { Home, CreditCard, Code, Key, Menu, X, LucideIcon, Newspaper } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import UpdateNotification from '@/components/updateBanner';

const showBanner = true;
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon: Icon, className = "", onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    if (onClick) onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group flex items-center gap-2.5 text-sm text-gray-400/80 transition-all duration-300
        hover:text-white px-4 py-2 rounded-full
        transform hover:scale-105 active:scale-95
        ${isClicked ? 'scale-95' : ''}
        ${className}`}
    >
      {Icon && (
        <Icon className="w-4 h-4 transition-all duration-300 group-hover:stroke-2" />
      )}
      <span className="transition-all duration-300 group-hover:tracking-wide">
        {children}
      </span>
    </Link>
  );
};

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
    { href: "/executors", label: "Executors", icon: Code },
    { href: "/changelog", label: "Changelog", icon: Newspaper },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <nav className="rounded-2xl border-2 border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl
          ring-1 ring-white/5 ring-offset-0">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between md:justify-start">
              <div className="flex-none w-48">
                <Link
                  href="/"
                  className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/images/brand/icon.png"
                    alt="Starry Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 transition-transform duration-300 hover:rotate-12"
                  />
                  <span className="text-accent text-lg font-medium tracking-wide">Starry</span>
                </Link>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/5 relative z-50 transition-all duration-300
                  transform hover:scale-110 active:scale-95"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>

              <div className="hidden md:flex flex-1 justify-center">
                <div className="flex space-x-1">
                  {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href} icon={item.icon}>
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex flex-none w-48 items-center justify-end">
                <Link
                  href="/key"
                  className="px-5 py-2 rounded-full bg-white/5 text-white text-sm
                    hover:bg-white/10 transition-all duration-300 flex items-center gap-2.5
                    transform hover:scale-105 active:scale-95
                    hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                    border border-white/10 hover:border-white/20
                    backdrop-blur-sm"
                >
                  <Key className="w-4 h-4" strokeWidth={2} />
                  <span className="transition-all duration-300 hover:tracking-wide">Get License Key</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-2xl z-40 md:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="space-y-8 text-center">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                className="text-lg !px-8"
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              href="/key"
              onClick={closeMenu}
              className="mt-12 px-8 py-3 rounded-full bg-white/5 text-white text-lg
                hover:bg-white/10 transition-all duration-300 flex items-center gap-3 justify-center
                transform hover:scale-105 active:scale-95 
                hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                border border-white/10 hover:border-white/20"
            >
              <Key className="w-5 h-5" />
              <span className="transition-all duration-300 hover:tracking-wide">Get License Key</span>
            </Link>
          </div>
          
        </div>
      </div>
            
      {showBanner && <UpdateNotification />}
      
    </>
  );
};

export default Navigation;