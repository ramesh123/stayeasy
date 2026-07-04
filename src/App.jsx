import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { AuthProvider, useAuth, ROLES } from './store/authStore';
import { RoomsProvider } from './store/roomsStore';

// Auth pages
import SplashPage from './pages/auth/SplashPage';
import RegisterPage from './pages/auth/RegisterPage';
import OtpPage from './pages/auth/OtpPage';
import LoginPage from './pages/auth/LoginPage';

// User pages
import HomePage from './pages/user/HomePage';
import SearchPage from './pages/user/SearchPage';
import RoomDetailPage from './pages/user/RoomDetailPage';
import FavoritesPage from './pages/user/FavoritesPage';
import ProfilePage from './pages/user/ProfilePage';

// Owner pages
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage';
import AddHostelPage from './pages/owner/AddHostelPage';
import AddRoomPage from './pages/owner/AddRoomPage';
import ManageRoomsPage from './pages/owner/ManageRoomsPage';

function OwnerRoute({ children }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role === ROLES.END_USER) return <Navigate to="/home" />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* End user */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/room/:id" element={<RoomDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/bookings" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Owner */}
      <Route path="/owner/dashboard" element={<OwnerRoute><OwnerDashboardPage /></OwnerRoute>} />
      <Route path="/owner/add-hostel" element={<OwnerRoute><AddHostelPage /></OwnerRoute>} />
      <Route path="/owner/add-room" element={<OwnerRoute><AddRoomPage /></OwnerRoute>} />
      <Route path="/owner/rooms" element={<OwnerRoute><ManageRoomsPage /></OwnerRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RoomsProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </RoomsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
