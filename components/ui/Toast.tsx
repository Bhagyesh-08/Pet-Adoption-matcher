import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onHide?: () => void;
}

export default function Toast({ 
  message, 
  type = 'success', 
  duration = 3000,
  onHide 
}: ToastProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const opacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration - 600),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, []);

  const backgroundColor = type === 'success' ? colors.success : colors.error;

  return (
    <Animated.View 
      style={[
        styles.container,
        { opacity, backgroundColor }
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});