'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { useRooms } from '../../store/roomsStore';
import { useAuth } from '../../store/authStore';
import RoomCard from '../../components/common/RoomCard';
import AppLayout from '../../components/layout/AppLayout';

export default function FavoritesPage() {
  const router = useRouter();
  const { rooms, favorites } = useRooms();
  const { isAuthenticated } = useAuth();
  const savedRooms = rooms.filter(r => favorites.includes(r.id));

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar
          position="static" color="default" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight={600}>Saved rooms</Typography>
            {savedRooms.length > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({savedRooms.length})
              </Typography>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
          {!isAuthenticated ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ fontSize: 56, mb: 2 }}>🔐</Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Login to see your saved rooms
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Sign in to save and access your favourite listings
              </Typography>
              <Button variant="contained" onClick={() => router.push('/login')}>Login now</Button>
            </Box>
          ) : savedRooms.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ fontSize: 56, mb: 2 }}>🤍</Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>No saved rooms yet</Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Tap the heart on any listing to save it here
              </Typography>
              <Button variant="contained" onClick={() => router.push('/search')}>Browse rooms</Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 0, md: 1.5 },
              }}
            >
              {savedRooms.map(room => (
                <RoomCard key={room.id} room={room} variant="horizontal" />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </AppLayout>
  );
}
