'use client';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import { Check, Zap, Key, Crown } from 'lucide-react';
import LoadingScreen from '@/components/loadingScreen';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);

  useEffect(() => {
    if (paymentWindow) {
      const timer = setInterval(() => {
        if (paymentWindow.closed) {
          clearInterval(timer);
          onClose();
          setPaymentWindow(null);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, [paymentWindow, onClose]);

  useEffect(() => {
    if (isOpen && !paymentWindow) {
      const newWindow = window.open(
        'https://purchase.luau.tech/b/9AQcNQbCH33sa2I7ss',
        'StripeCheckout',
        'width=1200,height=700,left=${window.innerWidth / 2 - 300},top=${window.innerHeight / 2 - 400}'
      );
      setPaymentWindow(newWindow);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-zinc-900 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-4">Payment Window Opened</h2>
        <p className="text-gray-300 mb-4">Please complete your payment in the new window.</p>
        <p className="text-gray-400 text-sm">You can close this overlay or wait for the payment to complete.</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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

  const premiumFeatures = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: 'Enhanced Features',
      description: 'Purchase Premium to use exclusive features and premium only experiences.'
    },
    {
      icon: <Key className="w-6 h-6 text-white" />,
      title: 'Bypass Key System',
      description: 'Purchase Premium to access premium features with a special key.'
    },
    {
      icon: <Crown className="w-6 h-6 text-white" />,
      title: 'Feel Heard',
      description: 'Get Access to VIP exclusive content including Discord channels.'
    }
  ];

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
      answer: 'We accept PayPal, Credit/Debit cards, Cash App, and Venmo through our secure Stripe payment system.'
    },
    {
      question: 'How do I track my content creator status?',
      answer: 'Once approved, you\'ll get access to a creator dashboard where you can submit your content and track your Premium days.'
    }
  ];

  const handleLoadingComplete = () => {
    setIsLoading(false);
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
  };

  return (
    <div className="bg-black text-white antialiased">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(37,38,44,0.2),transparent_40%)] pointer-events-none" />

      <Navbar />
      <LoadingScreen onComplete={handleLoadingComplete} />
          
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl font-medium tracking-tight max-w-4xl">
          Get Starry Premium
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl">
          Choose your preferred way to unlock premium features and enhance your Roblox experience.
        </p>
      </section>

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

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-medium mb-12">Premium Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {premiumFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 rounded-xl p-6 border border-white/10"
            >
              {feature.icon}
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
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