import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { LogOut, Settings, Heart, Shield, HelpCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth';

// Default avatar for users without profile images
const DEFAULT_AVATAR = 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // No need to navigate here as the logout function in auth store handles it
            } catch (error) {
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          }
        }
      ]
    );
  };

  const navigateToLogin = () => {
    router.replace('/auth/login');
  };

  // Check if user is logged in
  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        </View>
        
        <View style={styles.notLoggedInContainer}>
          <Text style={[styles.notLoggedInText, { color: colors.text }]}>
            Sign in to view your profile
          </Text>
          <Button 
            title="Sign In" 
            onPress={navigateToLogin} 
            style={{ marginTop: 16 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        </View>
        
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Image 
            source={{ uri: DEFAULT_AVATAR }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.profileEmail, { color: colors.textDim }]}>{user.email}</Text>
            <View style={[styles.roleTag, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.roleText, { color: colors.primary }]}>
                {user.role === 'pet_owner' ? 'Pet Owner' : 'Adopter'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Pressable 
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => Alert.alert('Settings', 'This would open account settings')}
            >
              <Settings size={22} color={colors.textDim} />
              <Text style={[styles.menuText, { color: colors.text }]}>Account Settings</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => router.push('/(tabs)/favorites')}
            >
              <Heart size={22} color={colors.textDim} />
              <Text style={[styles.menuText, { color: colors.text }]}>Saved Pets</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => Alert.alert('Privacy', 'This would open privacy settings')}
            >
              <Shield size={22} color={colors.textDim} />
              <Text style={[styles.menuText, { color: colors.text }]}>Privacy & Security</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuItem}
              onPress={() => Alert.alert('Help', 'This would open help center')}
            >
              <HelpCircle size={22} color={colors.textDim} />
              <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
            </Pressable>
          </View>
        </View>
        
        <Pressable 
          style={[styles.logoutButton, { borderColor: colors.error }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
        </Pressable>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textDim }]}>
            PetMatch v1.0.0
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: 16,
  },
  profileCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  roleTag: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  roleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  menuCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 24,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notLoggedInText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});