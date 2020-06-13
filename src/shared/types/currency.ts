export type CurrencyType = {
  value: {
    /**The quantity of currency */
    original: string;
    /**The original currency value parsed in usd */
    usd: string
  };
  type: TokenType;
  name: string;
  image: string;
};
export type TokenType = 'ETH' | 'TOKEN';
