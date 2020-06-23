import React, {useMemo} from 'react';
import {Text, SmallText} from 'shared/styled-components';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {colors, globalStyles} from 'shared/styles';
import Slider from '@react-native-community/slider';
import {useGasLimit, UseGasLimitParams} from 'shared/libs/Wallet';

type GasFeeSelectorProps = UseGasLimitParams & {
  /** The style for the container*/
  style?: StyleProp<ViewStyle>;
};

export const GasFeeSelector: React.FC<GasFeeSelectorProps> = ({
  children,
  style,
  ...gasLimitParams
}) => {
  const {gasLimit, isEnabled, intervals, setGasLimit, prices} = useGasLimit(
    gasLimitParams,
  );

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
      <Text color="primary">Miner fee</Text>
      <SmallText style={styles.conversionRate} color="blackLigth" isBold>
        {gasLimit} Gas Limit = {prices.gasLimitInEth.toFixed(6)} ETH
      </SmallText>
      <Slider
        step={5000}
        disabled={!isEnabled}
        minimumValue={intervals.min}
        maximumValue={intervals.max}
        value={gasLimit}
        thumbTintColor={colors.accent}
        maximumTrackTintColor={colors.blackLigth}
        minimumTrackTintColor={colors.primary}
        style={styles.slider}
        onValueChange={setGasLimit}
      />
      <View style={styles.intervals}>
        <SmallText color="blackLigth">Slow</SmallText>
        <SmallText color="blackLigth">Fast</SmallText>
      </View>
      {intervals.recomended && (
        <SmallText color="accent" style={styles.recomendation}>
          Recomended: {intervals.recomended} WEI
        </SmallText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
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
