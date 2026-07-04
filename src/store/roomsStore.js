'use client';

import React, { createContext, useContext, useState } from 'react';
import { SAMPLE_ROOMS } from '../data/rooms';

const RoomsContext = createContext(null);

export function RoomsProvider({ children }) {
  const [rooms] = useState(SAMPLE_ROOMS);
  const [favorites, setFavorites] = useState(['2']);
  const [filters, setFilters] = useState({
    type: 'all', priceMin: 0, priceMax: 20000,
    sharing: 'all', food: false, wifi: false, ac: false, availableOnly: false,
    sortBy: 'nearest',
  });

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  const getFilteredRooms = (query = '') => {
    return rooms.filter(r => {
      if (filters.type !== 'all' && r.type !== filters.type) return false;
      if (r.rent < filters.priceMin || r.rent > filters.priceMax) return false;
      if (filters.sharing !== 'all' && r.sharing.toLowerCase() !== filters.sharing.toLowerCase()) return false;
      if (filters.food && !r.amenities.includes('Food')) return false;
      if (filters.wifi && !r.amenities.includes('WiFi')) return false;
      if (filters.ac && !r.amenities.includes('AC')) return false;
      if (filters.availableOnly && !r.available) return false;
      if (query && !r.title.toLowerCase().includes(query.toLowerCase()) &&
          !r.area.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  };

  const getRoomById = (id) => rooms.find(r => r.id === id);

  return (
    <RoomsContext.Provider value={{
      rooms, favorites, filters, setFilters,
      toggleFavorite, isFavorite, getFilteredRooms, getRoomById,
    }}>
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  return useContext(RoomsContext);
}
