'use client';
import React from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navigation';
import ComingSoon from '@/components/comingsoon';
import { Check, Zap, Key, Crown } from 'lucide-react';
import LoadingScreen from '@/components/loadingScreen';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  disabled?: boolean;
}

const PricingPage: React.FC = () => {
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
      disabled: true
    },
    {
      name: 'Direct payment',
      price: '$6.99',
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
      disabled: true
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
      answer: 'After your purchase, you\'ll receive a license key to activate Premium features in your email or Discord DM.'
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

  return (
    <div className="bg-black text-white antialiased">
   
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(37,38,44,0.2),transparent_40%)] pointer-events-none" />

    <Navbar />
    <LoadingScreen onComplete={() => {
            console.log('Page fully loaded');
          }}/>
          
<ComingSoon/>

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

                <button
                  className={`mt-8 w-full rounded-md py-2 ${
                    tier.disabled
                      ? 'opacity-50 cursor-not-allowed bg-zinc-800'
                      : tier.isPopular
                      ? 'bg-blue-500 hover:bg-opacity-25'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  } text-white transition-colors`}
                  disabled={tier.disabled}
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
      <Footer />
    </div>
  );
};

export default PricingPage;