import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, InputAdornment, IconButton,
  MenuItem, Select, FormControl, InputLabel, Button, Chip, Grow,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { CITIES } from '../common/LocationPickerDialog';

const PROPERTY_TYPES = ['All', 'Hostels', 'Bachelor Rooms', 'PG', 'Apartment', 'Shared Room'];
const PRICE_RANGES = ['All', 'Below ₹3,000', '₹3,000 - ₹5,000', '₹5,000 - ₹8,000', '₹8,000+'];
const GENDER_OPTIONS = ['All', 'Boys', 'Girls', 'Family', 'Anyone'];
const QUICK_CHIPS = [
  'Hostel', 'PG', 'Bachelor Room', 'Girls Hostel',
  'Boys Hostel', 'Near Metro', 'Near College', 'Near IT Park',
];

export default function SearchCard({ city, onCityChange, onSearch }) {
  const [query, setQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [gender, setGender] = useState('All');

  const handleSearch = () => {
    onSearch({ query, city, propertyType, priceRange, gender });
  };

  return (
    <Grow in timeout={500}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 600,
          borderRadius: '24px',
          p: { xs: 3, sm: 4 },
          boxShadow: '0 20px 60px rgba(25,118,210,0.14)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Find Rooms Near You
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Search hostels and bachelor rooms instantly.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by Hostel Name, Area, Landmark"
          value={query}
          onChange={e => setQuery(e.target.value)}
          sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
          inputProps={{ 'aria-label': 'Search by hostel name, area, or landmark' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setQuery('')} aria-label="Clear search">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 2.5 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="splash-city-label">Location</InputLabel>
            <Select
              labelId="splash-city-label"
              label="Location"
              value={city}
              onChange={e => onCityChange(e.target.value)}
            >
              {CITIES.map(c => (
                <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="splash-type-label">Property Type</InputLabel>
            <Select
              labelId="splash-type-label"
              label="Property Type"
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
            >
              {PROPERTY_TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="splash-gender-label">Gender Preference</InputLabel>
            <Select
              labelId="splash-gender-label"
              label="Gender Preference"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              {GENDER_OPTIONS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{
            py: 1.5,
            borderRadius: '14px',
            fontSize: '1rem',
            transition: 'transform .15s ease, box-shadow .15s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 24px rgba(25,118,210,0.32)',
            },
          }}
        >
          Search Rooms
        </Button>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2.5 }}>
          {QUICK_CHIPS.map(chip => (
            <Chip
              key={chip}
              label={chip}
              onClick={() => setQuery(chip)}
              variant={query === chip ? 'filled' : 'outlined'}
              color={query === chip ? 'primary' : 'default'}
              sx={{
                cursor: 'pointer',
                transition: 'transform .15s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            />
          ))}
        </Box>
      </Paper>
    </Grow>
  );
}
