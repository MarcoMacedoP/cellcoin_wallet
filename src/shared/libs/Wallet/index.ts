import Wallet from 'erc20-wallet';
import AsyncStorage from '@react-native-community/async-storage';
import lightwallet from 'eth-lightwallet';
import api from 'etherscan-api';
import HookedWeb3Provider from 'hooked-web3-provider';
import Web3 from 'web3';

const txutils = lightwallet.txutils;
const signing = lightwallet.signing;

function createdStored() {
  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault(
      {
        password: Wallet.password,
        seedPhrase: Wallet.seed,
        hdPathString: Wallet.hdPathString,
      },
      (error, keystore) => {
        console.log('created keystore');

        if (error) {
          reject(error.message);
        } else {
          keystore.keyFromPassword(Wallet.password, (error, pwDerivedKey) => {
            console.log('keyFromPassword callback');
            if (error) {
              reject(error.message);
            } else {
              keystore.generateNewAddress(pwDerivedKey, Wallet.numAddr);
              resolve(keystore);
            }
          });
        }
      },
    );
  });
}

export function createKeystore() {
  Wallet.numAddr = 10;
  return createdStored()
    .then(keystore => {
      Wallet.keystore = keystore;
      return keystore;
    })
    .catch(e => {
      console.log(e);
    });
}
export async function createAddress() {
  try {
    const address = await Wallet.generateAddress();
    const mainAddress = address[0].address;
    Wallet.address = address;
    const listAddress = [
      {
        alias: 'Main Address',
        address: mainAddress,
      },
    ];
    await Promise.all([
      AsyncStorage.setItem('addresses', JSON.stringify(address)),
      AsyncStorage.setItem('mainAddress', JSON.stringify(mainAddress)),
      AsyncStorage.setItem('addressesEdit', JSON.stringify(listAddress)),
    ]);
    return address;
  } catch (error) {
    console.log(error);
  }
}
export async function encodeKeystore() {
  try {
    const json = await Wallet.encodeJson();
    await AsyncStorage.setItem('keystore', json);
  } catch (error) {
    console.log(error);
  }
}
function initEtherScan() {
  const etherscan = api.init(
    'NF3VM2RDBRJMAXCGPDIBX2KMX8W5ED8SF9',
    this.networkEtherScan,
    3000,
  );
  this.etherscan = etherscan;
  return etherscan;
}
Wallet.initEtherScan = initEtherScan;

const setWeb3Provider = async function() {
  let web3Provider = new HookedWeb3Provider({
    host: Wallet.provider,
    transaction_signer: Wallet.keystore,
  });
  Wallet.web3.setProvider(web3Provider);
};
type GasLimit = {
  gasLimit: number;
  gasPrice: number;
};
export const calculateGasLimitETH = async function(
  from,
  to,
  value,
): Promise<GasLimit> {
  return new Promise(async (resolve, reject) => {
    setWeb3Provider();
    value = value * 1.0e18;
    let txOptions = {
      to: to,
      value: 0,
      nonce: 0,
      data: '',
    };
    try {
      txOptions.value = Wallet.web3.toHex(value);
    } catch (error) {
      reject(error);
    }

    Wallet.web3.eth.getTransactionCount(from, async (err, res) => {
      if (!err) {
        if (res != 0) {
          try {
            txOptions.nonce = Wallet.web3.toHex(res);
          } catch (error) {
            reject(error);
          }
        } else {
          txOptions.nonce = res;
        }
        let Result = {gasLimit: null, gasPrice: null};
        await Wallet.web3.eth.estimateGas(txOptions, async (err, res) => {
          if (!err) {
            Result.gasLimit = res;
            await Wallet.web3.eth.getGasPrice((error, result) => {
              if (!error) {
                Result.gasPrice = result * 1;
                Result.gasPrice +=
                  ((Result.gasPrice * Wallet.percentageGas) / 100) * 1;
                Result.gasPrice = Math.round(Result.gasPrice);
                resolve(Result);
              } else {
                console.log(error);
                reject('An error occurred while calculating the gas :c');
              }
            });
          } else {
            reject('lol');
          }
        });
      } else {
        reject(err);
      }
    });
  });
};

