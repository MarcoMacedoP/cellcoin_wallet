import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GasSelectorBase} from './GasSelectorBase';
type GasLimitSelectorProps = {
  value: number;
};

export const GasLimitSelector: React.FC<GasLimitSelectorProps> = ({value}) => {
  return (
    <GasSelectorBase
      isEnabled={true}
      maximunValue={value * 2}
      mininumValue={value / 2}
      onChange={console.log}
      selectorValue={value}
      subtitle={`${value} Gas limit `}
      title="Gas Limit"
      isLoading={false}
    />
  );
};
