import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import PetCard from './PetCard';
import { PetType } from '@/types';

interface PetListProps {
  pets: PetType[];
}

export default function PetList({ pets }: PetListProps) {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;
  
  // For web, create a responsive grid
  if (isWideScreen) {
    return (
      <View style={styles.gridContainer}>
        {pets.map((pet) => (
          <View key={pet.id} style={styles.gridItem}>
            <PetCard pet={pet} />
          </View>
        ))}
      </View>
    );
  }
  
  // For mobile, display as a list
  return (
    <View style={styles.container}>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  gridContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 8,
  },
});