import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",      // সার্ভিস ওয়ার্কার public ফোল্ডারে তৈরি হবে
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,      // ডেভেলপমেন্ট মোডেও PWA অন থাকবে
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',    // Vercel বা GitHub Pages এর জন্য স্ট্যাটিক এক্সপোর্ট
  images: {
    unoptimized: true, // স্ট্যাটিক এক্সপোর্টে ইমেজ অপ্টিমাইজেশন বন্ধ রাখতে হয়
  },
};

export default withPWA(nextConfig);
