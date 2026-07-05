import LoginPage from '../../components/auth/LoginPage';

export const metadata = {
  title: 'Login',
  description: 'Login to your StayEasy account to search, save and book hostels and bachelor rooms.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginPage />;
}
