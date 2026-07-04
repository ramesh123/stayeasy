'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useRooms } from '../../store/roomsStore';
import FilterContent from './FilterContent';

export default function FilterSidebar() {
  const { filters, setFilters } = useRooms();
  const [local, setLocal] = useState(filters);

  const apply = () => setFilters(local);

  const reset = () => {
    const def = {
      type: 'all', priceMin: 0, priceMax: 20000,
      sharing: 'all', food: false, wifi: false, ac: false,
      availableOnly: false, sortBy: 'nearest',
    };
    setLocal(def);
    setFilters(def);
  };

  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: 2.5,
        position: 'sticky',
        top: 80,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        alignSelf: 'flex-start',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>Filters</Typography>
        <Typography
          variant="caption" color="primary.main" fontWeight={600}
          sx={{ cursor: 'pointer' }} onClick={reset}
        >
          Reset all
        </Typography>
      </Box>

      <FilterContent local={local} setLocal={setLocal} />

      <Button variant="contained" fullWidth onClick={apply} sx={{ mt: 3, py: 1.25 }}>
        Apply filters
      </Button>
    </Box>
  );
}
