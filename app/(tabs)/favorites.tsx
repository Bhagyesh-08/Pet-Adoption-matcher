import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import PetList from '@/components/pets/PetList';
import Colors from '@/constants/Colors';
import { useFavoritesStore } from '@/store/favorites';
import { useAuthStore } from '@/store/auth';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [refreshing, setRefreshing] = React.useState(false);
  const user = useAuthStore(state => state.user);
  const getFavorites = useFavoritesStore(state => state.getFavorites);
  
  const favoritePets = user ? getFavorites(user.id) : [];
  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Your Favorites</Text>
        </View>
        
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Sign in to save your favorite pets
          </Text>
          <Button 
            title="Sign In" 
            onPress={() => router.push('/auth/login')}
            style={{ marginTop: 16 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.header}
      >
        <Text style={[styles.title, { color: colors.text }]}>Your Favorites</Text>
      </Animated.View>
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {favoritePets.length > 0 ? (
          <PetList pets={favoritePets} />
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              You haven't saved any pets yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textDim }]}>
              Find pets you love and tap the heart icon to save them here
            </Text>
            <Button 
              title="Discover Pets" 
              onPress={() => router.push('/(tabs)')}
              style={{ marginTop: 24 }}
            />
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
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});