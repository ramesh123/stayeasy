import FavoritesPage from '../../components/user/FavoritesPage';

export const metadata = {
  title: 'Saved Rooms',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FavoritesPage />;
}
