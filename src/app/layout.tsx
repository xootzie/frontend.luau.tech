import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import React from "react";
import CustomContextMenu from "@/components/CustomContextMenu";

const geistSans = localFont({
  src: [
    {
      path: './fonts/Geist-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Geist-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Geist-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: [
    {
      path: './fonts/GeistMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GeistMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/GeistMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/GeistMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Starlight ✨",
  description: "Official Starlight Website for Starlight Premium.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Starlight ✨",
    description: "Official Website for Starlight Premium!",
    images: [
      {
        url: "/images/screenshots/temp_screenshot2.png",
        width: 1200,
        height: 630,
        alt: "Starlight Premium homepage screenshot"
      }
    ],
    type: "website",
    url: "https://luau.tech"
  },
  twitter: {
    card: "summary_large_image",
    title: "Starlight ✨",
    description: "Official Website for Starlight Premium!",
    images: ["/images/screenshots/temp_screenshot2.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen relative">
        {/* Starlight Background Elements */}
        <div className="fixed inset-0 z-[-2] overflow-hidden">
          {/* Deep background */}
          <div className="absolute inset-0 bg-[#0a0010]"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#120014] to-[#0a000f]"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-starlight opacity-20"></div>
          
          {/* Stars/dots patterns */}
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          
          {/* Pink accent glows */}
          <div className="absolute top-[10%] -left-[10%] w-[40%] h-[30%] bg-[#fb97c6] opacity-[0.03] blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[5%] right-[5%] w-[35%] h-[40%] bg-[#fb97c6] opacity-[0.02] blur-[180px] rounded-full"></div>
        </div>
        
        <main className="relative z-0">{children}</main>
        
        {/* Add your context menu component if it exists */}
        {typeof CustomContextMenu !== 'undefined' && <CustomContextMenu />}
      </body>
    </html>
  );
}