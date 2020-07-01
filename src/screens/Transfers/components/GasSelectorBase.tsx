import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {globalStyles, colors} from 'shared/styles';
import {Text, SmallText} from 'shared/styled-components';
import Slider from '@react-native-community/slider';

type GasSelectorBaseProps = {
  mininumValue: number;
  maximunValue: number;
  selectorValue: number;
  onChange: (value: number) => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  title: string;
  isEnabled: boolean;
  subtitle: string;
  conversionLabel?: string;
};

export const GasSelectorBase: React.FC<GasSelectorBaseProps> = props => {
  return (
    <View style={[globalStyles.inputContainer, styles.container, props.style]}>
      {props.isLoading ? (
        <>
          <Text color="primary">Loading...</Text>
          <ActivityIndicator color={colors.accent} />
        </>
      ) : (
        <>
          <Text color="primary">{props.title}</Text>
          <SmallText style={styles.subtitle} color="blackLigth" isBold>
            {props.subtitle}
          </SmallText>
          <Slider
            disabled={!props.isEnabled}
            minimumValue={props.mininumValue}
            maximumValue={props.maximunValue}
            value={props.selectorValue}
            thumbTintColor={colors.accent}
            maximumTrackTintColor={colors.blackLigth}
            minimumTrackTintColor={colors.primary}
            style={styles.slider}
            onSlidingComplete={props.onChange}
          />
          <View style={styles.intervals}>
            <SmallText color="blackLigth">Slow</SmallText>
            <SmallText color="blackLigth">Fast</SmallText>
          </View>
          {props.conversionLabel && (
            <SmallText color="accent" style={styles.conversionLabel}>
              {props.conversionLabel}
            </SmallText>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    width: '100%',
    marginVertical: 8,
  },
  subtitle: {
    textTransform: 'uppercase',
    marginTop: 8,
  },
  slider: {
    marginTop: 12,
    width: '100%',
  },
  intervals: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  conversionLabel: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
});
