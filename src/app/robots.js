// TODO: replace with the real production domain before deploying.
const SITE_URL = 'https://stayeasy.example.com';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/owner', '/profile', '/favorites', '/bookings', '/login', '/register', '/otp'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
