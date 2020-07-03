import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  MINIMUM_GAS_VALUE_SLIDER,
  MAXIMUN_GAS_VALUE_SLIDER,
} from 'shared/libs/Wallet/constants';
import {GasSelectorBase} from './GasSelectorBase';

type GasPriceSelectorProps = {
  /** The style for the container*/
  style?: StyleProp<ViewStyle>;
  isEnabled?: boolean;
  gasLimit: number;
  gasPrice: number;
  onChange: (value: number) => void;
  fee: string;
};

export const GasPriceSelector: React.FC<GasPriceSelectorProps> = ({
  fee,
  style,
  isEnabled,
  gasLimit,
  gasPrice,
  onChange,
}) => {
  return (
    <GasSelectorBase
      style={style}
      isEnabled={isEnabled}
      mininumValue={MINIMUM_GAS_VALUE_SLIDER}
      maximunValue={MAXIMUN_GAS_VALUE_SLIDER}
      onChange={onChange}
      selectorValue={gasPrice}
      title="Gas price"
      subtitle={`${gasLimit} gas limit \n${gasPrice} gas price`}
      conversionLabel={`Fee ${fee}`}
    />
  );
};
