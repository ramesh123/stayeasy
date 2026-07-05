import ProfilePage from '../../components/user/ProfilePage';

export const metadata = {
  title: 'Profile',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ProfilePage />;
}
