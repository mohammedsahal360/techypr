import type { Metadata } from 'next';
import { Outfit, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TECHKSHETRA'26 | Where Innovation Meets Infinity",
  description:
    'Techkshetra is the premier inter-college tech fest featuring hackathons, robotics, AI challenges, drone races, gaming tournaments, and more. Join 3000+ innovators in a futuristic celebration of technology.',
  keywords: [
    'tech fest',
    'hackathon',
    'college fest',
    'Techkshetra',
    'robotics',
    'AI',
    'coding',
    'innovation',
  ],
  authors: [{ name: 'Techkshetra Team' }],
  openGraph: {
    title: "TECHKSHETRA'26 | Where Innovation Meets Infinity",
    description:
      'The premier inter-college tech fest. Hackathons, robotics, AI challenges, and more. Join 3000+ innovators.',
    siteName: "TECHKSHETRA'26",
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TECHKSHETRA'26 | Where Innovation Meets Infinity",
    description:
      'The premier inter-college tech fest. Hackathons, robotics, AI challenges, and more.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="preload" href="/models/angel-compressed.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body style={{ background: '#050510', color: '#ffffff' }}>{children}</body>
    </html>
  );
}
