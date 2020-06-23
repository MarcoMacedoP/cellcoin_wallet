import React, {useMemo} from 'react';
import {Text, SmallText} from 'shared/styled-components';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {colors, globalStyles} from 'shared/styles';
import Slider from '@react-native-community/slider';
import {ActivityIndicator} from 'react-native';
type GasFeeSelectorProps = {
  /** The style for the container*/
  style?: StyleProp<ViewStyle>;
  isEnabled?: boolean;
  gasLimit: number;
  gasLimitInEth: number;
  mininumValue: number;
  maximunValue: number;
  recomended: number;
  onChange: (value: number) => void;
  isLoading: boolean;
  error: null | string;
};

export const GasFeeSelector: React.FC<GasFeeSelectorProps> = ({
  children,
  style,
  isEnabled,
  gasLimit,
  gasLimitInEth,
  maximunValue,
  mininumValue,
  onChange,
  recomended,
  isLoading,
  error,
}) => {
  const containerStyles = useMemo(
    () => ({
      opacity: isEnabled ? 1 : 0.5,
    }),
    [isEnabled],
  );

  return (
    <View
      style={[
        globalStyles.inputContainer,
        styles.container,
        containerStyles,
        style,
      ]}>
      {isLoading ? (
        <>
          <Text color="primary">Loading...</Text>
          <ActivityIndicator color={colors.accent} />
        </>
      ) : (
        <>
          <Text color="primary">Miner fee</Text>
          <SmallText style={styles.conversionRate} color="blackLigth" isBold>
            {gasLimit} Gas Limit ={' '}
            {isNaN(gasLimitInEth) ? '0' : gasLimitInEth.toFixed(5)} ETH
          </SmallText>
          <Slider
            disabled={!isEnabled}
            minimumValue={mininumValue}
            maximumValue={maximunValue}
            value={gasLimit}
            thumbTintColor={colors.accent}
            maximumTrackTintColor={colors.blackLigth}
            minimumTrackTintColor={colors.primary}
            style={styles.slider}
            onSlidingComplete={onChange}
          />
          <View style={styles.intervals}>
            <SmallText color="blackLigth">Slow</SmallText>
            <SmallText color="blackLigth">Fast</SmallText>
          </View>
          <SmallText color="accent" style={styles.recomendation}>
            Recomended: {recomended}
          </SmallText>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    width: '100%',
  },
  conversionRate: {
    textTransform: 'uppercase',
    marginTop: 8,
  },
  slider: {
    marginTop: 16,
    width: '100%',
  },
  intervals: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  recomendation: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
});
