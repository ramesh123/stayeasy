import React from 'react';
import { Chip } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SecurityIcon from '@mui/icons-material/Security';
import VideocamIcon from '@mui/icons-material/Videocam';
import BoltIcon from '@mui/icons-material/Bolt';
import ShowerIcon from '@mui/icons-material/Shower';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import BalconyIcon from '@mui/icons-material/Balcony';
import BathtubIcon from '@mui/icons-material/Bathtub';

const ICONS = {
  WiFi: WifiIcon, Food: RestaurantIcon, Parking: LocalParkingIcon,
  AC: AcUnitIcon, Security: SecurityIcon, CCTV: VideocamIcon,
  'Power Backup': BoltIcon, 'Hot Water': ShowerIcon, Laundry: LocalLaundryServiceIcon,
  Balcony: BalconyIcon, 'Attached Bathroom': BathtubIcon,
};

export default function AmenityChip({ label, selected, onClick }) {
  const Icon = ICONS[label];
  return (
    <Chip
      label={label}
      icon={Icon ? <Icon /> : undefined}
      onClick={onClick}
      variant={selected ? 'filled' : 'outlined'}
      color={selected ? 'secondary' : 'default'}
      size="small"
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        fontSize: '0.7rem',
        '& .MuiChip-icon': { fontSize: 14 },
      }}
    />
  );
}
