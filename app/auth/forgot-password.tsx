import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { ChevronLeft, Mail } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/constants/firebase';

export default function ForgotPasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  const handleResetPassword = async () => {
    if (!email) {
      setToastMessage('Please enter your email address');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setToastMessage('Password reset email sent. Please check your inbox.');
      setToastType('success');
      setShowToast(true);
      
      // Wait 3 seconds then return to login
      setTimeout(() => {
        router.replace('/auth/login');
      }, 3000);
    } catch (error) {
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error instanceof FirebaseError) {
        switch(error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many requests. Please try again later.';
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
          <Animated.View 
            entering={FadeIn.duration(600)} 
            style={styles.content}
          >
            <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
            <Text style={[styles.subtitle, { color: colors.textDim }]}>
              Enter your email to receive a password reset link
            </Text>
            
            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Button
                title="Send Reset Link"
                onPress={handleResetPassword}
                isLoading={isLoading}
                style={{ marginTop: 24 }}
              />
            </View>
            
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.text }]}>
                Remember your password? 
              </Text>
              <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                <Text style={[styles.footerLink, { color: colors.primary }]}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    marginBottom: 48,
  },
  form: {
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  footerLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
}); 