import React from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {colors} from 'shared/styles';
import {StyleSheet, View} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import {Text} from 'shared/styled-components';

type AddressItemProps = {
  onPress: (address: string) => void;
  alias: string;
  address: string;
};

/**
 * Shows a item of an address
 *
 */
export const AddressItem: React.FC<AddressItemProps> = ({
  onPress,
  address,
  alias,
}) => {
  return (
    <TouchableHighlight
      onPress={() => onPress(address)}
      underlayColor={colors.lightGray}
      style={styles.touchable}>
      <>
        <View style={styles.iconContainer}>
          <FIcon name="user" size={25} color={colors.accent} />
        </View>
        <View style={styles.labelContainer}>
          <Text>{alias}</Text>
          <Text style={{color: colors.gray, fontSize: 10}}>{address}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    height: 60,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
