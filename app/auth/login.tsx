import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import { useAuthStore } from '@/store/auth';
import { FirebaseError } from 'firebase/app';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      setToastMessage('Please fill in all fields');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      // No need to set toast message here as we'll be redirected
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error instanceof FirebaseError) {
        switch(error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Invalid email or password.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Please try again later.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled.';
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

  const handleForgotPassword = () => {
    router.replace('/auth/login/forgot-password' as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
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
            <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: colors.textDim }]}>
              Sign in to continue to PetMatch
            </Text>
            
            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<Mail size={20} color={colors.textDim} />}
              />
              
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginTop: 16 }}
                icon={<Lock size={20} color={colors.textDim} />}
              />
              
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              
              <Button
                title="Sign In"
                onPress={handleLogin}
                isLoading={isLoading}
                style={{ marginTop: 24 }}
              />
            </View>
            
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.text }]}>
                Don't have an account? 
              </Text>
              <Link href="/auth/signup" asChild>
                <TouchableOpacity>
                  <Text style={[styles.footerLink, { color: colors.primary }]}> Sign Up</Text>
                </TouchableOpacity>
              </Link>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
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