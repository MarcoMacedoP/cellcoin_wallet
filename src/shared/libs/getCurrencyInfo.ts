import {TokenType} from 'shared/types';

export function getCurrencyInfo(currency: TokenType) {
  const logo =
    currency === 'TOKEN'
      ? require('assets/icons/token_icon.png')
      : require('assets/icons/ethereum_icon.png');
  const tokenName = currency === 'TOKEN' ? 'XOY' : currency;
  return {logo, tokenName};
}
