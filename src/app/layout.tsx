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
  title: "Starry ✨",
  description: "Official Starry Website for Starry Script Hub.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Starry ✨",
    description: "Official Website for Starry!",
    images: [
      {
        url: "/images/screenshots/temp_screenshot2.png",
        width: 1200,
        height: 630,
        alt: "luau.tech homepage screenshot"
      }
    ],
    type: "website",
    url: "https://luau.tech"
  },
  twitter: {
    card: "summary_large_image",
    title: "Starry ✨",
    description: "Official Website for Starry!",
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
      <head>
     
      </head>
      <body className="antialiased min-h-screen">
        <main>{children}</main>
        <CustomContextMenu />
      </body>
    </html>
  );
}