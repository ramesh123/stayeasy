import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, InputBase, IconButton, Paper, Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRooms } from '../../store/roomsStore';
import RoomCard from '../../components/common/RoomCard';
import AppLayout from '../../components/layout/AppLayout';

const CATEGORIES = [
  { icon: '🏨', label: 'Hostels', type: 'hostel' },
  { icon: '🏠', label: 'Bachelor', type: 'bachelor' },
  { icon: '📍', label: 'Nearby', type: 'nearby' },
  { icon: '⭐', label: 'Popular', type: 'popular' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { rooms } = useRooms();
  const [activeCategory, setActiveCategory] = useState('hostel');

  const featured = rooms.filter(r => r.available).slice(0, 3);
  const nearby = rooms.slice(0, 4);

  return (
    <AppLayout>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', pt: { xs: 2, md: 3 }, pb: 0 }}>
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', mb: 1.5,
            maxWidth: 1200, mx: 'auto',
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 0.3 }}
            >
              <LocationOnIcon sx={{ fontSize: 14 }} /> Madhapur, Hyderabad
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Find your stay
            </Typography>
          </Box>
          <IconButton sx={{ color: '#fff' }}>
            <NotificationsIcon />
          </IconButton>
        </Box>

        {/* Search bar */}
        <Box sx={{ px: { xs: 2, md: 4 }, pb: 2, maxWidth: 1200, mx: 'auto' }}>
          <Paper
            sx={{
              p: '8px 14px', display: 'flex', alignItems: 'center',
              gap: 1, borderRadius: '24px',
            }}
            elevation={2}
          >
            <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
            <InputBase
              placeholder="Search by location, area..."
              sx={{ flex: 1, fontSize: '0.875rem' }}
              onFocus={() => navigate('/search')}
            />
            <IconButton
              size="small"
              onClick={() => navigate('/search')}
              sx={{ color: 'primary.main' }}
            >
              <TuneIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, md: 4 }, pt: 2, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        {/* Categories */}
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Browse by type
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            mb: 3,
            overflowX: { xs: 'auto', md: 'visible' },
            flexWrap: { md: 'nowrap' },
            pb: 0.5,
          }}
        >
          {CATEGORIES.map(cat => (
            <Box
              key={cat.type}
              onClick={() => { setActiveCategory(cat.type); navigate('/search'); }}
              sx={{
                minWidth: { xs: 80, md: 100 },
                p: { xs: 1.5, md: 2 },
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: 2,
                border: '1.5px solid',
                borderColor: activeCategory === cat.type ? 'primary.main' : 'divider',
                bgcolor: activeCategory === cat.type ? 'primary.light' : 'background.paper',
                transition: 'all .15s',
                flexShrink: 0,
                flex: { md: 1 },
              }}
            >
              <Box sx={{ fontSize: { xs: 26, md: 30 }, mb: 0.5 }}>{cat.icon}</Box>
              <Typography
                variant="caption"
                fontWeight={500}
                color={activeCategory === cat.type ? 'primary.main' : 'text.secondary'}
                sx={{ fontSize: { md: '0.75rem' } }}
              >
                {cat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Featured */}
        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', mb: 1.5,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">Featured hostels</Typography>
          <Typography
            variant="caption" color="primary.main" fontWeight={600}
            sx={{ cursor: 'pointer' }} onClick={() => navigate('/search')}
          >
            See all
          </Typography>
        </Box>

        {/* Mobile: horizontal scroll | Desktop: 3-col grid */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
            gap: 1.5,
            overflowX: { xs: 'auto', md: 'visible' },
            pb: { xs: 1, md: 0 },
            mb: 3,
          }}
        >
          {featured.map(room => (
            <Box
              key={room.id}
              sx={{ minWidth: { xs: 220, md: 'auto' }, flexShrink: { xs: 0, md: 1 } }}
            >
              <RoomCard room={room} variant="vertical" />
            </Box>
          ))}
        </Box>

        {/* Nearby */}
        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', mb: 1.5,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">Nearby rooms</Typography>
          <Typography
            variant="caption" color="primary.main" fontWeight={600}
            sx={{ cursor: 'pointer' }} onClick={() => navigate('/search')}
          >
            See all
          </Typography>
        </Box>

        {/* Mobile: list | Desktop: 2-col grid */}
        <Box
          sx={{
            display: { md: 'grid' },
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: { md: 1.5 },
          }}
        >
          {nearby.map(room => (
            <RoomCard key={room.id} room={room} variant="horizontal" />
          ))}
        </Box>
      </Box>
    </AppLayout>
  );
}
