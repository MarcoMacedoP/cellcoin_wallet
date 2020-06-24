/** Just to be used as default value in functions*/
const invalidGasPriceValue = 9999;

/**
 * Converts a valid range to a gasPrice value
 * @param valueInRange a value beetween 0 and 100
 */
function rangeToGasPrice(valueInRange: number) {
  return (valueInRange / 10) * (10 ** 9); // prettier-ignore
}
const isValidValueToGasPriceRange = (value: number) =>
  value > 0 && value <= 100;

const throwInvalidValueToGasRange = (value: any) => {
  throw new Error(
    `Value ${value} in convertSlideValueToGasPrice is not a number or isn't in range of 0 - 100.`,
  );
};

/**
 * Converts a value in a determinated range to a valid gasPrice value.
 *
 * value - (a number beetween 0 and 100)
 */
// export function convertValueOfRangeToGasPrice(
//   value: number = invalidGasPriceValue,
// ) {
//   if (typeof value === 'number' && isValidValueToGasPriceRange(value)) {
//     return rangeToGasPrice(value);
//   } else {
//     const parsedValue = typeof value !== 'number' ? parseFloat(value) : value;
//     if (isNaN(parsedValue) || isValidValueToGasPriceRange(parsedValue)) {
//       throwInvalidValueToGasRange(value);
//     } else {
//       return rangeToGasPrice(parsedValue);
//     }
//   }
//}

type ConverToGasPriceParams = {
  gasPriceValue: number;
  gasLimit?: number;
};

// /**
//  * Converts  gasPrice to ETH
//  * @param gasPriceValue the value in a range of 0 - 100 to be evaluated
//  * @param gasLimit (optional) the gasLimit used, default to 21000
//  */
// export function convertGasPriceToETH({
//   gasLimit = 21000,
//   gasPriceValue = invalidGasPriceValue,
// }: ConverToGasPriceParams) {
//   const convert = () => gasLimit;
//   const operation = (gasPrice: number, parsedGasLimit: number = gasLimit) =>
//     parsedGasLimit * gasPrice;
//   const gasPrice = convertValueOfRangeToGasPrice(gasPriceValue);

//   if (typeof gasLimit === 'number') {
//     return operation(gasPrice);
//   } else {
//     const parsedGasLimit = parseFloat(gasLimit);
//     return operation(gasPrice, parsedGasLimit);
//   }
// }

//fee_eth = gasLimit * ((parseFloat(data['fastest']) / 10) * 10 ** 9);
export function convertValueToETH(value: number, gasLimit: number) {
  const fee_eth = gasLimit * ((value / 10) * 10 ** 9);
  return fee_eth;
}

/**
 * let gas = (parseFloat(data["fastest"]) / 10) * (10 ** 9);
 */
export function convertValueToGasPrice(value: any) {
  const gasPrice = (value / 10) * 10 ** 9;
  return gasPrice;
}

/**
 *  Displays a gas price friendly to a user
 * @param gasPriceValue
 */
export function displayGasPriceToUser(gasPriceValue: number) {
  const operation = (value: number) => value / 10;

  if (typeof gasPriceValue === 'number') {
    if (isValidValueToGasPriceRange(gasPriceValue)) {
      return operation(gasPriceValue);
    } else {
      throwInvalidValueToGasRange(gasPriceValue);
    }
  } else {
    const parsedValue = parseFloat(gasPriceValue);
    if (isNaN(parsedValue) || !isValidValueToGasPriceRange(parsedValue)) {
      throwInvalidValueToGasRange(gasPriceValue);
    } else {
      return operation(parsedValue);
    }
  }
}
