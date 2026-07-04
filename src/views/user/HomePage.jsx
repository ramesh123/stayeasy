'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
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
  const router = useRouter();
  const { rooms } = useRooms();
  const [activeCategory, setActiveCategory] = useState('hostel');

  const recentHostels = [...rooms]
    .filter(r => r.type === 'hostel')
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4);

  const recentRoomShare = [...rooms]
    .filter(r => r.type === 'bachelor')
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4);

  return (
    <AppLayout>
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
              onClick={() => { setActiveCategory(cat.type); router.push('/search'); }}
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

        {/* Recently added hostels */}
        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', mb: 1.5,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">Recently added hostels</Typography>
          <Typography
            variant="caption" color="primary.main" fontWeight={600}
            sx={{ cursor: 'pointer' }} onClick={() => router.push('/search')}
          >
            See all
          </Typography>
        </Box>

        {recentHostels.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            No hostels added yet
          </Typography>
        ) : (
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
            {recentHostels.map(room => (
              <Box
                key={room.id}
                sx={{ minWidth: { xs: 220, md: 'auto' }, flexShrink: { xs: 0, md: 1 } }}
              >
                <RoomCard room={room} variant="vertical" />
              </Box>
            ))}
          </Box>
        )}

        {/* Recently added room share */}
        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', mb: 1.5,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">Recently added room share</Typography>
          <Typography
            variant="caption" color="primary.main" fontWeight={600}
            sx={{ cursor: 'pointer' }} onClick={() => router.push('/search')}
          >
            See all
          </Typography>
        </Box>

        {recentRoomShare.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No room share listings added yet
          </Typography>
        ) : (
          <Box
            sx={{
              display: { md: 'grid' },
              gridTemplateColumns: { md: '1fr 1fr' },
              gap: { md: 1.5 },
            }}
          >
            {recentRoomShare.map(room => (
              <RoomCard key={room.id} room={room} variant="horizontal" />
            ))}
          </Box>
        )}
      </Box>
    </AppLayout>
  );
}
