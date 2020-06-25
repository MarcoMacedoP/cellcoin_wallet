import React, {useMemo, useState, useEffect} from 'react';
import {colors, globalStyles} from '../styles';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FadeInView} from './FadeInView';
import {Text} from 'shared/styled-components';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ButtonProps = {
  outline?: boolean;
  secondary?: boolean;
  accent?: boolean;
  isActivated?: boolean;
  onClick: any;
  width?: string;
  margin?: string;
  isLoading?: boolean;
  style?: any;
  labelStyle?: any;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  outline,
  onClick,
  secondary,
  accent,
  width = '100%',
  isActivated = true,
  margin,
  style,
  labelStyle,
}) => {
  const [shouldRenderIndicator, setShouldRenderIndicator] = useState(false);

  const [widthAnimation] = useState(new Animated.Value(0));

  const interpolatedWidth = widthAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: [width, '20%'],
  });

  const renderStyles = useMemo(
    () => ({
      container: {
        width: interpolatedWidth,
        backgroundColor: isActivated
          ? accent
            ? colors.accent
            : outline
            ? colors.lightGray
            : secondary
            ? colors.primaryLigth
            : colors.primary
          : colors.blackLigth,
      },
    }),
    [width, isActivated, accent, outline, secondary],
  );
  const handlePress = () => isActivated && !shouldRenderIndicator && onClick();

  useEffect(() => {
    if (isLoading) {
      makeButtonSmall();
    } else {
      makeButtonNormal();
    }
  }, [isLoading]);

  const makeButtonSmall = () => {
    Animated.timing(widthAnimation, {
      toValue: 100,
      easing: Easing.sin,
      duration: 300,
    }).start();
    setShouldRenderIndicator(true);
  };

  const makeButtonNormal = () => {
    Animated.timing(widthAnimation, {
      toValue: 0,
      easing: Easing.sin,
      duration: 300,
    }).start(() => setShouldRenderIndicator(false));
  };

  return (
    <AnimatedTouchable
      style={[styles.touchableContainer, renderStyles.container, style]}
      activeOpacity={shouldRenderIndicator || !isActivated ? 1 : 0.7}
      onPress={handlePress}>
      {shouldRenderIndicator ? (
        <FadeInView>
          <ActivityIndicator color={colors.white} />
        </FadeInView>
      ) : (
        <FadeInView duration={300}>
          <Text
            upperCase
            isBold
            color={outline ? 'primary' : 'white'}
            style={[styles.label, labelStyle]}>
            {children}
          </Text>
        </FadeInView>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    ...globalStyles.cardShadow,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    maxHeight: 50,
    marginTop: 5,
    marginVertical: 0,
    paddingHorizontal: 2,
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
  },
});
