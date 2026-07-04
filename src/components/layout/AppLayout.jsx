import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AppHeader from './AppHeader';
import BottomNav from './BottomNav';

export default function AppLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          pb: { xs: 8, md: 0 },
        }}
      >
        <AppHeader />
        {children}
      </Box>
      {isMobile && <BottomNav />}
    </Box>
  );
}
