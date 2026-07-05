import OwnerGate from '../../../components/auth/OwnerGate';
import AddHostelPage from '../../../components/owner/AddHostelPage';

export const metadata = {
  title: 'Add Hostel',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <OwnerGate>
      <AddHostelPage />
    </OwnerGate>
  );
}
