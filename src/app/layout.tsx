import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  },
  other: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com https://challenges.cloudflare.com; connect-src 'self' https://static.cloudflareinsights.com;"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>

        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("contextmenu", function (event) {
                event.preventDefault();
              });
            `,
          }}
        />

        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' https://static.cloudflareinsights.com https://challenges.cloudflare.com; connect-src 'self' https://static.cloudflareinsights.com;"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-white`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(37,38,44,0.2),transparent_40%)] pointer-events-none" />
        
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}