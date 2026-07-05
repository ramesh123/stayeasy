import OwnerGate from '../../../components/auth/OwnerGate';
import AddRoomPage from '../../../components/owner/AddRoomPage';

export const metadata = {
  title: 'Add Room',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <OwnerGate>
      <AddRoomPage />
    </OwnerGate>
  );
}
