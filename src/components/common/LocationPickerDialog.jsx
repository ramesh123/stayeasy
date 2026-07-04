'use client';

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, InputBase, Paper,
  List, ListItemButton, ListItemIcon, ListItemText, Typography, CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export const CITIES = [
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Vijayawada', lat: 16.5062, lng: 80.6480 },
  { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
];

function nearestCity(lat, lng) {
  const toRad = (d) => (d * Math.PI) / 180;
  let best = CITIES[0];
  let bestDist = Infinity;
  for (const c of CITIES) {
    const dLat = toRad(c.lat - lat);
    const dLng = toRad(c.lng - lng);
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(toRad(lat)) * Math.cos(toRad(c.lat)) * Math.sin(dLng / 2) ** 2;
    const dist = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    if (dist < bestDist) { bestDist = dist; best = c; }
  }
  return best;
}

export default function LocationPickerDialog({ open, onClose, currentCity, onSelect }) {
  const [query, setQuery] = useState('');
  const [detecting, setDetecting] = useState(false);

  const filtered = CITIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (name) => {
    onSelect(name);
    onClose();
  };

  const handleDetect = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDetecting(false);
        const city = nearestCity(pos.coords.latitude, pos.coords.longitude);
        handleSelect(city.name);
      },
      () => setDetecting(false),
      { timeout: 8000 },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        Choose your city
        <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        <Paper
          variant="outlined"
          sx={{ p: '4px 12px', display: 'flex', alignItems: 'center', gap: 1, borderRadius: '10px', mb: 2 }}
        >
          <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
          <InputBase
            placeholder="Search city"
            value={query}
            onChange={e => setQuery(e.target.value)}
            sx={{ flex: 1, fontSize: '0.875rem' }}
            autoFocus
          />
        </Paper>

        <ListItemButton onClick={handleDetect} sx={{ borderRadius: 1.5, mb: 1, bgcolor: 'primary.light' }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {detecting ? <CircularProgress size={18} /> : <MyLocationIcon color="primary" fontSize="small" />}
          </ListItemIcon>
          <ListItemText
            primary={detecting ? 'Detecting location…' : 'Use current location'}
            primaryTypographyProps={{ fontWeight: 600, fontSize: '0.875rem', color: 'primary.main' }}
          />
        </ListItemButton>

        <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>Popular cities</Typography>
        <List sx={{ maxHeight: 280, overflowY: 'auto' }}>
          {filtered.map(c => (
            <ListItemButton
              key={c.name}
              selected={c.name === currentCity}
              onClick={() => handleSelect(c.name)}
              sx={{ borderRadius: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LocationOnIcon
                  fontSize="small"
                  sx={{ color: c.name === currentCity ? 'primary.main' : 'text.disabled' }}
                />
              </ListItemIcon>
              <ListItemText
                primary={c.name}
                primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: c.name === currentCity ? 600 : 400 }}
              />
            </ListItemButton>
          ))}
          {filtered.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 2 }}>
              No cities found
            </Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
}
