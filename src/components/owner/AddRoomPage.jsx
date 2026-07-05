'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, AppBar, Toolbar, IconButton, Typography, TextField,
  Button, Grid, FormControlLabel, Switch, Stack, Chip,
  Alert, Snackbar, CircularProgress, Divider, Card, CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AmenityChip from '../../components/common/AmenityChip';
import AppLayout from '../../components/layout/AppLayout';

const ROOM_TYPES = ['Single', 'Double', 'Triple', 'Four sharing', '5+'];
const AMENITIES = ['Food', 'WiFi', 'Attached Bathroom', 'Balcony', 'Washing Machine', 'AC', 'Hot Water', 'CCTV'];

export default function AddRoomPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    type: 'Double', persons: '2', rent: '', deposit: '', beds: '1',
    size: '', description: '', availability: true,
  });
  const [amenities, setAmenities] = useState(['WiFi', 'Food']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Save success navigates after a delay — prefetch the destination up front.
  useEffect(() => {
    router.prefetch('/owner/rooms');
  }, [router]);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const toggleAmenity = (a) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const validate = () => {
    const e = {};
    if (!form.rent) e.rent = 'Monthly rent is required';
    if (!form.deposit) e.deposit = 'Security deposit is required';
    if (!form.description) e.description = 'Description is required';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/owner/rooms'), 1500);
    }, 1000);
  };

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4 }}>
        <AppBar
          position="sticky" color="default" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => router.back()}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>Add room</Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={7}>
              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Room details
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom>Room type</Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
                    {ROOM_TYPES.map(t => (
                      <Chip
                        key={t} label={t}
                        variant={form.type === t ? 'filled' : 'outlined'}
                        color={form.type === t ? 'primary' : 'default'}
                        onClick={() => setForm(p => ({ ...p, type: t }))}
                      />
                    ))}
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Number of persons" type="number"
                        value={form.persons} onChange={set('persons')}
                        inputProps={{ min: 1, max: 10 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Room size (sq ft)" type="number"
                        value={form.size} onChange={set('size')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Monthly rent (₹)" type="number"
                        value={form.rent} onChange={set('rent')}
                        error={!!errors.rent} helperText={errors.rent}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth label="Security deposit (₹)" type="number"
                        value={form.deposit} onChange={set('deposit')}
                        error={!!errors.deposit} helperText={errors.deposit}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth label="Available beds" type="number"
                        value={form.beds} onChange={set('beds')}
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Description
                  </Typography>
                  <TextField
                    fullWidth multiline rows={4}
                    label="About this room"
                    value={form.description} onChange={set('description')}
                    error={!!errors.description} helperText={errors.description}
                    placeholder="Describe the room: features, nearby landmarks, house rules..."
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={5}>
              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Amenities
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
                    {AMENITIES.map(a => (
                      <AmenityChip
                        key={a} label={a}
                        selected={amenities.includes(a)}
                        onClick={() => toggleAmenity(a)}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Photos
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed', borderColor: 'divider',
                      borderRadius: 2, p: 3, textAlign: 'center',
                      cursor: 'pointer', '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 36, color: 'text.disabled', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Tap to upload room photos
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      JPG, PNG up to 10MB each · Min 3 photos
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 2.5 }}>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.availability}
                        onChange={e => setForm(p => ({ ...p, availability: e.target.checked }))}
                        color="success"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" fontWeight={600}>Available now</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Toggle off if room is currently occupied
                        </Typography>
                      </Box>
                    }
                  />
                </CardContent>
              </Card>

              <Button
                fullWidth variant="contained" size="large"
                onClick={handleSave} disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Save room'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={success} autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success">Room saved successfully!</Alert>
        </Snackbar>
      </Box>
    </AppLayout>
  );
}
