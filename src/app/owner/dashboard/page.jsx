import OwnerGate from '../../../components/auth/OwnerGate';
import OwnerDashboardPage from '../../../components/owner/OwnerDashboardPage';

export const metadata = {
  title: 'Owner Dashboard',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <OwnerGate>
      <OwnerDashboardPage />
    </OwnerGate>
  );
}
