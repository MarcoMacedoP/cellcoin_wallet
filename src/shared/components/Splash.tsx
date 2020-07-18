import React from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import {FadeInView} from './FadeInView';

const background = require('assets/images/background_splash.png');

export const Splash = () => {
  return (
    <FadeInView duration={100} style={{width: '100%', flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      />
    </FadeInView>
  );
};
