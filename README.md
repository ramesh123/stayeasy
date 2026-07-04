# StayEasy — Hostel & Bachelor Room Rental App

A modern, mobile-first React + MUI app for finding and listing hostels and bachelor rooms.

## Tech Stack

- **React 18** with React Router v6
- **Material UI (MUI) v5** with custom theme
- **Context API** for state management (auth + rooms)
- **Responsive** — works on mobile, tablet, and desktop

## Color Palette

| Token       | Hex       |
|-------------|-----------|
| Primary     | `#1976D2` |
| Secondary   | `#26A69A` |
| Accent      | `#FF9800` |
| Background  | `#F5F7FA` |
| Card radius | `12px`    |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── BottomNav.jsx         # User bottom navigation bar
│   │   ├── RoomCard.jsx          # Reusable room card (vertical + horizontal)
│   │   ├── AmenityChip.jsx       # Amenity chip with icon
│   │   ├── LoginGateDialog.jsx   # OTP login popup (contact gate)
│   │   └── FilterDrawer.jsx      # Search filter bottom sheet
│   ├── auth/                     # (extend for shared auth components)
│   ├── owner/                    # (extend for owner-specific components)
│   └── user/                     # (extend for user-specific components)
│
├── pages/
│   ├── auth/
│   │   ├── SplashPage.jsx        # App entry screen
│   │   ├── RegisterPage.jsx      # Registration with role select
│   │   ├── OtpPage.jsx           # OTP verification
│   │   └── LoginPage.jsx         # Phone + OTP login
│   │
│   ├── owner/
│   │   ├── OwnerDashboardPage.jsx  # Stats, quick actions, inquiries
│   │   ├── AddHostelPage.jsx       # Create hostel listing
│   │   ├── AddRoomPage.jsx         # Create room listing
│   │   └── ManageRoomsPage.jsx     # Grid view with edit/delete/status
│   │
│   └── user/
│       ├── HomePage.jsx           # Discovery home with categories
│       ├── SearchPage.jsx         # Search + filter results
│       ├── RoomDetailPage.jsx     # Full room detail + contact gate
│       ├── FavoritesPage.jsx      # Saved rooms list
│       └── ProfilePage.jsx        # User profile + settings
│
├── store/
│   ├── authStore.js              # Auth context (login/logout/role)
│   └── roomsStore.js             # Rooms context (data/filters/favorites)
│
├── theme/
│   └── index.js                  # MUI theme with design tokens
│
├── hooks/                        # (extend: useLocation, useOtp, etc.)
├── services/                     # (extend: api.js, maps.js)
├── App.jsx                       # Router + providers
└── index.js                      # Entry point
```

## User Roles

| Role             | Entry After Login    |
|------------------|----------------------|
| `end_user`       | `/home`              |
| `hostel_owner`   | `/owner/dashboard`   |
| `bachelor_owner` | `/owner/dashboard`   |

## Key Features

- **OTP login gate** — Tapping Call/WhatsApp on Room Detail prompts login if not authenticated
- **Favorites** — Toggle heart icon on any card to save/unsave
- **Filter drawer** — Price slider, sharing type, amenities, sort options
- **Role-based routing** — Owners go to dashboard, users go to home
- **Responsive grid** — Auto-fit columns on all screen sizes

## Extending

### Add Google Maps
```bash
npm install @react-google-maps/api
```
Replace the map placeholder divs in `AddHostelPage` and `RoomDetailPage`.

### Add API integration
Create `src/services/api.js` with Axios/fetch calls.
Replace sample data in `roomsStore.js` with API fetches.

### Add real OTP
Integrate Firebase Auth or Twilio Verify in `LoginGateDialog.jsx` and `OtpPage.jsx`.
