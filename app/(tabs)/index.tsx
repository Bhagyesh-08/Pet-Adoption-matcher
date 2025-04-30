import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import PetList from '@/components/pets/PetList';
import PetFilters from '@/components/pets/PetFilters';
import SearchBar from '@/components/ui/SearchBar';
import { mockPets } from '@/data/mockData';
import Colors from '@/constants/Colors';
import { PetType, FilterOptions } from '@/types';

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    species: [],
    age: [],
    gender: [],
  });
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, this would re-fetch pets
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const filteredPets = mockPets.filter((pet: PetType) => {
    // Filter by search query
    if (searchQuery && !pet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !pet.breed.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by species
    if (filters.species.length > 0 && !filters.species.includes(pet.species)) {
      return false;
    }
    
    // Filter by age
    if (filters.age.length > 0 && !filters.age.includes(pet.ageGroup)) {
      return false;
    }
    
    // Filter by gender
    if (filters.gender.length > 0 && !filters.gender.includes(pet.gender)) {
      return false;
    }
    
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Find Your</Text>
        <Text style={[styles.subtitle, { color: colors.primary }]}>Perfect Pet</Text>
      </View>
      
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search pets by name or breed"
      />
      
      <PetFilters filters={filters} setFilters={setFilters} />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PetList pets={filteredPets} />
        
        {filteredPets.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textDim }]}>
              No pets found matching your criteria.
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textDim }]}>
              Try adjusting your filters or search query.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 24 : 8,
    paddingBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
  },
  subtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});