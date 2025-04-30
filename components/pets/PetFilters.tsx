import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Pressable 
} from 'react-native';
import { useColorScheme } from 'react-native';
import { ChevronDown, ChevronUp, FilterX } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { FilterOptions } from '@/types';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.chipText,
          { color: selected ? 'white' : colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface PetFiltersProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

export default function PetFilters({ filters, setFilters }: PetFiltersProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [expanded, setExpanded] = useState(false);
  
  const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster'];
  const ageOptions = ['Puppy', 'Young', 'Adult', 'Senior'];
  const genderOptions = ['Male', 'Female'];
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const toggleFilter = (type: 'species' | 'age' | 'gender', value: string) => {
    const currentFilters = [...filters[type]];
    const index = currentFilters.indexOf(value);
    
    if (index === -1) {
      currentFilters.push(value);
    } else {
      currentFilters.splice(index, 1);
    }
    
    setFilters({ ...filters, [type]: currentFilters });
  };
  
  const clearFilters = () => {
    setFilters({
      species: [],
      age: [],
      gender: [],
    });
  };
  
  const hasActiveFilters = filters.species.length > 0 || filters.age.length > 0 || filters.gender.length > 0;
  
  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable style={styles.expandButton} onPress={toggleExpanded}>
          <Text style={[styles.headerText, { color: colors.text }]}>Filters</Text>
          {expanded ? (
            <ChevronUp size={20} color={colors.text} />
          ) : (
            <ChevronDown size={20} color={colors.text} />
          )}
        </Pressable>
        
        {hasActiveFilters && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <FilterX size={16} color={colors.primary} />
            <Text style={[styles.clearText, { color: colors.primary }]}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {expanded && (
        <View style={styles.filtersContent}>
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>Species</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {speciesOptions.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  selected={filters.species.includes(option)}
                  onPress={() => toggleFilter('species', option)}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>Age</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {ageOptions.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  selected={filters.age.includes(option)}
                  onPress={() => toggleFilter('age', option)}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>Gender</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {genderOptions.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  selected={filters.gender.includes(option)}
                  onPress={() => toggleFilter('gender', option)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginRight: 4,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  filtersContent: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  chipScroll: {
    flexDirection: 'row',
  },
  chip: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});