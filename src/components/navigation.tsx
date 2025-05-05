'use client';
import React, { useState } from 'react';
import { Home, CreditCard, Code, Key, Menu, X, LucideIcon, Newspaper } from "lucide-react";
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
      className={`group flex items-center gap-2.5 text-sm text-gray-300/80 transition-all duration-300
        hover:text-[#fb97c6] px-4 py-2 rounded-full
        transform hover:scale-105 active:scale-95
        ${isClicked ? 'scale-95' : ''}
        ${className}`}
    >
      {Icon && (
        <Icon className="w-4 h-4 transition-all duration-300 group-hover:stroke-[#fb97c6] group-hover:stroke-2" />
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
     <div className="fixed top-0 left-0 w-full bg-[#fb97c6]/20 text-white text-center py-1 z-50 backdrop-blur-sm border-b border-[#fb97c6]/30">
      <p className="text-xs font-medium tracking-wide">THIS IS A PREVIEW OF STARLIGHT WEBSITE</p>
    </div>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <nav className="rounded-2xl border-2 border-[#fb97c6]/20 bg-black/40 backdrop-blur-xl shadow-2xl
          ring-1 ring-[#fb97c6]/10 ring-offset-0 shadow-[#fb97c6]/5">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between md:justify-start">
              <div className="flex-none w-48">
                <Link
                  href="/"
                  className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/images/brand/icon.png"
                    alt="Starlight Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 transition-transform duration-300 hover:rotate-12"
                  />
                  <span className="text-[#fb97c6] text-lg font-medium tracking-wide">Starlight</span>
                </Link>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-[#fb97c6]/10 relative z-50 transition-all duration-300
                  transform hover:scale-110 active:scale-95"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-[#fb97c6]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#fb97c6]" />
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
                  className="px-5 py-2 rounded-full bg-[#fb97c6]/10 text-white text-sm
                    hover:bg-[#fb97c6]/20 transition-all duration-300 flex items-center gap-2.5
                    transform hover:scale-105 active:scale-95
                    hover:shadow-[0_0_30px_rgba(251,151,198,0.2)]
                    border border-[#fb97c6]/20 hover:border-[#fb97c6]/40
                    backdrop-blur-sm"
                >
                  <Key className="w-4 h-4 text-[#fb97c6]" strokeWidth={2} />
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
              className="mt-12 px-8 py-3 rounded-full bg-[#fb97c6]/10 text-white text-lg
                hover:bg-[#fb97c6]/20 transition-all duration-300 flex items-center gap-3 justify-center
                transform hover:scale-105 active:scale-95 
                hover:shadow-[0_0_30px_rgba(251,151,198,0.2)]
                border border-[#fb97c6]/20 hover:border-[#fb97c6]/40"
            >
              <Key className="w-5 h-5 text-[#fb97c6]" />
              <span className="transition-all duration-300 hover:tracking-wide">Get License Key</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;