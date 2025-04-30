import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder 
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  
  const handleClear = () => {
    onChangeText('');
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[
        styles.searchBar, 
        { 
          backgroundColor: colorScheme === 'dark' ? colors.card : '#F1F5F9',
          borderColor: value ? colors.primary : 'transparent',
        }
      ]}>
        <Search size={20} color={colors.textDim} style={styles.icon} />
        
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder || "Search"}
          placeholderTextColor={colors.textDim}
          value={value}
          onChangeText={onChangeText}
        />
        
        {value !== '' && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <X size={16} color={colors.textDim} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  icon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  clearButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});