export type CurrencyType = {
  value: {original: string; usd: string};
  type: TokenType;
  name: string;
  image: string;
};
export type TokenType = 'ETH' | 'TOKEN';
