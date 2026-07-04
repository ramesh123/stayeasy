import SearchPage from '../../views/user/SearchPage';

export const metadata = {
  title: 'My Bookings',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SearchPage />;
}
