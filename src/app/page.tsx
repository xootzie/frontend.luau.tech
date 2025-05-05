'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import LoadingScreen from '@/components/loadingScreen';
import HeroSection from '@/components/hero';
import GameCarousel from '@/components/home/GameSection/GameCarousel';
import ScreenshotGallery from '@/components/home/ScreenShotGallery';

import GradientDivider from '@/components/ui/divider';
import { games } from '@/lib/data';

const HomePage = () => {
  return (
    <div className="min-h-screen text-white antialiased">
      <Navbar />
      <LoadingScreen />
      <HeroSection />
      <GameCarousel games={games} />
      <GradientDivider />
      <ScreenshotGallery />
     
      <Footer />
    </div>
  );
};

export default HomePage;