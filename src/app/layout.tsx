import type { Metadata } from "next";
import { Inter, Noto_Serif_Bengali, Poppins } from "next/font/google";
import "./globals.css";

// ১. ফন্ট কনফিগারেশন (ইংরেজি এবং বাংলা)
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

// ২. মেটাডাটা (SEO এর জন্য)
export const metadata: Metadata = {
  title: "Mr. Stylo Academy",
  description: "Premium Mock Test Platform for Students",
  manifest: "/manifest.json", // PWA এর জন্য
  themeColor: "#4f46e5",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${bengali.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
