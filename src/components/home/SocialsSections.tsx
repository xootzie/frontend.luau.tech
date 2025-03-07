
'use client';

import { SocialData } from '@/types/SocialData';
import SocialCard from './SocialCard';

interface SocialsSectionProps {
  socials: SocialData[];
}

const SocialsSection = ({ socials }: SocialsSectionProps) => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-medium mb-4">Join the Community</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Meet & connect with our lovely community, get script news & updates, and more!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {socials.map((social, index) => (
          <SocialCard key={index} {...social} />
        ))}
      </div>
    </section>
  );
};

export default SocialsSection;