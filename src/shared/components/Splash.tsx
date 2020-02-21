import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Easing } from 'react-native';
import styled from 'styled-components/native';

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 2,
        duration: 1000,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,
        transform: [{
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0]  // 0 : 150, 0.5 : 75, 1 : 0
          }),
        }],         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export const Splash = () => {
  const logo = require('assets/images/logo_splash.png');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView style={{width: 150, height: 250,}}>
        <Image source={logo} />
      </FadeInView>
    </View>
  )
}
const Image = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;
const ImageBox = styled(FadeInView)`
  width: 100%;
  height: 100%;
`;