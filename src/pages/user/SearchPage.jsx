import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, IconButton, InputBase, Paper,
  Typography, Chip, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useRooms } from '../../store/roomsStore';
import RoomCard from '../../components/common/RoomCard';
import FilterDrawer from '../../components/filters/FilterDrawer';
import FilterSidebar from '../../components/filters/FilterSidebar';
import AppLayout from '../../components/layout/AppLayout';

const QUICK_FILTERS = ['All', 'Hostels', 'Bachelor rooms', 'WiFi', 'Food', 'AC', 'Available'];

export default function SearchPage() {
  const navigate = useNavigate();
  const { getFilteredRooms } = useRooms();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = getFilteredRooms(query);

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar
          position="sticky" color="default" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar sx={{ gap: 1 }}>
            <IconButton edge="start" onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
            <Paper
              sx={{
                flex: 1, display: 'flex', alignItems: 'center',
                px: 1.5, py: 0.5, borderRadius: '20px', bgcolor: 'background.default',
              }}
              elevation={0}
            >
              <SearchIcon sx={{ fontSize: 18, color: 'text.disabled', mr: 1 }} />
              <InputBase
                placeholder="Location, area, city…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                sx={{ flex: 1, fontSize: '0.875rem' }}
                autoFocus
              />
            </Paper>
            {/* Filter button — mobile only (desktop uses sidebar) */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                bgcolor: 'primary.main', color: '#fff',
                '&:hover': { bgcolor: 'primary.dark' },
                display: { md: 'none' },
              }}
            >
              <TuneIcon />
            </IconButton>
          </Toolbar>

          {/* Quick filter chips — mobile only */}
          <Box
            sx={{
              px: 2, pb: 1, display: { xs: 'flex', md: 'none' },
              gap: 1, overflowX: 'auto',
            }}
          >
            {QUICK_FILTERS.map(f => (
              <Chip
                key={f} label={f} size="small"
                variant={activeFilter === f ? 'filled' : 'outlined'}
                color={activeFilter === f ? 'primary' : 'default'}
                onClick={() => setActiveFilter(f)}
                sx={{ flexShrink: 0 }}
              />
            ))}
          </Box>
        </AppBar>

        <Box sx={{ display: 'flex', gap: 2.5, px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
          {/* Desktop filter sidebar */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <FilterSidebar />
          </Box>

          {/* Results area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', mb: 1.5,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </Typography>
              <ToggleButtonGroup
                value={viewMode} exclusive
                onChange={(_, v) => v && setViewMode(v)}
                size="small"
              >
                <ToggleButton value="list"><ViewListIcon sx={{ fontSize: 18 }} /></ToggleButton>
                <ToggleButton value="grid"><GridViewIcon sx={{ fontSize: 18 }} /></ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {results.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Box sx={{ fontSize: 56, mb: 2 }}>🔍</Box>
                <Typography variant="h5" fontWeight={600} gutterBottom>No rooms found</Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters or search term
                </Typography>
              </Box>
            ) : viewMode === 'list' ? (
              results.map(room => <RoomCard key={room.id} room={room} variant="horizontal" />)
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr', lg: 'repeat(3, 1fr)' },
                  gap: 1.5,
                }}
              >
                {results.map(room => <RoomCard key={room.id} room={room} variant="vertical" />)}
              </Box>
            )}
          </Box>
        </Box>

        {/* Mobile filter drawer */}
        <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </Box>
    </AppLayout>
  );
}
