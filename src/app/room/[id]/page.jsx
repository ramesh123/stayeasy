import RoomDetailPage from '../../../components/user/RoomDetailPage';
import { getRoomById } from '../../../data/rooms';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    return { title: 'Room not found' };
  }

  return {
    title: `${room.title} — ${room.area}, ${room.city}`,
    description: room.description,
  };
}

export default function Page() {
  return <RoomDetailPage />;
}
