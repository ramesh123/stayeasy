import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Box, Typography,
  Chip, IconButton, Stack,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRooms } from '../../store/roomsStore';

const AMENITY_ICONS = {
  WiFi: <WifiIcon sx={{ fontSize: 14 }} />,
  Food: <RestaurantIcon sx={{ fontSize: 14 }} />,
  AC: <AcUnitIcon sx={{ fontSize: 14 }} />,
  Security: <SecurityIcon sx={{ fontSize: 14 }} />,
};

const ROOM_COLORS = [
  'linear-gradient(135deg, #1976D2, #26A69A)',
  'linear-gradient(135deg, #26A69A, #00796B)',
  'linear-gradient(135deg, #7B1FA2, #1976D2)',
  'linear-gradient(135deg, #E65100, #FF9800)',
];

export default function RoomCard({ room, variant = 'vertical', onFavoriteGate }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useRooms();
  const fav = isFavorite(room.id);
  const colorIndex = parseInt(room.id) % ROOM_COLORS.length;

  const handleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(room.id);
  };

  if (variant === 'horizontal') {
    return (
      <Card
        onClick={() => navigate(`/room/${room.id}`)}
        sx={{
          display: 'flex', gap: 0, cursor: 'pointer',
          mb: 1.5,
          '&:hover': { transform: 'translateY(-1px)' },
          transition: 'transform .15s',
        }}
      >
        <Box
          sx={{
            width: { xs: 90, md: 110 },
            minHeight: 90,
            flexShrink: 0,
            background: ROOM_COLORS[colorIndex],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: { xs: 32, md: 38 },
          }}
        >
          🛏
        </Box>
        <CardContent sx={{ flex: 1, p: { xs: 1.5, md: 2 }, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '0.875rem', md: '0.9375rem' } }}
            >
              {room.title}
            </Typography>
            <IconButton size="small" onClick={handleFav} sx={{ mt: -0.5, mr: -0.5 }}>
              {fav
                ? <FavoriteIcon sx={{ fontSize: 18, color: 'error.main' }} />
                : <FavoriteBorderIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              }
            </IconButton>
          </Box>
          <Typography
            variant="caption" color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}
          >
            <LocationOnIcon sx={{ fontSize: 12 }} />{room.area} · {room.distance}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
            {room.amenities.slice(0, 3).map(a => (
              <Chip
                key={a} label={a} size="small"
                icon={AMENITY_ICONS[a]}
                sx={{ fontSize: '0.65rem', height: 20, '& .MuiChip-icon': { fontSize: 12 } }}
              />
            ))}
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
            <Typography
              variant="body1" color="primary.main" fontWeight={700}
              sx={{ fontSize: { xs: '0.875rem', md: '0.9375rem' } }}
            >
              ₹{room.rent.toLocaleString()}
              <Typography component="span" variant="caption" color="text.secondary">/mo</Typography>
            </Typography>
            <Chip
              label={room.available ? (room.bedsLeft === 1 ? '1 left' : 'Available') : 'Full'}
              size="small"
              color={room.available ? 'success' : 'default'}
              sx={{ fontSize: '0.65rem', height: 20 }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card onClick={() => navigate(`/room/${room.id}`)} sx={{ cursor: 'pointer', height: '100%' }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: { xs: 130, md: 160 },
            background: ROOM_COLORS[colorIndex],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: { xs: 40, md: 50 },
          }}
        >
          🏨
        </Box>
        <IconButton
          onClick={handleFav}
          sx={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(255,255,255,0.9)',
            '&:hover': { background: 'rgba(255,255,255,1)' },
            p: 0.5,
          }}
          size="small"
        >
          {fav
            ? <FavoriteIcon sx={{ fontSize: 18, color: 'error.main' }} />
            : <FavoriteBorderIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
          }
        </IconButton>
      </Box>
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography variant="h6" noWrap sx={{ fontSize: '0.875rem' }}>{room.title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {room.area} · {room.distance}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
          <Typography color="primary.main" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
            ₹{room.rent.toLocaleString()}
            <Typography component="span" variant="caption" color="text.secondary">/mo</Typography>
          </Typography>
          <Chip
            label={room.available ? 'Available' : 'Full'}
            size="small"
            color={room.available ? 'success' : 'default'}
            sx={{ fontSize: '0.65rem', height: 20 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
