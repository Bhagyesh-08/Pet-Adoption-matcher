import React, { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore } from '@/store/auth';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function RootLayout() {
  useFrameworkReady();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading);
  const initialize = useAuthStore(state => state.initialize);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was encountered)
      SplashScreen.hideAsync().catch(() => {
        /* reloading the app might trigger some race conditions, ignore them */
      });
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    // Initialize authentication state
    const unsubscribe = initialize();
    
    // Clean up subscription when component unmounts
    return () => {
      unsubscribe.then(unsub => unsub());
    };
  }, [initialize]);

  useEffect(() => {
    if (fontsLoaded && !isLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, fontsLoaded, isLoading]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Don't render anything while authentication is being initialized
  if (isLoading) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pet/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}