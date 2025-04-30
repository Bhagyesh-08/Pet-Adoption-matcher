import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import PetForm from '@/components/pets/PetForm';
import { PetType } from '@/types';

export default function AddPetScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (pet: PetType) => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success', 
        `${pet.name} has been added for adoption. Thank you for helping them find a new home!`,
        [{ text: 'OK' }]
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>List a Pet</Text>
            <Text style={[styles.subtitle, { color: colors.textDim }]}>
              Help your pet find a loving home
            </Text>
          </View>
          
          <PetForm onSubmit={handleSubmit} isLoading={isLoading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 24,
  },
});