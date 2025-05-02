'use client';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import { Shield, Lock, FileText, Info } from "lucide-react";
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loadingScreen';

const SecurityPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen text-white antialiased">
        <Navbar />
        <LoadingScreen/>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-32">
          <div className="text-center">
            <h1 className="text-4xl font-medium mb-4">Security & Legal</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white antialiased">
      <Navbar />
      <LoadingScreen onComplete={() => {
          console.log(`
 ________   _________   ________   ________   ________ 

                                                                         

      ______                             
     / _____)_                          
    ( (_____| |_ _____  ____  ____ _   _ 
    \____ (_   _|____ |/ ___) ___)| | | |
     _____) )| |_/ ___ | |  | |   | |_| |
    (______/  \__)_____|_|  |_|    \__  |
                                  (____/ 

    discord.gg/luau | @Starry | luau.tech



 ________   _________   ________   ________   ________ 


 Please note that this is a work in progress, report any bugs or issues to the discord server.

`);
      }}/>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-32">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-medium mb-6">Security & Legal</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring a secure experience while using our services. Please review our policies below.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 mb-16">
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-accent" />
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#privacy-policy" className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms-of-service" className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
              Contact Us
            </a>
          </div>
        </div>

        <div className="space-y-20">
       
          <section id="privacy-policy" className="space-y-8 pt-16 -mt-16">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <Shield className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-medium">Privacy Policy</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <p className="text-sm">Last updated: January 28, 2025</p>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">Introduction</h3>
                <p className="leading-relaxed">
                  At our company, we value your privacy and the importance of safeguarding your data. This Privacy Policy describes our privacy practices and how we collect, store, access, and process information relating to individuals. In this Policy, &quot;Personal Data&quot; refers to any information that on its own, or in combination with other available information, can distinguish an individual.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">Information We Collect</h3>
                <div className="bg-zinc-900/50 rounded-xl p-6 space-y-4">
                  <p>We collect and process the following information when you use our website:</p>
                  <ul className="space-y-3 pl-6">
                    <li className="list-disc">IP addresses (for security and access control purposes)</li>
                    <li className="list-disc">HWID and User-Agent Headers:
                      <ul className="space-y-2 pl-6 mt-2">
                      <li className="list-disc">Hardware ID (HWID): A unique identifier based on your computer&apos;s hardware configuration</li>
                      <li className="list-disc">User-Agent: Browser and system information including browser type, version, and operating system</li>
                      </ul>
                    </li>
                    <li className="list-disc">Discord Profile Information:
                      <ul className="space-y-2 pl-6 mt-2">
                      <li className="list-disc">Username</li>
                      <li className="list-disc">User ID</li>
                      <li className="list-disc">Account creation date</li>
                      <li className="list-disc">Guild membership status</li>
                      <li className="list-disc">Active Guilds</li>
                      </ul>
                    </li>
                    <li className="list-disc">Usage data and timestamps</li>
                    <li className="list-disc">Information you provide when registering or filling out forms</li>
                    <li className="list-disc">Cookie data (for website functionality and user preferences)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">How We Use Your Data</h3>
                <div className="bg-zinc-900/50 rounded-xl p-6 space-y-4">
                  <ul className="space-y-3 pl-6">
                    <li className="list-disc">To provide and maintain our services</li>
                    <li className="list-disc">To prevent unauthorized access and protect against abuse</li>
                    <li className="list-disc">To improve user experience and website functionality</li>
                    <li className="list-disc">To communicate with you about service-related matters</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Terms of Service Section */}
          <section id="terms-of-service" className="space-y-8 pt-16 -mt-16">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <FileText className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-medium">Terms of Service</h2>
            </div>

            <div className="space-y-8 text-gray-300">
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">Acceptance of Terms</h3>
                <div className="bg-zinc-900/50 rounded-xl p-6">
                  <p className="leading-relaxed">
                    By accessing and using our website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">User Responsibilities</h3>
                <div className="bg-zinc-900/50 rounded-xl p-6 space-y-4">
                  <ul className="space-y-3 pl-6">
                    <li className="list-disc">Provide accurate and complete information when using our services</li>
                    <li className="list-disc">Maintain the confidentiality of your account credentials</li>
                    <li className="list-disc">Notify us immediately of any unauthorized access</li>
                    <li className="list-disc">Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">Prohibited Activities</h3>
                <div className="bg-zinc-900/50 rounded-xl p-6 space-y-4">
                  <ul className="space-y-3 pl-6">
                    <li className="list-disc">Attempting to circumvent or violate website security</li>
                    <li className="list-disc">Flooding or spamming our services</li>
                    <li className="list-disc">Unauthorized access attempts or security scanning</li>
                    <li className="list-disc">Any activity that disrupts or interferes with our services</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">Updates to Terms</h3>
                <div className="bg-zinc-900/50 rounded-xl p-6">
                  <p className="leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes indicates your acceptance of the updated terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="space-y-8 pt-16 -mt-16">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <Lock className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-medium">Contact Us</h2>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 text-center">
              <p className="text-gray-300 text-lg mb-6">
                If you have any questions about our Privacy Policy or Terms of Service, please don&apos;t hesitate to reach out through our Discord server.
              </p>
              <a 
                href="https://luau.tech/d?server=luau" 
                target="_blank"
                className="inline-block px-8 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-lg"
              >
                Join our Discord
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;