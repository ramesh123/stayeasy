'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box, Typography, AppBar, Toolbar, IconButton, Avatar,
  Card, CardContent, Grid, Button, LinearProgress, Divider,
  List, ListItem, ListItemAvatar, ListItemText, Tabs, Tab,
  Chip, Badge,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useAuth } from '../../store/authStore';
import AppLayout from '../../components/layout/AppLayout';

const STATS = [
  { label: 'Total rooms', value: 24, icon: '🏠', color: '#1976D2' },
  { label: 'Occupied', value: 18, icon: '✅', color: '#26A69A' },
  { label: 'Available', value: 6, icon: '🔓', color: '#FF9800' },
  { label: "Today's views", value: 142, icon: '👁', color: '#7B1FA2' },
];

const INQUIRIES = [
  { initials: 'RK', name: 'Ravi Kumar', message: 'Asked about Double sharing room', time: '2 mins ago', color: '#1976D2' },
  { initials: 'PS', name: 'Priya Singh', message: 'Called about Triple sharing', time: '1 hr ago', color: '#26A69A' },
  { initials: 'AV', name: 'Arjun V', message: 'WhatsApp about Single room', time: '3 hrs ago', color: '#E65100' },
];

export default function OwnerDashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  const occupancyPct = Math.round((18 / 24) * 100);

  return (
    <AppLayout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Dashboard header */}
        <Box sx={{ background: 'linear-gradient(135deg, #1976D2, #1256A0)', pb: 2 }}>
         {/* Stat strip */}
          <Box
            sx={{
              display: 'flex', justifyContent: 'space-around',
              px: { xs: 2, md: 4 }, mt: 0.5,
              maxWidth: 1200, mx: 'auto',
            }}
          >
            {[
              { n: 24, l: 'Total' },
              { n: 18, l: 'Occupied' },
              { n: 6, l: 'Available' },
              { n: 142, l: 'Views' },
            ].map(s => (
              <Box key={s.l} sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.35rem' }}>{s.n}</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>{s.l}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, pt: 2, maxWidth: 1200, mx: 'auto' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Overview" />
            <Tab label="Analytics" />
            <Tab label="Inquiries" />
          </Tabs>

          {tab === 0 && (
            <>
              {/* Quick actions */}
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Quick actions
              </Typography>
              <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                {[
                  { icon: <AddCircleIcon color="primary" />, label: 'Add room', path: '/owner/add-room' },
                  { icon: <ManageAccountsIcon color="secondary" />, label: 'Manage rooms', path: '/owner/rooms' },
                  { icon: <AnalyticsIcon sx={{ color: '#7B1FA2' }} />, label: 'Analytics', path: null },
                ].map(a => (
                  <Grid item xs={4} sm={3} md={2} key={a.label}>
                    <Card
                      {...(a.path ? { component: Link, href: a.path } : {})}
                      sx={{
                        textAlign: 'center', p: { xs: 1.5, md: 2 },
                        cursor: a.path ? 'pointer' : 'default',
                        textDecoration: 'none', color: 'inherit',
                        '&:hover': a.path ? { bgcolor: 'primary.light' } : {},
                      }}
                    >
                      <Box sx={{ mb: 0.5 }}>{a.icon}</Box>
                      <Typography variant="caption" fontWeight={500}>{a.label}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={2.5}>
                {/* Left column */}
                <Grid item xs={12} md={8}>
                  {/* Stat cards */}
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Performance
                  </Typography>
                  <Grid container spacing={1.5} sx={{ mb: 2 }}>
                    {STATS.map(s => (
                      <Grid item xs={6} sm={3} md={3} key={s.label}>
                        <Card>
                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Box sx={{ fontSize: 22, mb: 0.5 }}>{s.icon}</Box>
                            <Typography variant="h4" fontWeight={700} sx={{ color: s.color }}>
                              {s.value}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Occupancy */}
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2">Occupancy rate</Typography>
                        <Chip label={`${occupancyPct}%`} size="small" color="success" />
                      </Box>
                      <LinearProgress
                        variant="determinate" value={occupancyPct}
                        sx={{ height: 8, borderRadius: 4, mb: 0.5 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        18 of 24 rooms occupied
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Right column */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', mb: 1,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Recent inquiries
                    </Typography>
                    <Typography
                      variant="caption" color="primary.main" fontWeight={600}
                      sx={{ cursor: 'pointer' }}
                    >
                      View all
                    </Typography>
                  </Box>
                  <Card>
                    <List disablePadding>
                      {INQUIRIES.map((inq, i) => (
                        <React.Fragment key={inq.name}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  bgcolor: inq.color, width: 38,
                                  height: 38, fontSize: 13, fontWeight: 700,
                                }}
                              >
                                {inq.initials}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="body2" fontWeight={600}>{inq.name}</Typography>
                              }
                              secondary={
                                <>
                                  <Typography variant="caption" color="text.secondary">
                                    {inq.message}
                                  </Typography>
                                  <br />
                                  <Typography variant="caption" color="text.disabled">
                                    {inq.time}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                          {i < INQUIRIES.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}

          {tab === 1 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Box sx={{ fontSize: 48, mb: 2 }}>📊</Box>
              <Typography variant="h6" gutterBottom>Analytics coming soon</Typography>
              <Typography variant="body2" color="text.secondary">
                View detailed stats, revenue trends, and occupancy charts
              </Typography>
            </Box>
          )}

          {tab === 2 && (
            <Card>
              <List disablePadding>
                {INQUIRIES.map((inq, i) => (
                  <React.Fragment key={inq.name}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: inq.color, fontWeight: 700 }}>{inq.initials}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={inq.name} secondary={inq.message} />
                      <Typography variant="caption" color="text.disabled">{inq.time}</Typography>
                    </ListItem>
                    {i < INQUIRIES.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Card>
          )}
        </Box>
      </Box>
    </AppLayout>
  );
}
