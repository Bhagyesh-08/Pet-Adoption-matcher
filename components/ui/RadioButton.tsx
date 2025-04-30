import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
  style?: ViewStyle;
}

export default function RadioButton({
  label,
  value,
  selected,
  onSelect,
  style
}: RadioButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  
  return (
    <TouchableOpacity 
      onPress={onSelect} 
      style={[styles.container, style]}
    >
      <View style={[
        styles.radio, 
        { borderColor: selected ? colors.primary : colors.border }
      ]}>
        {selected && (
          <View style={[styles.selected, { backgroundColor: colors.primary }]} />
        )}
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
  },
});