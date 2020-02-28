export const validations = {
  hasLowerCase: /(.*[a-z].*)/,
  hasUpperCase: /(.*[A-Z].*)/,
  hasNumber: /(.*[0-9].*)/,
  hasSpecialCharacter: /(.*[!#$%&@?¿¡_ -].*)/,
  eightToThirtyTwoCharacters: /^.{8,32}$/,
  walletSeed: /([a-zA-Z]*\s){11}[a-zA-Z]{2,}/,
};
