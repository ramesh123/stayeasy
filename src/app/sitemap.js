import { SAMPLE_ROOMS } from '../data/rooms';

// TODO: replace with the real production domain before deploying.
const SITE_URL = 'https://stayeasy.example.com';

export default function sitemap() {
  const staticRoutes = ['', '/home', '/search'].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'daily',
    priority: path === '' ? 1 : 0.8,
  }));

  const roomRoutes = SAMPLE_ROOMS.map((room) => ({
    url: `${SITE_URL}/room/${room.id}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...roomRoutes];
}
