/**
 * A user contact stored in device
 */
export interface Contact {
  alias: string;
  address: string;
}

/**
 *  The values of each wallet user has registered
 */
export interface WalletListItem {
  alias: string;
  address: string;
  index: number;
}
