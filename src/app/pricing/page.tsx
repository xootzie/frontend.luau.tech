'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import { Check, Loader2 } from 'lucide-react';
import LoadingScreen from '@/components/loadingScreen';
import Image from 'next/image';
import PricingHero from '@/components/pricinghero';


interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
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
      <div className="relative bg-zinc-900 p-8 rounded-lg shadow-xl text-center max-w-md w-full mx-4">
        <div className="mb-6">
          <div className="relative w-16 h-16 mx-auto">
            <Loader2 className="w-16 h-16 animate-spin absolute top-0 left-0 text-blue-500 opacity-75" />
           
          </div>
        </div>
        <p className="text-gray-300 mb-4 text-lg font-medium">Please complete your payment in the new window.</p>
        <p className="text-gray-400 text-sm">You can close this overlay while completing your payment.</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          Close Overlay
        </button>
      </div>
    </div>
  );
};

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  disabled?: boolean;
  paymentMethods?: React.ReactNode;
}

const PricingPage: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [, setIsLoading] = useState(true);

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

    return (
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex flex-wrap gap-1 items-center justify-center">
          <div className="relative group">
            <div className="bg-zinc-800 p-2 rounded w-[28px] h-[28px] flex items-center justify-center">
              <Image src="/images/brand/icons/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="MasterCredit Card" width={20} height={20} />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Mastercard
            </div>
          </div>
          
          <div className="relative group">
            <div className="bg-zinc-800 p-2 rounded w-[28px] h-[28px] flex items-center justify-center">
              <Image src="/images/brand/icons/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa Card" width={20} height={20} />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Visa
            </div>
          </div>

          <div className="relative group">
            <div className="bg-zinc-800 p-2 rounded w-[28px] h-[28px] flex items-center justify-center">
              <Image src="/images/brand/icons/icon-pm-cashapp-981164a833e417d28a8ac2684fda2324.svg" alt="Cash App" width={20} height={20} />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Cash App
            </div>
          </div>

          <div className="relative group">
            <div className="bg-zinc-800 p-2 rounded w-[28px] h-[28px] flex items-center justify-center">
              <Image src="/images/brand/icons/google-pay-svgrepo-com.svg" alt="Google Pay" width={20} height={20} />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Google Pay
            </div>
          </div>

          <div className="relative group">
            <div className="bg-zinc-800 p-2 rounded w-[28px] h-[28px] flex items-center justify-center">
              <Image src="/images/brand/icons/Apple_Pay_Mark_RGB_041619.svg" alt="Apple Pay" width={20} height={20} />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Apple Pay
            </div>
          </div>

          <div className="relative group">
            <div className="bg-zinc-800 p-2 rounded w-[28px] h-[28px] flex items-center justify-center">
              <Image src="/images/brand/icons/icon-pm-amazonpay_light-22cdec0f5f5609554a34fa62fa583f23.svg" alt="Amazon Pay" width={20} height={20} />
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Amazon Pay
            </div>
          </div>

          <div className="relative group">
            <div className="bg-zinc-800 p-2 rounded w-[28px] h-[28px] flex items-center justify-center relative">
              {cards.map((card, index) => (
                <Image
                  key={card.src}
                  src={card.src}
                  alt={card.alt}
                  width={20}
                  height={20}
                  className={`absolute transition-opacity duration-500 ${
                    index === currentCardIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {cards[currentCardIndex].alt}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const faqs = [
    {
      question: 'How do I claim my Premium access?',
      answer: 'After your purchase, you\'ll receive a license key to activate Premium features in your email'
    },
    {
      question: 'Is Premium a one-time purchase?',
      answer: 'Yes, when you purchase Premium directly, it\'s a lifetime access. Server boost and content creator access depend on ongoing activity.'
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

  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: '$0',
      description: 'Free for everyone',
      features: [
        'Basic Game Support',
        '12 Hour License Key',
        'Basic Features',
        'Basic Support'
      ],
      buttonText: 'Current Plan',
      disabled: true
    },
    {
      name: 'Boosting',
      price: '1 Server Boost',
      description: 'per user/month',
      features: [
        'Exclusive Features',
        'Exclusive Game Support',
        'LifeTime License Key',
        'Priority Support',
        'Exclusive Discord Roles'
      ],
      buttonText: 'Join Server',
      disabled: false
    },
    {
      name: 'Direct payment',
      price: '$5.49',
      description: 'per user/lifetime',
      features: [
        'Exclusive Features',
        'Exclusive Game Support',
        'LifeTime License Key',
        'Priority Support',
        'Exclusive Discord Role'
      ],
      buttonText: 'Purchase',
      isPopular: true,
      disabled: false,
      paymentMethods: <PaymentMethods />
    },
    {
      name: 'Content Creator',
      price: 'Every 1,000 Views',
      description: 'per 1,000 Views/day',
      features: [
        'Keys To GiveAway',
        'Daily License Key',
        'Priority Support',
        'Alpha Leaks',
        'Exclusive Shoutout',
        'Exclusive Roles'
      ],
      buttonText: 'Apply Now',
      disabled: true
    }
  ];

 
  const handleLoadingComplete = () => {
    setIsLoading(false);};

  return (
    <div className="bg-black text-white antialiased">

      <Navbar />
      <LoadingScreen onComplete={handleLoadingComplete} />
          

      <PricingHero />
          
    
      <section className="bg-black min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-white">Pricing Plans</h2>
            <p className="mt-4 text-zinc-400">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {pricingTiers.map((tier) => (
        <div
          key={tier.name}
          className={`bg-zinc-900 rounded-lg p-6 flex flex-col ${
            tier.isPopular ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <div className="mb-8">
            <h3 className="text-white text-2xl font-semibold mb-2">{tier.name}</h3>
            <div className="text-2xl text-white font-semibold">{tier.price}</div>
            <p className="text-zinc-400 text-sm">{tier.description}</p>
          </div>

          <ul className="space-y-4 flex-grow">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center text-zinc-300">
                <Check className="w-5 h-5 text-blue-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          
          {tier.paymentMethods && tier.paymentMethods}
          <button
            className={`mt-5 w-full rounded-md py-2 ${
              tier.disabled
                ? 'opacity-50 cursor-not-allowed bg-zinc-800'
                : tier.isPopular
                ? 'bg-blue-500 hover:bg-opacity-25'
                : 'bg-zinc-800 hover:bg-zinc-700'
            } text-white transition-colors`}
            disabled={tier.disabled}
            onClick={() => {
              if (tier.name === 'Direct payment') {
                setIsPaymentModalOpen(true);
              }
            }}
          >
            {tier.buttonText}
          </button>
          
        </div>
      ))}
    </div>

          <div className="mt-8">
            <div className="bg-zinc-900 rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-white text-2xl font-semibold mb-2">
                    Custom Enterprise Solution
                  </h3>
                  <p className="text-zinc-400">
                    Need a custom solution? Let&apos;s create a plan that works for you.
                  </p>
                </div>
                <button
                  className="opacity-50 cursor-not-allowed w-full md:w-auto px-8 bg-blue-500 text-white rounded-md py-3"
                  disabled
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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