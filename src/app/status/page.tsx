'use client';
import { useState } from 'react';
import Navbar from '@/components/navigation';
import Footer from '@/components/footer';
import {  Server, Bot, Mail, Code, Globe } from 'lucide-react';

const StatusPage = () => {
  const [services,] = useState([
    {
      name: 'Discord APP',
      status: 'operational',
      icon: Bot,
      uptime: '100%',
      lastIncident: 'No recent incidents',
      description: 'Discord application services and commands'
    },
    {
      name: 'www.luau.tech',
      status: 'operational',
      icon: Globe,
      uptime: '100%',
      lastIncident: 'No recent incidents',
      description: 'Main website and user interface'
    },
    {
      name: 'backend.luau.tech',
      status: 'operational',
      icon: Server,
      uptime: '99.9%',
      lastIncident: 'Script Verification Failed',
      description: 'API and other backend services'
    },
    {
      name: 'mail.luau.tech',
      status: 'operational',
      icon: Mail,
      uptime: '99.9%',
      lastIncident: 'No recent incidents',
      description: 'Email and notification services'
    },
    {
      name: 'Starry Script',
      status: 'outage',
      icon: Code,
      uptime: '0%',
      lastIncident: 'Currently down for maintenance',
      description: 'Roblox script execution and features'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'outage':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen text-white antialiased">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium mb-4">System Status</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track the current status of all Starry services and systems
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(service.status)} animate-pulse`} />
                  <span className="text-sm capitalize">{service.status}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-800/30 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Uptime</p>
                  <p className="text-lg font-medium">{service.uptime}</p>
                </div>
                <div className="p-4 bg-zinc-800/30 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Last Incident</p>
                  <p className="text-lg font-medium">{service.lastIncident}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StatusPage;