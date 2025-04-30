import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ViewStyle, 
  TextInputProps,
  TextStyle,
  StyleProp
} from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

interface InputProps {
  label?: string;
  error?: string;
  style?: ViewStyle;
  icon?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function Input({
  label,
  error,
  style,
  icon,
  ...props
}: InputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        {
          borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
          backgroundColor: colorScheme === 'dark' ? colors.card : 'white',
        }
      ]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            icon ? styles.inputWithIcon : null
          ]}
          placeholderTextColor={colors.textDim}
          onFocus={() => {
            setIsFocused(true);
            props.onFocus && props.onFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
            props.onBlur && props.onBlur();
          }}
          {...props}
        />
      </View>
      
      {error && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  error: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
  },
});