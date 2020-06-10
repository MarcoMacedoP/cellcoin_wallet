import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {spacings} from 'shared/styles';
import {Title, Label} from 'shared/styled-components';
import {StyleSheet, View, Image} from 'react-native';

type WalkthroughItemProps = {
  image: any;
  title: string;
  desc: string;
};

export const WalkthroughItem: React.FC<WalkthroughItemProps> = ({
  image,
  title,
  desc,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} resizeMode="contain" />
      </View>

      <View style={styles.textContainer}>
        <Title center>{title}</Title>
        <Label center style={styles.label}>
          {desc}
        </Label>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - spacings.left,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    marginBottom: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    width: '90%',
    alignItems: 'center',
  },
  label: {
    width: '80%',
    marginVertical: 16,
  },
});
