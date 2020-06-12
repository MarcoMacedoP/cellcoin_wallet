import {TokenType} from 'shared/types';

export function getCurrencyInfo(currency: TokenType) {
  const logo =
    currency === 'TOKEN'
      ? require('assets/icons/agave_coin_icon.png')
      : require('assets/icons/ethereum_icon.png');
  const tokenName = currency === 'TOKEN' ? 'AGVC' : currency;
  return {logo, tokenName};
}
