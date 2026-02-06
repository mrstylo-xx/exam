import type { Metadata } from "next";
import { Inter, Noto_Serif_Bengali, Poppins } from "next/font/google";
import "./globals.css";

// ১. ফন্ট কনফিগারেশন
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-poppins'
});

const bengali = Noto_Serif_Bengali({ 
  subsets: ["bengali"], 
  weight: ["400", "600"],
  variable: '--font-bengali'
});

// ২. মেটাডাটা
export const metadata: Metadata = {
  title: "Mr. Stylo Academy",
  description: "Premium Mock Test Platform for Students",
  manifest: "/manifest.json",
  themeColor: "#4f46e5",
};

// ৩. ভিউপোর্ট কনস্ট্যান্ট
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${bengali.variable} scroll-smooth`}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="font-poppins antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}