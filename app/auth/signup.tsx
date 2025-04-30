import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Stack, Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { ChevronLeft, User, Mail, Lock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import RadioButton from '@/components/ui/RadioButton';
import Toast from '@/components/ui/Toast';
import { useAuthStore } from '@/store/auth';
import { FirebaseError } from 'firebase/app';

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'pet_owner' | 'adopter'>('adopter');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const signup = useAuthStore(state => state.signup);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setToastMessage('Please fill in all fields');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    if (password.length < 6) {
      setToastMessage('Password must be at least 6 characters long');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(name, email, password, role);
      // No need to set toast message here as we'll be redirected
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error instanceof FirebaseError) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your connection.';
            break;
        }
      }
      
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: colors.textDim }]}>
              Sign up to find your perfect pet companion
            </Text>
            
            <View style={styles.form}>
              <Input
                label="Name"
                placeholder="Your full name"
                value={name}
                onChangeText={setName}
                icon={<User size={20} color={colors.textDim} />}
              />
              
              <Input
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginTop: 16 }}
                icon={<Mail size={20} color={colors.textDim} />}
              />
              
              <Input
                label="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginTop: 16 }}
                icon={<Lock size={20} color={colors.textDim} />}
              />
              
              <Text style={[styles.roleLabel, { color: colors.text, marginTop: 24 }]}>
                I am a:
              </Text>
              
              <View style={styles.radioGroup}>
                <RadioButton
                  label="Pet Adopter"
                  value="adopter"
                  selected={role === 'adopter'}
                  onSelect={() => setRole('adopter')}
                />
                
                <RadioButton
                  label="Pet Owner / Shelter"
                  value="owner"
                  selected={role === 'pet_owner'}
                  onSelect={() => setRole('pet_owner')}
                  style={{ marginLeft: 24 }}
                />
              </View>
              
              <Button
                title="Create Account"
                onPress={handleSignup}
                isLoading={isLoading}
                style={{ marginTop: 32 }}
              />
            </View>
            
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textDim }]}>
                Already have an account? 
              </Text>
              <Link href="/auth/login" asChild>
                <TouchableOpacity>
                  <Text style={[styles.footerLink, { color: colors.primary }]}> Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
            
            <Text style={[styles.termsText, { color: colors.textDim }]}>
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onHide={() => setShowToast(false)}
        />
      )}
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  roleLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  footerLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
});