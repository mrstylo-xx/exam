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
  // 'viewport' এখানে থাকবে না
};

// ৩. নতুন ভিউপোর্ট কনস্ট্যান্ট (এক্সপোর্ট করুন)
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
    <html lang="en" className={`${poppins.variable} ${bengali.variable}`}>
      <body className="antialiased" style={{ fontFamily: "'var(--font-poppins)', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}