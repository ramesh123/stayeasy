import React from 'react';
import { Box, Typography } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import KingBedIcon from '@mui/icons-material/KingBed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import VerifiedIcon from '@mui/icons-material/Verified';
import BoltIcon from '@mui/icons-material/Bolt';
import FeatureCard from './FeatureCard';
import StatCard from './StatCard';

const FEATURES = [
  { icon: HomeWorkIcon, title: 'Hostel Listings', description: 'Thousands of verified hostels.' },
  { icon: KingBedIcon, title: 'Bachelor Rooms', description: 'Affordable rooms for professionals.' },
  { icon: LocationOnIcon, title: 'Nearby Locations', description: 'Find rentals around your current location.' },
  { icon: CurrencyRupeeIcon, title: 'Best Prices', description: 'Compare prices instantly.' },
  { icon: VerifiedIcon, title: 'Verified Owners', description: 'Trusted owners and genuine listings.' },
  { icon: BoltIcon, title: 'Instant Search', description: 'Fast search experience.' },
];

const STATS = [
  { value: '10K+', label: 'Rooms' },
  { value: '500+', label: 'Hostels' },
  { value: '50+', label: 'Cities' },
  { value: '24x7', label: 'Support' },
];

export default function MarketingPanel({
  title = 'Find Your Perfect Stay',
  subtitle = 'Discover hostels, bachelor rooms, PGs, apartments and rentals nearby with verified listings.',
}) {
  return (
    <Box>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, lineHeight: 1.15, mb: 1.25 }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', mb: 2.5, maxWidth: 480 }}>
        {subtitle}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1.5,
          mb: 2.5,
        }}
      >
        {FEATURES.map(f => (
          <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
        {STATS.map(s => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </Box>
    </Box>
  );
}
