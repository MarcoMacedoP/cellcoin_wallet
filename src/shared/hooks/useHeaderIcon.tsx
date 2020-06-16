import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import FIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {headerContainerStyles} from 'Router/options';
type UseHeaderIconParams = {
  onPress: () => void;
  icon?: 'plus';
};

/**
 * Adds an icon to in the rigth side of header
 */
export function useHeaderIcon({onPress, icon = 'plus'}: UseHeaderIconParams) {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      ...headerContainerStyles,
      headerRight: ({tintColor}) => (
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
          <FIcon name={icon} size={20} color={tintColor} />
        </TouchableOpacity>
      ),
    });
  }, []);
}

const styles = StyleSheet.create({
  touchable: {
    padding: 4,
  },
});
