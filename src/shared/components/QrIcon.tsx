import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

type QrIconProps = {
  style?: any;
  onPress: any;
  tintColor: string;
};

export const QrIcon: React.FC<QrIconProps> = ({onPress, style, tintColor}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name="qrcode" size={24} color={tintColor} />
    </TouchableOpacity>
  );
};
