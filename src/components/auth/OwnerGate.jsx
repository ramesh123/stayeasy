'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, ROLES } from '../../store/authStore';

export default function OwnerGate({ children }) {
  const router = useRouter();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else if (role === ROLES.END_USER) {
      router.replace('/home');
    }
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated || role === ROLES.END_USER) return null;
  return children;
}
