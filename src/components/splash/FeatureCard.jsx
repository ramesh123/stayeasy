import React from 'react';
import { Box, Typography } from '@mui/material';

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.25,
        p: 1.75,
        borderRadius: '16px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 28px rgba(25,118,210,0.14)',
          '& .feature-icon': {
            bgcolor: 'primary.main',
            color: '#fff',
          },
        },
      }}
    >
      <Box
        className="feature-icon"
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          bgcolor: 'primary.light',
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color .2s ease, color .2s ease',
        }}
      >
        <Icon fontSize="small" />
      </Box>
      <Box>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
