const API_URL = 'https://erc20.lomeli.xyz/xoycoin/';

const baseHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

export async function getInitialization() {
  try {
    const response = await fetch(`${API_URL}/data-general`, {
      method: 'POST',
      headers: baseHeaders,
    });
    const {data} = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
/**
 * Call's API and register the user address.
 * @param address the seleted address
 * @param uuid the current user uuid
 */
export async function saveAddress(address: string, uuid: string):Promise<boolean> {

  try {
    const response = await fetch(`${API_URL}/save-address`, {
      method: 'POST',
      headers: baseHeaders,
      body: objectToUrlEncoded({
        address,
        uuid,
        type: 'phone',
      }),
    });
    const data = response.ok ? await response.json() : {};
    return data?.status;
  } catch (error) {
      console.log({ error })
  }
}

/**
 * Returns the prices of the currencys
 * @param eth 
 * @param token 
 */
export async function getPrices(eth:number | string, token:number | string): Promise<{ eth:any; token:any }> {
  const requestOptions = {
    method: 'post',
    body: `eth=${eth}&token=${token}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  const response = await fetch(
    'https://erc20.lomeli.xyz/agavecoin/prices',
    requestOptions,
  );
  const { data } = await response.json();
  return data;
}
/**
 * Fetch the gas price
 * @return {Number} the fast gas price 
 */
export const fetchGasPrice = async (): Promise<number> => {
      const response = await fetch(
        'https://ethgasstation.info/api/ethgasAPI.json',
      );
      const data = await response.json();
      return Number(data.fast);
};

export async function getNotifications() {
    const response = await fetch(`${API_URL}/get-news`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    const {data} = await response.json();
    return data;
  }

  function objectToUrlEncoded(json: object) {
  const urlencoded = new URLSearchParams();
  Object.keys(json).forEach(key => urlencoded.append(key, json[key]));
  //required param from the server.
  return urlencoded.toString();
}
