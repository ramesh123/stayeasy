import RegisterPage from '../../views/auth/RegisterPage';

export const metadata = {
  title: 'Create Account',
  description: 'Join StayEasy to find or list hostels and bachelor rooms.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RegisterPage />;
}
