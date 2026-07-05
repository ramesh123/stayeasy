'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Typography, AppBar, Toolbar, Avatar, Button,
  List, ListItem, ListItemIcon, ListItemText,
  Switch, Divider, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../store/authStore';
import AppLayout from '../../components/layout/AppLayout';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [notifs, setNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Sign out triggers logout() + navigation, so it can't be a plain link — prefetch instead.
  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <AppLayout>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <AppBar
            position="static" color="default" elevation={0}
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Toolbar><Typography variant="h6" fontWeight={600}>Profile</Typography></Toolbar>
          </AppBar>
          <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
            <Box sx={{ fontSize: 56, mb: 2 }}>👤</Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>You're not logged in</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Login to access your profile and saved listings
            </Typography>
            <Button variant="contained" component={Link} href="/login">Login</Button>
          </Box>
        </Box>
      </AppLayout>
    );
  }

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase() || 'U';

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar
          position="static" color="default" elevation={0}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Toolbar><Typography variant="h6" fontWeight={600}>Profile</Typography></Toolbar>
        </AppBar>

        <Box
          sx={{
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 3 },
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {/* Profile summary */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 2,
              bgcolor: 'background.paper', borderRadius: 2,
              p: { xs: 2, md: 2.5 }, mb: 2.5,
              border: '1px solid', borderColor: 'divider',
            }}
          >
            <Avatar
              sx={{
                width: { xs: 64, md: 76 },
                height: { xs: 64, md: 76 },
                bgcolor: 'primary.main',
                fontSize: { xs: 22, md: 26 },
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h5" fontWeight={700} noWrap>{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                +91 {user?.phone}
              </Typography>
              <Chip
                label={
                  user?.role === 'end_user' ? 'Tenant'
                    : user?.role === 'hostel_owner' ? 'Hostel Owner'
                    : 'Room Owner'
                }
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mt: 1, fontSize: '0.75rem' }}
              />
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            {/* Account section */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ px: 0.5 }}>
                Account
              </Typography>
              <Box
                sx={{
                  bgcolor: 'background.paper', borderRadius: 2,
                  overflow: 'hidden', border: '1px solid', borderColor: 'divider',
                }}
              >
                <List disablePadding>
                  <ListItem button divider>
                    <ListItemIcon sx={{ minWidth: 36 }}><EditIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Edit profile" />
                    <ChevronRightIcon color="disabled" />
                  </ListItem>
                  <ListItem button divider component={Link} href="/favorites">
                    <ListItemIcon sx={{ minWidth: 36 }}><FavoriteIcon color="error" /></ListItemIcon>
                    <ListItemText primary="Saved rooms" />
                    <ChevronRightIcon color="disabled" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon sx={{ minWidth: 36 }}><VisibilityIcon color="action" /></ListItemIcon>
                    <ListItemText primary="Viewed rooms" />
                    <ChevronRightIcon color="disabled" />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            {/* Settings section */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ px: 0.5 }}>
                Preferences
              </Typography>
              <Box
                sx={{
                  bgcolor: 'background.paper', borderRadius: 2,
                  overflow: 'hidden', border: '1px solid', borderColor: 'divider',
                }}
              >
                <List disablePadding>
                  <ListItem divider>
                    <ListItemIcon sx={{ minWidth: 36 }}><NotificationsIcon color="warning" /></ListItemIcon>
                    <ListItemText primary="Notifications" />
                    <Switch
                      checked={notifs}
                      onChange={e => setNotifs(e.target.checked)}
                      color="primary" size="small"
                    />
                  </ListItem>
                  <ListItem divider>
                    <ListItemIcon sx={{ minWidth: 36 }}><DarkModeIcon color="action" /></ListItemIcon>
                    <ListItemText primary="Dark mode" />
                    <Switch
                      checked={darkMode}
                      onChange={e => setDarkMode(e.target.checked)}
                      size="small"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon sx={{ minWidth: 36 }}><LockIcon color="action" /></ListItemIcon>
                    <ListItemText primary="Privacy & Security" />
                    <ChevronRightIcon color="disabled" />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            {/* Logout */}
            <Grid item xs={12}>
              <Button
                fullWidth variant="contained" color="error"
                startIcon={<LogoutIcon />}
                onClick={() => setLogoutOpen(true)}
                sx={{ py: 1.25, maxWidth: { md: 300 }, display: { md: 'flex' }, mx: { md: 'auto' } }}
              >
                Sign out
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Sign out?</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              You'll need to log in again to contact owners or view saved rooms.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
            <Button onClick={handleLogout} color="error" variant="contained">Sign out</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppLayout>
  );
}
