import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Platform, 
  Alert,
  ScrollView,
  TextInput
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Camera, MapPin, Upload as UploadCloud } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import RadioButton from '@/components/ui/RadioButton';
import { PetType } from '@/types';

interface PetFormProps {
  onSubmit: (pet: PetType) => void;
  isLoading: boolean;
}

export default function PetForm({ onSubmit, isLoading }: PetFormProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [description, setDescription] = useState('');
  const [vaccination, setVaccination] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState('');

  const handleTakePhoto = async () => {
    if (Platform.OS === 'web') {
      // Web doesn't support camera directly, use picker instead
      handleUploadPhoto();
      return;
    }
    
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access camera was denied');
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access media library was denied');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleGetLocation = () => {
    // In a real app, this would use the device's location services
    setLocation('San Francisco, CA');
  };
  
  const calculateAgeGroup = (ageValue: string): string => {
    // First check if age contains descriptive terms
    const lowercaseAge = ageValue.toLowerCase();
    if (lowercaseAge.includes('puppy') || lowercaseAge.includes('kitten') || 
        lowercaseAge.includes('baby') || lowercaseAge.includes('infant')) {
      return 'Puppy';
    }
    
    // Try to parse as a number
    const numericAge = parseFloat(ageValue);
    
    // Check if it's a valid number
    if (isNaN(numericAge)) {
      return 'Adult'; // Default if we can't determine
    }
    
    // Categorize based on numeric age
    if (numericAge < 1) {
      return 'Puppy';
    } else if (numericAge < 3) {
      return 'Young';
    } else if (numericAge < 8) {
      return 'Adult';
    } else {
      return 'Senior';
    }
  };
  
  const handleSubmit = () => {
    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push('Pet Name');
    if (!breed) missingFields.push('Breed');
    if (!age) missingFields.push('Age');
    if (!description) missingFields.push('Description');
    if (!location) missingFields.push('Location');
    
    if (missingFields.length > 0) {
      Alert.alert(
        'Missing information', 
        `Please fill in the following required fields: ${missingFields.join(', ')}`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    if (!image) {
      Alert.alert('Missing photo', 'Please add a photo of your pet');
      return;
    }
    
    // Calculate age group based on age input
    const ageGroup = calculateAgeGroup(age);
    
    // Use entered color or default to "Mixed" if not provided
    const petColor = color.trim() || 'Mixed';
    
    // Create pet object
    const pet: PetType = {
      id: Date.now().toString(),
      name,
      species,
      breed,
      age,
      ageGroup,
      gender,
      description,
      healthInfo: vaccination ? [vaccination, 'Microchipped', 'Neutered/Spayed'] : ['Microchipped', 'Neutered/Spayed'],
      location,
      postedTime: 'Just now',
      imageUrl: image,
      color: petColor,
      isFavorite: false
    };
    
    onSubmit(pet);
    
    // Reset form
    setName('');
    setSpecies('Dog');
    setBreed('');
    setAge('');
    setGender('Male');
    setDescription('');
    setVaccination('');
    setLocation('');
    setColor('');
    setImage(null);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.photoSection}>
        {image ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={[styles.changePhotoButton, { backgroundColor: colors.primary }]} 
              onPress={handleUploadPhoto}
            >
              <Camera size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.photoUpload, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleTakePhoto}>
              <Camera size={24} color={colors.primary} />
              <Text style={[styles.uploadText, { color: colors.text }]}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
              <UploadCloud size={24} color={colors.primary} />
              <Text style={[styles.uploadText, { color: colors.text }]}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.form}>
        <Input
          label="Pet Name"
          placeholder="Enter pet name"
          value={name}
          onChangeText={setName}
        />
        
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={[styles.label, { color: colors.text }]}>Species</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.speciesContainer}
              contentContainerStyle={styles.speciesContentContainer}
            >
              <RadioButton
                label="Dog"
                value="Dog"
                selected={species === 'Dog'}
                onSelect={() => setSpecies('Dog')}
              />
              <RadioButton
                label="Cat"
                value="Cat"
                selected={species === 'Cat'}
                onSelect={() => setSpecies('Cat')}
                style={{ marginLeft: 16 }}
              />
              <RadioButton
                label="Bird"
                value="Bird"
                selected={species === 'Bird'}
                onSelect={() => setSpecies('Bird')}
                style={{ marginLeft: 16 }}
              />
              <RadioButton
                label="Rabbit"
                value="Rabbit"
                selected={species === 'Rabbit'}
                onSelect={() => setSpecies('Rabbit')}
                style={{ marginLeft: 16 }}
              />
              <RadioButton
                label="Other"
                value="Other"
                selected={species === "Other"}
                onSelect={() => setSpecies("Other")}
                style={{ marginLeft: 16 }}
              />
            </ScrollView>
          </View>
          
          <View style={styles.halfWidth}>
            <Text style={[styles.label, { color: colors.text }]}>Gender</Text>
            <View style={styles.radioContainer}>
              <RadioButton
                label="Male"
                value="Male"
                selected={gender === 'Male'}
                onSelect={() => setGender('Male')}
              />
              
              <RadioButton
                label="Female"
                value="Female"
                selected={gender === 'Female'}
                onSelect={() => setGender('Female')}
                style={{ marginLeft: 24 }}
              />
            </View>
          </View>
        </View>
        
        <Input
          label="Breed"
          placeholder="Enter breed"
          value={breed}
          onChangeText={setBreed}
          style={{ marginTop: 16 }}
        />
        
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="Age"
              placeholder="Enter age in years"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={{ marginTop: 16 }}
            />
          </View>
          
          <View style={styles.halfWidth}>
            <Input
              label="Color"
              placeholder="Enter pet color"
              value={color}
              onChangeText={setColor}
              style={{ marginTop: 16, marginLeft: 8 }}
            />
          </View>
        </View>
        
        <View style={{ marginTop: 16 }}>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[
              styles.descriptionInput,
              { color: colors.text, backgroundColor: colorScheme === 'dark' ? colors.card : 'white', borderColor: colors.border }
            ]}
            placeholder="Describe the pet's personality, habits, etc."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={colors.textDim}
          />
        </View>
        
        <Input
          label="Vaccination/Health Info"
          placeholder="e.g., 'Fully vaccinated', 'Regular checkups'"
          value={vaccination}
          onChangeText={setVaccination}
          style={{ marginTop: 16 }}
        />
        
        <View style={[styles.locationContainer, { marginTop: 16 }]}>
          <Input
            label="Location"
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
            style={{ flex: 1 }}
          />
          
          <TouchableOpacity 
            style={[styles.locationButton, { backgroundColor: colors.secondary }]}
            onPress={handleGetLocation}
          >
            <MapPin size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <Button
          title="Submit Pet for Adoption"
          onPress={handleSubmit}
          isLoading={isLoading}
          style={{ marginTop: 32 }}
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  photoSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  photoUpload: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginTop: 8,
  },
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  speciesContainer: {
    flexDirection: 'row',
    marginTop: 8,
    maxHeight: 45,
  },
  speciesContentContainer: {
    paddingRight: 24,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  locationButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 1,
  },
  descriptionInput: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginTop: 8,
  },
});