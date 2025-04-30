import { create } from 'zustand';
import { router } from 'expo-router';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  Unsubscribe
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/constants/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'pet_owner' | 'adopter';
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'pet_owner' | 'adopter') => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<Unsubscribe>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  
  initialize: async () => {
    set({ isLoading: true });
    
    // Check for user in AsyncStorage first for faster app loading
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      set({ 
        user: JSON.parse(storedUser), 
        isAuthenticated: true,
        isLoading: false 
      });
    }
    
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await fetchUserData(firebaseUser);
          set({ 
            isAuthenticated: true, 
            user: userData,
            isLoading: false 
          });
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
          set({ isLoading: false });
        }
      } else {
        set({ 
          isAuthenticated: false, 
          user: null,
          isLoading: false 
        });
        await AsyncStorage.removeItem('user');
      }
    });
    
    // Return unsubscribe function
    return unsubscribe;
  },
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(userCredential.user);
      set({ 
        isAuthenticated: true, 
        user: userData,
        isLoading: false 
      });
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      router.replace('/(tabs)');
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  signup: async (name: string, email: string, password: string, role: 'pet_owner' | 'adopter') => {
    set({ isLoading: true });
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update profile with display name
      await updateProfile(firebaseUser, { displayName: name });
      
      // Store additional user data in Firestore
      const userData: UserData = {
        id: firebaseUser.uid,
        name,
        email,
        role
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      set({ 
        isAuthenticated: true, 
        user: userData,
        isLoading: false 
      });
      
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      router.replace('/(tabs)');
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await signOut(auth);
      set({ isAuthenticated: false, user: null });
      await AsyncStorage.removeItem('user');
      router.replace('/auth/login');
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }
}));

// Helper function to fetch user data from Firestore
async function fetchUserData(firebaseUser: FirebaseUser): Promise<UserData> {
  const userDocRef = doc(db, 'users', firebaseUser.uid);
  const userDoc = await getDoc(userDocRef);
  
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  } else {
    // Fallback to basic data if Firestore document doesn't exist
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      role: 'adopter' // Default role
    };
  }
}