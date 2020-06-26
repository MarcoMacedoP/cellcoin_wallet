export const validations = {
  hasLowerCase: /(.*[a-z].*)/,
  hasUpperCase: /(.*[A-Z].*)/,
  hasNumber: /(.*[0-9].*)/,
  hasSpecialCharacter: /(.*[!#$%&@?¿¡_ -].*)/,
  eightToThirtyTwoCharacters: /^.{8,32}$/,
  walletSeed: /([a-zA-Z]*\s){11}[a-zA-Z]{2,}/,
};

//move to validations file
export function isAddress(address: string) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    return true;
  }
}
