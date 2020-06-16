import React from 'react';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import {Text} from 'shared/styled-components';
import FIcon from 'react-native-vector-icons/Feather';
import {colors} from 'shared/styles';
import {showAddressPreview} from 'shared/libs/Address';

type ContactCardProps = {
  onPress: (address: string) => void;
  alias: string;
  address: string;
};

export const ContactCard: React.FC<ContactCardProps> = ({
  address,
  alias,
  onPress,
}) => {
  return (
    <TouchableHighlight
      onPress={() => onPress(address)}
      underlayColor={colors.lightGray}
      style={styles.container}>
      <>
        <FIcon name="user" size={25} color={colors.primary} />
        <View>
          <Text style={styles.alias} isBold>
            {alias}
          </Text>
          <Text>{showAddressPreview(address)}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    borderRadius: 5,
    height: 80,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  alias: {
    marginBottom: 4,
  },
});
