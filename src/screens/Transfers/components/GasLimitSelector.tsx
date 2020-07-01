import React, {useEffect, useRef} from 'react';
import {GasSelectorBase} from './GasSelectorBase';
type GasLimitSelectorProps = {
  value: number;
  onChange: (value: number) => void;
  /** value used to calculate the maximun and minimun quantity of the selector*/
  initialValue: number;
};

export const GasLimitSelector: React.FC<GasLimitSelectorProps> = ({
  value,
  onChange,
  initialValue,
}) => {
  return (
    <GasSelectorBase
      isEnabled={true}
      maximunValue={initialValue * 2}
      mininumValue={initialValue / 4}
      onChange={onChange}
      selectorValue={value}
      subtitle={`${value} Gas limit `}
      title="Gas Limit"
      isLoading={false}
    />
  );
};
