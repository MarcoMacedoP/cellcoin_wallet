import React from 'react';
import {
  View,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Input as StyledInput,
  InputProps as StyledInputProps,
  Label,
} from 'shared/styled-components';
import {spacings, colors, globalStyles} from 'shared/styles';

type InputProps = TextInputProps &
  StyledInputProps & {
    label: string;
    children: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
  };

export const Input: React.FC<InputProps> = ({
  label,
  children,
  containerStyle,
  ...textInputProps
}) => {
  return (
    <View
      style={[
        globalStyles.inputContainer,
        styles.inputContainer,
        containerStyle,
      ]}>
      <Label style={styles.label} color="primary">
        {label}
      </Label>
      <View style={styles.inputWithIcon}>
        <StyledInput style={styles.input} {...textInputProps} />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    height: 30,
    flex: 1,
    color: colors.black,
  },
  label: {
    marginBottom: 4,
  },
});
