import React from 'react';
import {
  Box, Typography, Slider, FormControlLabel, Switch,
  Divider, Stack, Chip,
} from '@mui/material';

const SHARING_OPTIONS = ['All', 'Single', 'Double', 'Triple', 'Four'];
const SORT_OPTIONS = [
  { value: 'nearest', label: 'Nearest' },
  { value: 'price_asc', label: '₹ Low → High' },
  { value: 'price_desc', label: '₹ High → Low' },
  { value: 'newest', label: 'Newest' },
];

export default function FilterContent({ local, setLocal }) {
  return (
    <>
      <Typography variant="subtitle2" gutterBottom>Type</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
        {['all', 'hostel', 'bachelor'].map(t => (
          <Chip
            key={t}
            label={t === 'all' ? 'All' : t === 'hostel' ? 'Hostel' : 'Bachelor room'}
            variant={local.type === t ? 'filled' : 'outlined'}
            color={local.type === t ? 'primary' : 'default'}
            onClick={() => setLocal(p => ({ ...p, type: t }))}
            size="small"
          />
        ))}
      </Stack>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" gutterBottom>
        Price range: ₹{local.priceMin.toLocaleString()} – ₹{local.priceMax.toLocaleString()}
      </Typography>
      <Slider
        value={[local.priceMin, local.priceMax]}
        min={0} max={20000} step={500}
        onChange={(_, v) => setLocal(p => ({ ...p, priceMin: v[0], priceMax: v[1] }))}
        valueLabelDisplay="auto"
        valueLabelFormat={v => `₹${(v / 1000).toFixed(0)}k`}
        sx={{ mb: 2 }}
      />

      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" gutterBottom>Sharing type</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
        {SHARING_OPTIONS.map(s => (
          <Chip
            key={s} label={s}
            variant={local.sharing === s.toLowerCase() || (s === 'All' && local.sharing === 'all') ? 'filled' : 'outlined'}
            color={local.sharing === s.toLowerCase() || (s === 'All' && local.sharing === 'all') ? 'primary' : 'default'}
            onClick={() => setLocal(p => ({ ...p, sharing: s === 'All' ? 'all' : s.toLowerCase() }))}
            size="small"
          />
        ))}
      </Stack>

      <Divider sx={{ mb: 1 }} />
      <FormControlLabel
        control={<Switch checked={local.food} onChange={e => setLocal(p => ({ ...p, food: e.target.checked }))} color="secondary" />}
        label="Food included"
      />
      <FormControlLabel
        control={<Switch checked={local.wifi} onChange={e => setLocal(p => ({ ...p, wifi: e.target.checked }))} color="secondary" />}
        label="WiFi"
      />
      <FormControlLabel
        control={<Switch checked={local.ac} onChange={e => setLocal(p => ({ ...p, ac: e.target.checked }))} color="secondary" />}
        label="AC"
      />
      <FormControlLabel
        control={<Switch checked={local.availableOnly} onChange={e => setLocal(p => ({ ...p, availableOnly: e.target.checked }))} color="secondary" />}
        label="Available rooms only"
      />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" gutterBottom>Sort by</Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {SORT_OPTIONS.map(s => (
          <Chip
            key={s.value} label={s.label}
            variant={local.sortBy === s.value ? 'filled' : 'outlined'}
            color={local.sortBy === s.value ? 'primary' : 'default'}
            onClick={() => setLocal(p => ({ ...p, sortBy: s.value }))}
            size="small"
          />
        ))}
      </Stack>
    </>
  );
}
