//src/components/common/Button.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? '#1E88E5' : 'white'} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#1E88E5',
  },
  secondaryButton: {
    backgroundColor: '#E0E0E0',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1E88E5',
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryText: {
    color: '#424242',
    fontWeight: '600',
  },
  outlineText: {
    color: '#1E88E5',
    fontWeight: '600',
  },
  dangerText: {
    color: 'white',
    fontWeight: '600',
  },
});