import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PetType } from '@/types';
import { useAuthStore } from './auth';

interface FavoritesState {
  favorites: Record<string, PetType[]>;
  addFavorite: (userId: string, pet: PetType) => void;
  removeFavorite: (userId: string, petId: string) => void;
  getFavorites: (userId: string) => PetType[];
  isFavorite: (userId: string, petId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      addFavorite: (userId, pet) => {
        set((state) => {
          const userFavorites = state.favorites[userId] || [];
          if (!userFavorites.find(p => p.id === pet.id)) {
            return {
              favorites: {
                ...state.favorites,
                [userId]: [...userFavorites, { ...pet, isFavorite: true }]
              }
            };
          }
          return state;
        });
      },
      removeFavorite: (userId, petId) => {
        set((state) => ({
          favorites: {
            ...state.favorites,
            [userId]: (state.favorites[userId] || []).filter(pet => pet.id !== petId)
          }
        }));
      },
      getFavorites: (userId) => {
        return get().favorites[userId] || [];
      },
      isFavorite: (userId, petId) => {
        return (get().favorites[userId] || []).some(pet => pet.id === petId);
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);