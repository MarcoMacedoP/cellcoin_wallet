import React, {useState} from 'react';
import {Animated, View, ScrollView} from 'react-native';

interface FadeInViewProps {
  style?: any;
  delay?: number;
  duration?: number;
}

export const FadeInView: React.FC<FadeInViewProps> = props => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 2,
      delay: props.delay || 0,
      duration: props.duration || 1000,
    }).start();
  }, []);
  const animatedStyles = {
    opacity: fadeAnim,
  };

  return (
    <Animated.View // Special animatable View
      style={[animatedStyles, props.style]}>
      {props.children}
    </Animated.View>
  );
};
