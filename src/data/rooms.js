export const SAMPLE_ROOMS = [
  {
    id: '1', title: 'Vikram Boys Hostel', type: 'hostel', sharing: 'Double',
    rent: 6000, deposit: 10000, area: 'Madhapur', city: 'Hyderabad',
    distance: '0.3 km', gender: 'Boys', available: true, bedsLeft: 1,
    amenities: ['WiFi', 'Food', 'CCTV', 'Security', 'Power Backup', 'Hot Water'],
    description: 'Premium boys hostel near HITEC City with all modern amenities. 24/7 security and power backup.',
    owner: { name: 'Vikram Singh', initials: 'VS', phone: '9876543210', verified: true },
    lat: 17.4485, lng: 78.3908,
  },
  {
    id: '2', title: 'Greenfield Rooms', type: 'bachelor', sharing: 'Single',
    rent: 7500, deposit: 15000, area: 'Kondapur', city: 'Hyderabad',
    distance: '1.1 km', gender: 'Both', available: true, bedsLeft: 1,
    amenities: ['AC', 'WiFi', 'Attached Bathroom'],
    description: 'Modern AC rooms with attached bathroom, ideal for working professionals.',
    owner: { name: 'Ravi Teja', initials: 'RT', phone: '9876543211', verified: true },
    lat: 17.4584, lng: 78.3736,
  },
  {
    id: '3', title: 'Paradise PG', type: 'hostel', sharing: 'Triple',
    rent: 5000, deposit: 8000, area: 'Gachibowli', city: 'Hyderabad',
    distance: '1.8 km', gender: 'Girls', available: true, bedsLeft: 3,
    amenities: ['Food', 'Security', 'CCTV', 'WiFi'],
    description: 'Safe and secure girls PG with home-like food. 24/7 security.',
    owner: { name: 'Sridevi M', initials: 'SM', phone: '9876543212', verified: false },
    lat: 17.4401, lng: 78.3489,
  },
  {
    id: '4', title: 'Tech Park Hostel', type: 'hostel', sharing: 'Four',
    rent: 3500, deposit: 5000, area: 'Madhapur', city: 'Hyderabad',
    distance: '0.8 km', gender: 'Boys', available: false, bedsLeft: 0,
    amenities: ['WiFi', 'Parking', 'Power Backup'],
    description: 'Budget-friendly hostel close to major IT parks.',
    owner: { name: 'Naresh K', initials: 'NK', phone: '9876543213', verified: true },
    lat: 17.4512, lng: 78.3821,
  },
];

export function getRoomById(id) {
  return SAMPLE_ROOMS.find(r => r.id === id);
}
