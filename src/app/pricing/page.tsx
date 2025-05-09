'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import { Check, X, Loader2 } from 'lucide-react';
import LoadingScreen from '@/components/loadingScreen';
import Image from 'next/image';
import PricingHero from '@/components/pricinghero';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Feature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  buttonText: string;
  disabled: boolean;
  isPopular?: boolean;
  paymentMethods?: React.ReactNode;
}

interface PaymentIconProps {
  src: string;
  alt: string;
  className?: string;
}

interface PricingCardProps {
  tier: PricingTier;
  onSelect: (tier: PricingTier) => void;
  isSelected?: boolean;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const checkWindowStatus = useCallback(() => {
    if (paymentWindow && (paymentWindow.closed || !paymentWindow.document)) {
      setPaymentWindow(null);
      setIsProcessing(false);
      onClose();
      return true;
    }
    return false;
  }, [paymentWindow, onClose]);

  useEffect(() => {
    if (!paymentWindow) return;

    const timer = setInterval(checkWindowStatus, 300);
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkWindowStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkWindowStatus);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkWindowStatus);
    };
  }, [paymentWindow, checkWindowStatus]);

  useEffect(() => {
    if (isOpen && !paymentWindow && !isProcessing) {
      try {
        setIsProcessing(true);
        const width = 1200;
        const height = 700;
        const screenLeft = window.screenLeft || window.screenX;
        const screenTop = window.screenTop || window.screenY;
        const left = Math.max(0, screenLeft + (window.outerWidth - width) / 2);
        const top = Math.max(0, screenTop + (window.outerHeight - height) / 2);

        const newWindow = window.open(
          'https://purchase.luau.tech/b/9AQcNQbCH33sa2I7ss',
          '_blank',
          `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
        );

        if (newWindow) {
          setPaymentWindow(newWindow);
          newWindow.focus();
        } else {
          setIsProcessing(false);
          onClose();
        }
      } catch (error) {
        console.error('Failed to open payment window:', error);
        setIsProcessing(false);
        onClose();
      }
    }
  }, [isOpen, paymentWindow, onClose, isProcessing]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#0f0a14] p-8 rounded-lg shadow-xl text-center max-w-md w-full mx-4 border border-accent/20">
        <div className="mb-6">
          <div className="relative w-16 h-16 mx-auto">
            <Loader2 className="w-16 h-16 animate-spin absolute top-0 left-0 text-accent opacity-75" />
          </div>
        </div>
        <p className="text-gray-300 mb-4 text-lg font-medium">Please complete your payment in the new window.</p>
        <p className="text-gray-400 text-sm">You can close this overlay while completing your payment.</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#0f0a14]"
        >
          Close Overlay
        </button>
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const cards = [
    { src: "/images/brand/icons/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg", alt: "American Express" },
    { src: "/images/brand/icons/discover-ac52cd46f89fa40a29a0bfb954e33173.svg", alt: "Discover" },
    { src: "/images/brand/icons/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg", alt: "JCB" },
    { src: "/images/brand/icons/diners-fbcbd3360f8e3f629cdaa80e93abdb8b.svg", alt: "diners" },
    { src: "/images/brand/icons/unionpay-8a10aefc7295216c338ba4e1224627a1.svg", alt: "unionpay" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const PaymentIcon: React.FC<PaymentIconProps> = ({ src, alt, className = "" }) => (
    <div className="relative group/payment">
      <div className="bg-[#1a1420] p-2 rounded w-8 h-8 flex items-center justify-center">
        <Image 
          src={src} 
          alt={alt} 
          width={16} 
          height={16} 
          className={className}
        />
      </div>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1420] px-2 py-1 rounded text-xs opacity-0 group-hover/payment:opacity-100 transition-opacity whitespace-nowrap z-10">
        {alt}
      </div>
    </div>
  );

  return (
    <div className="mt-4 pt-4 border-t border-accent/20">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <PaymentIcon 
          src="/images/brand/icons/mastercard-4d8844094130711885b5e41b28c9848f.svg" 
          alt="Mastercard" 
        />
        <PaymentIcon 
          src="/images/brand/icons/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" 
          alt="Visa" 
        />
        <PaymentIcon 
          src="/images/brand/icons/google-pay-svgrepo-com.svg" 
          alt="Google Pay" 
        />
        <PaymentIcon 
          src="/images/brand/icons/Apple_Pay_Mark_RGB_041619.svg" 
          alt="Apple Pay" 
        />
        <PaymentIcon 
          src="/images/brand/icons/icon-pm-amazonpay_light-22cdec0f5f5609554a34fa62fa583f23.svg" 
          alt="Amazon Pay" 
        />
        
        <div className="relative group/payment">
          <div className="bg-[#1a1420] p-2 rounded w-8 h-8 flex items-center justify-center relative">
            {cards.map((card, index) => (
              <Image
                key={card.src}
                src={card.src}
                alt={card.alt}
                width={16}
                height={16}
                className={`absolute transition-opacity duration-500 ${
                  index === currentCardIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1420] px-2 py-1 rounded text-xs opacity-0 group-hover/payment:opacity-100 transition-opacity whitespace-nowrap z-10">
            {cards[currentCardIndex].alt}
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingCard: React.FC<PricingCardProps> = ({ tier, onSelect }) => {
  const getBackground = () => {
    if (tier.isPopular) return 'bg-gradient-to-b from-[#0f0a14] to-[#1a1420]';
    return 'bg-[#0f0a14]';
  };

  const getBorderClass = () => {
    if (tier.isPopular) return 'border border-accent/30';
    return 'border border-white/10';
  };

  return (
    <div className={`relative group/card transition-all duration-300 hover:scale-105`}>
      <div
        className={`h-full ${getBackground()} rounded-lg p-8 flex flex-col
          transition-transform duration-300 relative overflow-hidden ${getBorderClass()}
          ${tier.disabled ? 'opacity-75' : ''}
        `}
      >
        {tier.isPopular && (
          <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
            Most Popular
          </div>
        )}

        <div className="mb-8 space-y-4">
          <h3 className="text-white text-2xl font-bold">{tier.name}</h3>
          <div className="space-y-2">
            <div className="text-3xl text-white font-bold">{tier.price}</div>
            <p className="text-gray-400 text-sm">{tier.description}</p>
          </div>
        </div>

        <ul className="space-y-4 flex-grow mb-8">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-300">
              {feature.included ? (
                <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              )}
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>

        {tier.paymentMethods && (
          <div className="mb-6">{tier.paymentMethods}</div>
        )}

        <button
          onClick={() => !tier.disabled && onSelect(tier)}
          className={`w-full rounded-md py-3 px-6 text-sm font-semibold transition-all duration-200
            ${tier.disabled
              ? 'bg-[#1a1420] cursor-not-allowed opacity-50'
              : tier.isPopular
                ? 'bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20'
                : 'bg-[#1a1420] hover:bg-[#251b2d] text-white border border-white/10'
            }
          `}
          disabled={tier.disabled}
        >
          {tier.buttonText}
        </button>
      </div>
    </div>
  );
};

const PricingPage: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [, setIsLoading] = useState(true);

  const pricingTiers = [
    {
      name: 'Starlight Lifetime',
      price: '$14.99',
      description: 'One-time payment',
      features: [
        { text: 'All Monthly Features', included: true },
        { text: 'Lifetime Updates', included: true },
        { text: 'Lifetime License Key', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Exclusive Discord Role', included: true }
      ],
      buttonText: 'Get Lifetime',
      disabled: false,
      paymentMethods: <PaymentMethods />
    },
    {
      name: 'Starlight Monthly',
      price: '$4.99/mo',
      description: 'Monthly subscription',
      features: [
        { text: 'All Starlight Features', included: true },
        { text: 'Exclusive Game Support', included: true },
        { text: 'Monthly License Key', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Exclusive Discord Role', included: true }
      ],
      buttonText: 'Get Monthly',
      isPopular: true,
      disabled: false,
      paymentMethods: <PaymentMethods />
    },
    
    {
      name: 'YouTuber Benefits',
      price: 'Free',
      description: 'For content creators',
      features: [
        { text: 'Keys To Give Away', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Channel Promotion', included: true },
        { text: 'Life-Time Key', included: false }
      ],
      buttonText: 'Apply Now',
      disabled: true
    }
  ];

  const faqs = [
    {
      question: 'How do I claim my Starlight access?',
      answer: 'After your purchase, you\'ll receive a license key to activate Starlight features in your email'
    },
    {
      question: 'What\'s the difference between monthly and lifetime?',
      answer: 'Monthly subscription renews at $4.99/month, while lifetime is a one-time payment of $14.99 with no recurring charges.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, Google Pay, Apple Pay, Amazon Pay, and Cash App. In the future Cryptocurrency will be accepted as well.'
    },
    {
      question: 'When will content creator access be available?',
      answer: 'Content creator access will be available once we have enough content to support it. We will announce when it\'s available.'
    }
  ];

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="text-white antialiased bg-[#0f0a14]">
      <Navbar />
      <LoadingScreen onComplete={handleLoadingComplete} />
      <PricingHero />
      
      <section className="min-h-screen py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-white">Pricing Plans</h2>
            <p className="mt-4 text-gray-400">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-5xl">
          {pricingTiers.map((tier) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                onSelect={(selectedTier: PricingTier) => {
                  setSelectedTier(selectedTier);
                  if (selectedTier.name === 'Starlight Monthly' || selectedTier.name === 'Starlight Lifetime') {
                    setIsPaymentModalOpen(true);
                  }
                }}
                isSelected={selectedTier?.name === tier.name}
              />
            ))}
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-[#0f0a14] rounded-lg p-8 border border-accent/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-white text-2xl font-semibold mb-2">
                    Custom Enterprise Solution
                  </h3>
                  <p className="text-gray-400">
                    Need a custom solution? Let&apos;s create a plan that works for you.
                  </p>
                </div>
                <button
                  className="opacity-50 cursor-not-allowed w-full md:w-auto px-8 bg-accent text-white rounded-md py-3"
                  disabled
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-medium mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default PricingPage;