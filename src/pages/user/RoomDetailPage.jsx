import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, IconButton, Button, Chip, Stack,
  Divider, Avatar, AppBar, Toolbar, Snackbar, Alert, Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useRooms } from '../../store/roomsStore';
import { useAuth } from '../../store/authStore';
import LoginGateDialog from '../../components/common/LoginGateDialog';
import AmenityChip from '../../components/common/AmenityChip';
import AppLayout from '../../components/layout/AppLayout';

const COLORS = [
  'linear-gradient(135deg, #1976D2, #26A69A)',
  'linear-gradient(135deg, #26A69A, #00796B)',
  'linear-gradient(135deg, #7B1FA2, #1976D2)',
  'linear-gradient(135deg, #E65100, #FF9800)',
];

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRoomById, isFavorite, toggleFavorite } = useRooms();
  const { isAuthenticated } = useAuth();
  const room = getRoomById(id);

  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [toast, setToast] = useState('');

  if (!room) {
    return (
      <AppLayout>
        <Box sx={{ p: 3, textAlign: 'center', pt: 10 }}>
          <Typography variant="h5">Room not found</Typography>
          <Button onClick={() => navigate('/search')} sx={{ mt: 2 }}>Back to search</Button>
        </Box>
      </AppLayout>
    );
  }

  const fav = isFavorite(room.id);
  const colorIndex = parseInt(room.id) % COLORS.length;

  const handleContact = (action) => {
    if (!isAuthenticated) {
      setPendingAction(action);
      setLoginOpen(true);
      return;
    }
    setToast(action === 'call' ? `Calling ${room.owner.phone}…` : 'Opening WhatsApp…');
  };

  const afterLogin = () => {
    setToast(pendingAction === 'call' ? `Calling ${room.owner.phone}…` : 'Opening WhatsApp…');
    setPendingAction(null);
  };

  const Gallery = (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '3px',
          height: { xs: 220, md: 320 },
        }}
      >
        <Box
          sx={{
            background: COLORS[colorIndex],
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: 56, md: 72 },
          }}
        >
          🏨
        </Box>
        <Box sx={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '3px' }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg,#B3D4F5,#80CBC4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: { xs: 28, md: 36 },
            }}
          >
            🛏
          </Box>
          <Box
            sx={{
              position: 'relative',
              background: 'linear-gradient(135deg,#C8E6C9,#A5D6A7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: { xs: 28, md: 36 },
            }}
          >
            🚿
            <Box
              sx={{
                position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700 }}>+6 more</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Mobile floating AppBar */}
      <AppBar
        position="absolute" color="transparent" elevation={0}
        sx={{ top: 0, display: { md: 'none' } }}
      >
        <Toolbar>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ bgcolor: 'rgba(255,255,255,0.9)', mr: 'auto' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.9)', mr: 1 }}>
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={() => toggleFavorite(room.id)}
            sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
          >
            {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );

  const RoomInfo = (
    <Box sx={{ px: { xs: 2, md: 0 }, pt: { xs: 2, md: 0 } }}>
      {/* Title & Price — shown inline on mobile, in right column on desktop */}
      <Box
        sx={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', mb: 1.5,
        }}
      >
        <Box sx={{ flex: 1, mr: 1 }}>
          <Typography variant="h4" fontWeight={700}>{room.title}</Typography>
          <Typography
            variant="body2" color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}
          >
            <LocationOnIcon sx={{ fontSize: 14 }} />{room.area}, {room.city}
          </Typography>
        </Box>
        {/* Price shown inline only on mobile */}
        <Box sx={{ textAlign: 'right', display: { md: 'none' } }}>
          <Typography variant="h4" color="primary.main" fontWeight={800}>
            ₹{room.rent.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">per month</Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 0.75 }}>
        <Chip label={room.available ? 'Available' : 'Full'} color={room.available ? 'success' : 'default'} size="small" />
        <Chip label={`${room.sharing} sharing`} color="primary" variant="outlined" size="small" />
        <Chip label={room.gender} size="small" />
        {room.bedsLeft > 0 && (
          <Chip
            label={`${room.bedsLeft} bed${room.bedsLeft > 1 ? 's' : ''} left`}
            color="warning" size="small"
          />
        )}
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Details */}
      <Typography variant="subtitle2" gutterBottom>Room details</Typography>
      <Box
        sx={{
          bgcolor: 'background.paper', borderRadius: 2,
          p: 1.5, mb: 2, border: '1px solid', borderColor: 'divider',
        }}
      >
        {[
          {
            icon: '🛏', label: 'Sharing type',
            value: `${room.sharing} sharing (${room.sharing === 'Single' ? 1 : room.sharing === 'Double' ? 2 : room.sharing === 'Triple' ? 3 : 4} persons)`,
          },
          { icon: '💰', label: 'Security deposit', value: `₹${room.deposit.toLocaleString()}` },
          { icon: '📍', label: 'Distance', value: room.distance + ' from you' },
          { icon: '🚻', label: 'Gender', value: room.gender },
        ].map((item, i, arr) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex', py: 1.25,
              borderBottom: i < arr.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ width: 28, flexShrink: 0, fontSize: 18 }}>{item.icon}</Box>
            <Box>
              <Typography variant="caption" color="text.secondary">{item.label}</Typography>
              <Typography variant="body2" fontWeight={500}>{item.value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Description */}
      <Typography variant="subtitle2" gutterBottom>About this place</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {room.description}
      </Typography>

      {/* Amenities */}
      <Typography variant="subtitle2" gutterBottom>Amenities</Typography>
      <Stack direction="row" flexWrap="wrap" sx={{ gap: 1, mb: 2 }}>
        {room.amenities.map(a => <AmenityChip key={a} label={a} selected />)}
      </Stack>

      {/* Map placeholder */}
      <Typography variant="subtitle2" gutterBottom>Location</Typography>
      <Box
        sx={{
          height: 150, borderRadius: 2, mb: 2,
          background: 'linear-gradient(135deg, #E8EEF4 0%, #D0DFF0 40%, #C5D5E8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid', borderColor: 'divider',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <Box sx={{ fontSize: 40 }}>📍</Box>
        <Button
          size="small" variant="contained"
          sx={{ position: 'absolute', bottom: 10, right: 10, borderRadius: '20px', fontSize: '0.75rem' }}
        >
          Open in Maps
        </Button>
      </Box>

      {/* Owner */}
      <Typography variant="subtitle2" gutterBottom>Listed by</Typography>
      <Box
        sx={{
          bgcolor: 'background.paper', borderRadius: 2,
          p: 1.5, mb: { xs: 10, md: 2 },
          display: 'flex', alignItems: 'center', gap: 1.5,
          border: '1px solid', borderColor: 'divider',
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 700 }}>{room.owner.initials}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" fontWeight={600}>{room.owner.name}</Typography>
          <Typography variant="caption" color="text.secondary">Listed 2 months ago</Typography>
        </Box>
        {room.owner.verified && (
          <Chip icon={<VerifiedIcon sx={{ fontSize: 14 }} />} label="Verified" size="small" color="success" />
        )}
      </Box>
    </Box>
  );

  const ContactCard = (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        border: '1px solid', borderColor: 'divider',
        position: { md: 'sticky' },
        top: { md: 20 },
      }}
    >
      <Typography variant="h4" color="primary.main" fontWeight={800} mb={0.5}>
        ₹{room.rent.toLocaleString()}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" mb={2}>
        per month
      </Typography>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Deposit</Typography>
          <Typography variant="body2" fontWeight={600}>₹{room.deposit.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Sharing</Typography>
          <Typography variant="body2" fontWeight={600}>{room.sharing}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Gender</Typography>
          <Typography variant="body2" fontWeight={600}>{room.gender}</Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Button
          variant="contained" color="success"
          startIcon={<PhoneIcon />}
          onClick={() => handleContact('call')}
          sx={{ py: 1.25 }}
        >
          Call
        </Button>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={() => handleContact('whatsapp')}
          sx={{ py: 1.25, bgcolor: '#25D366', '&:hover': { bgcolor: '#1ebe59' } }}
        >
          WhatsApp
        </Button>
      </Box>
    </Paper>
  );

  return (
    <AppLayout>
      {/* Desktop top bar */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          px: 3, py: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid', borderColor: 'divider',
          gap: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>{room.title}</Typography>
        <IconButton><ShareIcon /></IconButton>
        <IconButton onClick={() => toggleFavorite(room.id)}>
          {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Mobile layout */}
      <Box sx={{ display: { md: 'none' } }}>
        {Gallery}
        {RoomInfo}
        {/* Mobile fixed bottom buttons */}
        <Box
          sx={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            bgcolor: 'background.paper', p: 2,
            borderTop: '1px solid', borderColor: 'divider',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5,
          }}
        >
          <Button
            variant="contained" color="success"
            startIcon={<PhoneIcon />}
            onClick={() => handleContact('call')}
            sx={{ py: 1.25 }}
          >
            Call owner
          </Button>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={() => handleContact('whatsapp')}
            sx={{ py: 1.25, bgcolor: '#25D366', '&:hover': { bgcolor: '#1ebe59' } }}
          >
            WhatsApp
          </Button>
        </Box>
      </Box>

      {/* Desktop 2-col layout */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 3, p: 3, maxWidth: 1200, mx: 'auto',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: main content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {Gallery}
          {RoomInfo}
        </Box>

        {/* Right: contact card */}
        <Box sx={{ width: 320, flexShrink: 0 }}>
          {ContactCard}
        </Box>
      </Box>

      <LoginGateDialog
        open={loginOpen} onClose={() => setLoginOpen(false)}
        onSuccess={afterLogin} pendingAction={pendingAction}
      />

      <Snackbar
        open={!!toast} autoHideDuration={3000}
        onClose={() => setToast('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToast('')}>{toast}</Alert>
      </Snackbar>
    </AppLayout>
  );
}