export const calculateGasLimitToken = async function(
  from,
  to,
  value,
): Promise<GasLimit> {
  return new Promise(async (resolve, reject) => {
    setWeb3Provider();
    let contract = Wallet.web3.eth.contract(Wallet.minABI).at(Wallet.tokenAddr);
    // value = value * 10 ** this.tokenDecimals * 1;
    let Result = {gasLimit: null, gasPrice: null};

    await contract.transfer.estimateGas(
      to,
      value,
      {from: from},
      async (err, result) => {
        if (!err) {
          Result.gasLimit = result;
          await Wallet.web3.eth.getGasPrice((error, result) => {
            if (!error) {
              Result.gasPrice = result * 1;
              Result.gasPrice +=
                ((Result.gasPrice * Wallet.percentageGas) / 100) * 1;
              Result.gasLimit +=
                ((Result.gasLimit * Wallet.percentageGas) / 100) * 1;
              Result.gasPrice = Math.round(Result.gasPrice);
              Result.gasLimit = Math.round(Result.gasLimit);
              resolve(Result);
            } else {
              reject('An error occurred while calculating the gas 1');
            }
          });
        } else {
          console.log(err);
          reject('An error occurred while calculating the gas 2');
        }
      },
    );
  });
};

export const sendETH = (
  password,
  from,
  to,
  value,
  gasPrice,
  gasLimit,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      Wallet.keystore.keyFromPassword(password, async (err, pwDerivedKey) => {
        if (!err) {
          setWeb3Provider();
          value = value * 1.0e18;
          let txOptions = {
            to: to,
            gasLimit: 0,
            gasPrice: 0,
            value: 0,
            nonce: 0,
            data: '',
          };
          try {
            txOptions.gasLimit = await Wallet.web3.toHex(gasLimit);
            txOptions.gasPrice = await Wallet.web3.toHex(gasPrice);
            txOptions.value = await Wallet.web3.toHex(value);
          } catch (error) {
            reject(error);
          }
          let nonce = 0;
          Wallet.web3.eth.getTransactionCount(
            from,
            'pending',
            async (err, res) => {
              txOptions.nonce = res;
              let contractData = txutils.createContractTx(from, txOptions);
              try {
                let signedTx =
                  '0x' +
                  signing.signTx(
                    Wallet.keystore,
                    pwDerivedKey,
                    contractData.tx,
                    from,
                  );

                Wallet.web3.eth.sendRawTransaction(signedTx, (err, result) => {
                  if (!err) {
                    resolve(result);
                  } else {
                    reject(err.message);
                  }
                });
              } catch (e) {
                reject(e.message);
              }
            },
          );
        } else {
          reject('There was an error sending ethereum');
        }
      });
    } catch (e) {
      reject(e.message);
    }
  });
};

export const sendTokens = async (
  password,
  from,
  to,
  value,
  gasPrice,
  gasLimit,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      Wallet.keystore.keyFromPassword(password, async (err, pwDerivedKey) => {
        if (!err) {
          setWeb3Provider();
          let txOptions = {
            to: Wallet.tokenAddr,
            gasLimit: 0,
            gasPrice: 0,
            value: 0,
            nonce: 0,
            data: '',
          };
          let contract = Wallet.web3.eth
            .contract(Wallet.minABI)
            .at(Wallet.tokenAddr);
          value = value * 10 ** Wallet.tokenDecimals * 1;
          try {
            txOptions.gasLimit = await Wallet.web3.toHex(gasLimit);
            txOptions.gasPrice = await Wallet.web3.toHex(gasPrice);
            txOptions.value = await Wallet.web3.toHex(0);
            txOptions.data = await contract.transfer.getData(to, value, {
              from: from,
            });
          } catch (error) {
            reject(error);
          }
          await Wallet.web3.eth.getTransactionCount(
            from,
            'pending',
            async (err, res) => {
              txOptions.nonce = res;
              let contractData = txutils.createContractTx(from, txOptions);
              try {
                let signedTx =
                  '0x' +
                  signing.signTx(
                    Wallet.keystore,
                    pwDerivedKey,
                    contractData.tx,
                    from,
                  );
                Wallet.web3.eth.sendRawTransaction(signedTx, (err, result) => {
                  if (!err) {
                    resolve(result);
                  } else {
                    reject(err.message);
                  }
                });
              } catch (e) {
                reject(e.message);
              }
            },
          );
        } else {
          reject('There was an error sending tokens');
        }
      });
    } catch (e) {
      reject(e.message);
    }
  });
};

export async function getBalanceEth(address: string): Promise<number> {
  const web3 = new Web3();
  const web3Provider = new HookedWeb3Provider({
    host: Wallet.provider,
  });
  web3.setProvider(web3Provider);

  return new Promise((resolve, reject) =>
    web3.eth.getBalance(address, (error, result) => {
      if (error) reject(error);
      try {
        let toWei = Wallet.web3.fromWei(result);
        resolve(toWei.toNumber());
      } catch (error) {
        reject(error);
      }
    }),
  );
}

export * from './hooks/useGasLimit';
