'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, AppBar, Toolbar, IconButton, Typography, Button,
  Grid, Card, CardContent, Chip, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AppLayout from '../../components/layout/AppLayout';

const INITIAL_ROOMS = [
  { id: 1, type: 'Double sharing', rent: 6000, available: true, color: 'linear-gradient(135deg,#1976D2,#26A69A)', emoji: '🛏' },
  { id: 2, type: 'Triple sharing', rent: 4500, available: false, color: 'linear-gradient(135deg,#26A69A,#00796B)', emoji: '🛏' },
  { id: 3, type: 'Single room', rent: 9000, available: true, color: 'linear-gradient(135deg,#7B1FA2,#1976D2)', emoji: '🛏' },
  { id: 4, type: '4-bed sharing', rent: 3500, available: false, color: 'linear-gradient(135deg,#E65100,#FF9800)', emoji: '🛏' },
  { id: 5, type: 'Double sharing', rent: 6500, available: true, color: 'linear-gradient(135deg,#1976D2,#26A69A)', emoji: '🛏' },
  { id: 6, type: 'Single room', rent: 8500, available: true, color: 'linear-gradient(135deg,#7B1FA2,#1976D2)', emoji: '🛏' },
];

export default function ManageRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');

  const filtered = filter === 'all' ? rooms
    : filter === 'available' ? rooms.filter(r => r.available)
    : rooms.filter(r => !r.available);

  const toggleStatus = (id) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, available: !r.available } : r));
    setToast('Room status updated');
  };

  const confirmDelete = () => {
    setRooms(prev => prev.filter(r => r.id !== deleteId));
    setDeleteId(null);
    setToast('Room deleted');
  };

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar
          position="sticky" color="default" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => router.back()}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>My rooms</Typography>
            <Button
              variant="contained" size="small"
              startIcon={<AddIcon />}
              onClick={() => router.push('/owner/add-room')}
            >
              Add room
            </Button>
          </Toolbar>
          <Box sx={{ px: 2, pb: 1.5, display: 'flex', gap: 1 }}>
            {[
              { key: 'all', label: `All (${rooms.length})` },
              { key: 'available', label: `Available (${rooms.filter(r => r.available).length})` },
              { key: 'occupied', label: `Occupied (${rooms.filter(r => !r.available).length})` },
            ].map(f => (
              <Chip
                key={f.key} label={f.label} size="small"
                variant={filter === f.key ? 'filled' : 'outlined'}
                color={filter === f.key ? 'primary' : 'default'}
                onClick={() => setFilter(f.key)}
              />
            ))}
          </Box>
        </AppBar>

        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {filtered.map(room => (
              <Grid item xs={6} sm={4} md={3} key={room.id}>
                <Card>
                  <Box
                    sx={{
                      height: { xs: 100, md: 120 },
                      background: room.color,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: 36, md: 44 },
                    }}
                  >
                    {room.emoji}
                  </Box>
                  <CardContent sx={{ p: { xs: 1.25, md: 1.5 }, '&:last-child': { pb: 1.25 } }}>
                    <Typography variant="body2" fontWeight={600} noWrap>{room.type}</Typography>
                    <Typography color="primary.main" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                      ₹{room.rent.toLocaleString()}
                      <Typography component="span" variant="caption" color="text.secondary">/mo</Typography>
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Chip
                        label={room.available ? 'Available' : 'Occupied'}
                        size="small"
                        color={room.available ? 'success' : 'default'}
                        onClick={() => toggleStatus(room.id)}
                        sx={{ fontSize: '0.65rem', height: 20, cursor: 'pointer' }}
                      />
                    </Box>
                    <Stack direction="row" spacing={0.75}>
                      <Button
                        size="small" variant="outlined"
                        startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                        sx={{ flex: 1, py: 0.5, fontSize: '0.7rem' }}
                        onClick={() => router.push('/owner/add-room')}
                      >
                        Edit
                      </Button>
                      <IconButton
                        size="small"
                        sx={{ bgcolor: 'error.light', color: 'error.main', borderRadius: 1 }}
                        onClick={() => setDeleteId(room.id)}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filtered.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Box sx={{ fontSize: 48, mb: 2 }}>🛏</Box>
              <Typography variant="h6" gutterBottom>No rooms in this category</Typography>
              <Button
                variant="contained"
                onClick={() => router.push('/owner/add-room')}
                startIcon={<AddIcon />}
              >
                Add a room
              </Button>
            </Box>
          )}
        </Box>

        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="xs" fullWidth>
          <DialogTitle>Delete room?</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              This will permanently remove the room listing. This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={!!toast} autoHideDuration={2500}
          onClose={() => setToast('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" onClose={() => setToast('')}>{toast}</Alert>
        </Snackbar>
      </Box>
    </AppLayout>
  );
}
