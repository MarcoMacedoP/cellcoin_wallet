const API_URL = 'https://erc20.lomeli.xyz/agavecoin';

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
    console.log(data);
    return data?.status;
  } catch (error) {
      console.log({ error })
  }
}

function objectToUrlEncoded(json: object) {
  const urlencoded = new URLSearchParams();
  Object.keys(json).forEach(key => urlencoded.append(key, json[key]));
  //required param from the server.
  return urlencoded.toString();
}
