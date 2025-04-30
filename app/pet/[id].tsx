import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Platform } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { ChevronLeft, Heart, MessageCircle, MapPin, Clock, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import { mockPets } from '@/data/mockData';
import { PetType } from '@/types';

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [pet, setPet] = useState<PetType | undefined>(
    mockPets.find((p) => p.id === id)
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(pet?.isFavorite || false);

  if (!pet) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen 
          options={{
            headerShown: true,
            headerTitle: '',
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <ChevronLeft size={24} color={colors.text} />
              </Pressable>
            ),
          }} 
        />
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: colors.text }]}>Pet not found</Text>
          <Button title="Go Back" onPress={() => router.back()} style={{ marginTop: 16 }} />
        </View>
      </SafeAreaView>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would update the backend
  };

  const contactOwner = () => {
    // In a real app, this would create a chat or redirect to an existing one
    router.push('/chat/new');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()} 
              style={[styles.headerButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
            >
              <ChevronLeft size={24} color="white" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable 
              onPress={toggleFavorite} 
              style={[styles.headerButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
            >
              <Heart 
                size={24} 
                color="white" 
                fill={isFavorite ? "white" : "transparent"} 
              />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.imageUrl }} style={styles.image} />
        </View>
        
        <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.petName, { color: colors.text }]}>{pet.name}</Text>
              <Text style={[styles.petBreed, { color: colors.textDim }]}>{pet.breed}</Text>
            </View>
            
            <View style={[styles.ageGenderContainer, { backgroundColor: colors.primary + '15' }]}>
              <Text style={[styles.ageGender, { color: colors.primary }]}>
                {pet.age} • {pet.gender}
              </Text>
            </View>
          </View>
          
          <View style={styles.locationTimeContainer}>
            <View style={styles.infoRow}>
              <MapPin size={16} color={colors.textDim} />
              <Text style={[styles.infoText, { color: colors.textDim }]}>{pet.location}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Clock size={16} color={colors.textDim} />
              <Text style={[styles.infoText, { color: colors.textDim }]}>Posted {pet.postedTime}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
            <Text style={[styles.descriptionText, { color: colors.text }]}>{pet.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Details</Text>
            <View style={styles.detailsGrid}>
              <View style={[styles.detailItem, { borderColor: colors.border }]}>
                <Text style={[styles.detailLabel, { color: colors.textDim }]}>Species</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{pet.species}</Text>
              </View>
              
              <View style={[styles.detailItem, { borderColor: colors.border }]}>
                <Text style={[styles.detailLabel, { color: colors.textDim }]}>Age</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{pet.age}</Text>
              </View>
              
              <View style={[styles.detailItem, { borderColor: colors.border }]}>
                <Text style={[styles.detailLabel, { color: colors.textDim }]}>Gender</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{pet.gender}</Text>
              </View>
              
              <View style={[styles.detailItem, { borderColor: colors.border }]}>
                <Text style={[styles.detailLabel, { color: colors.textDim }]}>Color</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{pet.color}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Health</Text>
            <View style={styles.healthContainer}>
              {pet.healthInfo.map((info, index) => (
                <View key={index} style={[styles.healthItem, { backgroundColor: colors.success + '15' }]}>
                  <Text style={[styles.healthText, { color: colors.success }]}>{info}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Owner</Text>
            <View style={[styles.ownerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200' }} 
                style={styles.ownerAvatar} 
              />
              <View style={styles.ownerInfo}>
                <Text style={[styles.ownerName, { color: colors.text }]}>Sarah Johnson</Text>
                <Text style={[styles.ownerSubtitle, { color: colors.textDim }]}>Animal Shelter</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.footer}>
            <Button 
              title="Contact Owner" 
              icon={<MessageCircle size={20} color="white" />}
              onPress={contactOwner}
              style={{ flex: 1 }} 
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  imageContainer: {
    height: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'web' ? 80 : 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  petName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
  },
  petBreed: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginTop: 4,
  },
  ageGenderContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  ageGender: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  locationTimeContainer: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  healthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  healthItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  healthText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  ownerInfo: {
    marginLeft: 16,
  },
  ownerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  ownerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  footer: {
    marginTop: 8,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});