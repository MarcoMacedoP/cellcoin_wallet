import React from 'react';
import FIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';

type BackButtonProps = {
  tintColor: string;
};

export const BackButton: React.FC<BackButtonProps> = ({tintColor}) => {
  const navigation = useNavigation();
  console.log({navigation});
  function handleGoBack() {
    // const canGoBack = navigation.canGoBack();
    console.log('handleBakc');
    // if (canGoBack) {
    //   navigation.goBack();
    // }
  }
  return (
    <TouchableOpacity onPress={handleGoBack}>
      <FIcon
        name="arrow-left"
        size={24}
        color={tintColor}
        onPress={handleGoBack}
      />
    </TouchableOpacity>
  );
};
