import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'StayEasy — Find Hostels & Bachelor Rooms Near You',
    template: '%s — StayEasy',
  },
  description: 'Discover verified hostels, bachelor rooms, PGs and shared rooms near you. Search by city, compare prices, and connect with owners instantly on StayEasy.',
};

export const viewport = {
  themeColor: '#1976D2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
