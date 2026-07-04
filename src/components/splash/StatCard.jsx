import React from 'react';
import { Box, Typography } from '@mui/material';

export default function StatCard({ value, label }) {
  return (
    <Box
      sx={{
        flex: '1 1 100px',
        minWidth: 100,
        textAlign: 'center',
        py: 1.25,
        borderRadius: '16px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h4" color="primary.main" fontWeight={800}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}
