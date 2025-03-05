'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {  Globe, Loader2 } from 'lucide-react';
import Navbar from '@/components/navigation';
import Footer from '@/components/footer';
import LoadingScreen from '@/components/loadingScreen';
import { motion } from 'framer-motion';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  dateEarned: string;
  thumbnailImage: string;
  pdfPath: string;
  description?: string;
}

const certifications: Certification[] = [
  {
    id: 'cerit-itf-plus',
    title: 'CompTIA iTF+',
    issuer: 'Online Tech Academy',
    dateEarned: '03/05/2025',
    thumbnailImage: '/images/certifications/ITFplusLogoCertified.png',
    pdfPath: '/images/certifications/CompTIAITFundamentaITFplusCertificationcertificate.pdf',
    description: 'Comprehensive IT Fundamentals Certification'
  },
];

const CertificationCard: React.FC<{ certification: Certification }> = ({ certification }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleCertificateView = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        window.open(certification.pdfPath, '_blank');
      }, Math.random() * 2000);
    };

    return (
      <motion.div 
        className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group/card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-white">{certification.title}</h3>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Image 
              src={certification.thumbnailImage} 
              alt={certification.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          </motion.div>
          <div className="text-sm text-zinc-400">
            <p>Issued by: {certification.issuer}</p>
            <p>Earned on: {new Date(certification.dateEarned).toLocaleDateString()}</p>
            {certification.description && <p className="mt-2">{certification.description}</p>}
          </div>
          <a 
            href={certification.pdfPath}
            onClick={handleCertificateView}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors inline-block text-center relative"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Loading certificate...</span>
              </div>
            ) : (
              <span>View Certificate</span>
            )}
          </a>
        </div>
      </motion.div>
    );
  };

const DiscordProfile: React.FC = () => {
  interface DiscordProfileData {
    discord_user: {
      id: string;
      username: string;
      avatar: string;
      global_name?: string;
    };
    discord_status: string;
    activities: { name: string }[];
  }

  const [profile, setProfile] = useState<DiscordProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscordProfile = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/691995909634129941`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch Discord profile');
        }

        const data = await response.json();
        
        setProfile(data.data);
      } catch (err) {
        console.error('Error fetching Discord profile:', err);
        setError('Could not fetch Discord profile');
      }
    };

    fetchDiscordProfile();
  }, []);

  if (error) {
    return (
      <motion.div 
        className="bg-zinc-900 rounded-lg p-6 text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {error}
      </motion.div>
    );
  }

  if (!profile) {
    return (
      <motion.div 
        className="bg-zinc-900 rounded-lg p-6 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-16 bg-zinc-800 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-zinc-800 rounded"></div>
          <div className="h-4 bg-zinc-800 rounded"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-zinc-900 rounded-lg shadow-md p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src={`https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}.png`} 
            alt={profile.discord_user.username}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-zinc-900 
            ${profile.discord_status === 'online' ? 'bg-green-500' : 
              profile.discord_status === 'idle' ? 'bg-yellow-500' : 
              profile.discord_status === 'dnd' ? 'bg-red-500' : 'bg-zinc-500'}`} 
          />
        </motion.div>
        <div>
          <h3 className="text-xl font-semibold text-white">{profile.discord_user.global_name || profile.discord_user.username}</h3>
          <p className="text-zinc-400">@{profile.discord_user.username}</p>
        </div>
      </div>
      <div className="space-y-2 text-zinc-300">
        {profile.activities && profile.activities.length > 0 && profile.activities.map((activity: string, index: number) => (
          <motion.div 
            key={index} 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <Globe size={16} className="text-blue-500" />
            <span>{activity.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function AboutMePage() {
  const [, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  return (
    <div className="text-white antialiased">
      <Navbar />
      <LoadingScreen onComplete={handleLoadingComplete} />
      
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mt-14 max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              className="text-6xl font-medium text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About Me
            </motion.h1>
            <motion.p 
              className="text-zinc-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Learn more about my experience, certifications and connect with me
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
    
        <motion.div 
          className="bg-zinc-900 shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ duration: 0.3 }}
          >
            <Image 
              src="/profile-picture.jpg" 
              alt="Your Profile" 
              width={250}
              height={250}
              className="rounded-full object-cover w-64 h-64 border-4 border-zinc-800"
            />
          </motion.div>
          <div>
            <motion.h1 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Zadin
            </motion.h1>
            <motion.p 
              className="text-xl text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Also known as Zade and @xootzie
            </motion.p>
            <motion.p 
              className="text-zinc-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              A passionate developer with a strong focus on internet security, coding, and web security. 
              I also have a keen interest in hardware and a deep love for working with software.
            </motion.p>
            <div className="space-y-2 text-zinc-300">
              {['🌍 Location: Greenfield, Ohio', '🚀 Interests: Web Development, Technology, Networking'].map((item, i) => (
                <motion.p 
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                >
                  {item}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl font-medium mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connect With Me
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div 
                className="bg-zinc-900 rounded-lg shadow-md p-6"
                whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 text-white text-lg">Contact Information</h3>
                    <div className="space-y-3 text-zinc-400">
                      {[
                        { label: 'Email:', value: 'your.email@example.com' },
                        { label: 'Phone:', value: '+1 (123) 456-7890' }
                      ].map((item, i) => (
                        <motion.p 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <span className="w-24">{item.label}</span> {item.value}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 text-white text-lg">Social Links</h3>
                    <div className="space-y-3 text-zinc-400">
                      {[
                        { label: 'GitHub:', value: 'github.com/yourusername' },
                        { label: 'LinkedIn:', value: 'linkedin.com/in/yourusername' },
                        { label: 'Twitter:', value: '@yourusername' }
                      ].map((item, i) => (
                        <motion.p 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <span className="w-24">{item.label}</span> {item.value}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <DiscordProfile />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <motion.h2 
              className="text-2xl font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Certifications
            </motion.h2>
           
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <CertificationCard certification={cert} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}