import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

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
   <html lang="en" className="dark custom-cursor">
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
             
             document.addEventListener("keydown", function(event) {
               if ((event.ctrlKey || event.metaKey) && 
                   (event.key === "s" || 
                    event.key === "c" ||
                    event.key === "u" ||
                    event.key === "p" ||
                    event.key === "i")) {
                 event.preventDefault();
               }
             });
           `,
         }}
       />
       <style>
         {`
           * {
             -webkit-user-select: none;
             -ms-user-select: none;
             user-select: none;
           }
         `}
       </style>
     </head>
     <body
       className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-white select-none`}
     >
       <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.2),transparent_40%),radial-gradient(circle_at_top_right,rgba(37,38,44,0.2),transparent_40%)] pointer-events-none" />
       <div className="relative">
         {children}
       </div>
     </body>
   </html>
 );
}