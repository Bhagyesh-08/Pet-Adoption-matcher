import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  View 
} from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  
  const getBackgroundColor = () => {
    if (disabled) return colors.textDim + '40';
    
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return colors.textDim + '40';
    
    switch (variant) {
      case 'outline':
        return colors.primary;
      default:
        return 'transparent';
    }
  };
  
  const getTextColor = () => {
    if (disabled) return colors.textDim;
    
    switch (variant) {
      case 'outline':
        return colors.primary;
      default:
        return 'white';
    }
  };
  
  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 20 };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        getPadding(),
        style
      ]}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? colors.primary : 'white'} 
          size="small" 
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
              },
              textStyle
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontFamily: 'Inter-Medium',
  },
});