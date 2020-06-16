import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import {colors} from 'shared/styles';
type DeleteItemCardProps = {
  onDelete: () => void;
};

/**
 * Shows a component to remove an item in a swipe-list.
 */
export const DeleteItemCard: React.FC<DeleteItemCardProps> = ({onDelete}) => {
  return (
    <TouchableOpacity onPress={onDelete} style={styles.container}>
      <FIcon name="x-circle" size={25} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ef5350',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    marginTop: 10,
    height: 80,
    borderRadius: 5,
    marginBottom: 8,
  },
});
