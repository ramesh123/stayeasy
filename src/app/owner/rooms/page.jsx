import OwnerGate from '../../../components/auth/OwnerGate';
import ManageRoomsPage from '../../../components/owner/ManageRoomsPage';

export const metadata = {
  title: 'My Rooms',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <OwnerGate>
      <ManageRoomsPage />
    </OwnerGate>
  );
}
