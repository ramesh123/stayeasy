import React, { useState } from 'react';
import {
  SwipeableDrawer, Box, Typography, Button, Slider,
  FormControlLabel, Switch, Divider, Stack, Chip, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRooms } from '../../store/roomsStore';
import FilterContent from './FilterContent';

export default function FilterDrawer({ open, onClose }) {
  const { filters, setFilters } = useRooms();
  const [local, setLocal] = useState(filters);

  const apply = () => {
    setFilters(local);
    onClose();
  };

  const reset = () => {
    setLocal({
      type: 'all', priceMin: 0, priceMax: 20000,
      sharing: 'all', food: false, wifi: false, ac: false,
      availableOnly: false, sortBy: 'nearest',
    });
  };

  return (
    <SwipeableDrawer
      anchor="bottom" open={open} onClose={onClose} onOpen={() => {}}
      PaperProps={{ sx: { borderRadius: '20px 20px 0 0', maxHeight: '85vh' } }}
    >
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
          <Box sx={{ width: 40, height: 4, bgcolor: 'divider', borderRadius: 2 }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Filters</Typography>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </Box>

        <FilterContent local={local} setLocal={setLocal} />

        <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
          <Button variant="outlined" fullWidth onClick={reset}>Reset</Button>
          <Button variant="contained" fullWidth onClick={apply}>Apply filters</Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
