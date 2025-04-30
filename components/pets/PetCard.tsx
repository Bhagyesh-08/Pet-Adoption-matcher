import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, MapPin } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { PetType } from '@/types';
import { useFavoritesStore } from '@/store/favorites';
import { useAuthStore } from '@/store/auth';
import Toast from '@/components/ui/Toast';

interface PetCardProps {
  pet: PetType;
}

export default function PetCard({ pet }: PetCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const user = useAuthStore(state => state.user);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const favorite = user ? isFavorite(user.id, pet.id) : false;
  
  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    
    router.push(`/pet/${pet.id}`);
  };
  
  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    
    if (!user) {
      setToastMessage('Please log in to save favorites');
      setShowToast(true);
      return;
    }
    
    if (favorite) {
      removeFavorite(user.id, pet.id);
      setToastMessage('Removed from favorites');
    } else {
      addFavorite(user.id, pet);
      setToastMessage('Added to favorites');
    }
    setShowToast(true);
  };
  
  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[
          styles.container, 
          { 
            backgroundColor: colors.card,
            borderColor: colors.border,
          }
        ]}
        onPress={handlePress}
        android_ripple={Platform.OS === 'android' ? { color: 'rgba(0,0,0,0.1)' } : undefined}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.imageUrl }} style={styles.image} />
          <Pressable 
            style={[
              styles.favoriteButton,
              { backgroundColor: 'rgba(0,0,0,0.3)' }
            ]} 
            onPress={toggleFavorite}
          >
            <Heart 
              size={20} 
              color="white"
              fill={favorite ? "white" : "transparent"}
            />
          </Pressable>
        </View>
        
        <View style={styles.content}>
          <View style={styles.nameContainer}>
            <Text style={[styles.name, { color: colors.text }]}>
              {pet.name}
            </Text>
            <View style={[
              styles.ageTag, 
              { backgroundColor: colors.primary + '15' }
            ]}>
              <Text style={[styles.ageText, { color: colors.primary }]}>
                {pet.age}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.breed, { color: colors.textDim }]}>
            {pet.breed}
          </Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.textDim} />
            <Text style={[styles.location, { color: colors.textDim }]}>
              {pet.location}
            </Text>
          </View>
        </View>
      </Pressable>
      
      {showToast && (
        <Toast
          message={toastMessage}
          type={favorite ? 'error' : 'success'}
          onHide={() => setShowToast(false)}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  imageContainer: {
    height: 150,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  ageTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  ageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  breed: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
});