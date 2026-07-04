import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import BottomNav from './BottomNav';

export default function AppLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {!isMobile && <Sidebar />}
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          ml: { md: `${SIDEBAR_WIDTH}px` },
          pb: { xs: 8, md: 0 },
        }}
      >
        {children}
      </Box>
      {isMobile && <BottomNav />}
    </Box>
  );
}
