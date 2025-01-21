'use client';
import React, { useState } from 'react';
import { Home, CreditCard, Code, MessageCircle, Key, Menu, X, LucideIcon } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

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
      className={`flex items-center gap-2 text-sm text-gray-400 transition-all duration-200 px-3 py-2 rounded-md
        hover:text-accent hover:bg-white/5
        transform hover:scale-105 active:scale-95
        ${isClicked ? 'scale-95' : ''}
        ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
      {children}
    </Link>
  );
};

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
    { href: "/executors", label: "Executors", icon: Code },
    { href: "/d?server=luau", label: "Discord Server", icon: MessageCircle },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <nav className="rounded-full border border-white/10 bg-black/5 backdrop-blur-xl shadow-lg">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between md:justify-start">
              <div className="flex-none w-48">
                <Link
                  href="/"
                  className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/images/brand/icon.png"
                    alt="Starry Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="-mt-1 text-accent text-xl font-medium">Starry</span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-white/5 relative z-50 transition-all duration-200
                  transform hover:scale-110 active:scale-95"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-400" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Desktop navigation */}
              <div className="hidden md:flex flex-1 justify-center">
                <div className="flex space-x-2">
                  {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href} icon={item.icon}>
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex flex-none w-48 items-center justify-end space-x-4">
                <Link
                  href="/key"
                  className="px-4 py-1.5 rounded-full bg-midnight text-white text-sm 
                    hover:bg-opacity-75 transition-all duration-200 flex items-center gap-2
                    transform hover:scale-110 active:scale-95 hover:shadow-lg "
                >
                  <Key className="w-4 h-4" />
                  License Key
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="space-y-6 text-center">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                className="text-lg"
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              href="/key"
              onClick={closeMenu}
              className="mt-8 px-6 py-2 rounded-full bg-midnight text-white text-lg
                hover:bg-opacity-75 transition-all duration-200 flex items-center gap-2 justify-center
                transform hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Key className="w-5 h-5" />
              License Key
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;