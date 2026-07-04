import React from 'react';
import { Container } from '@mui/material';

export default function PageContainer({ children, maxWidth = 'lg', sx = {} }) {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, md: 3 }, ...sx }}
    >
      {children}
    </Container>
  );
}
