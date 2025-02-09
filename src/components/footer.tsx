import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black relative">
    
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="mb-8 md:mb-0 max-w-md">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/brand/icon.png"
                alt="Starry Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span 
                className="text-2xl text-accent font-semibold"
                style={{ filter: 'drop-shadow(0 0 40px #5486fc)' }}
              >
                Starry
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Experience the future of Exploiting with Starry.
            </p>
    
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link
                href="/security#terms-of-service"
                className="hover:text-accent transition-colors duration-300 border-b border-transparent hover:border-accent pb-1"
              >
                Terms of Service
              </Link>
              <Link
                href="/security#privacy-policy"
                className="hover:text-accent transition-colors duration-300 border-b border-transparent hover:border-accent pb-1"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-4">
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-white/5 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <span className="text-sm text-gray-400">
            &copy; {currentYear} Starry. All rights reserved.
          </span>

          <a
            href="https://vercel.com?utm_source=starry&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Image
              src="/images/brand/_vercel/vercel.svg"
              alt="Powered by Vercel"
              width={100}
              height={32}
              className="w-auto h-8 filter hover:drop-shadow-2xl transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;