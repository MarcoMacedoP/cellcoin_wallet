import React, {useState, useEffect} from 'react';
import {Text, SmallText} from 'shared/styled-components/Texts';
import {
  ScreenContainer,
  Label as BaseLabel,
  Input,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import Slider from '@react-native-community/slider';
import {Button} from 'shared/components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useGlobalState} from 'globalState';
import {ScanScreen} from 'shared/components/QrReader';
import {Modal} from 'shared/components';
import {CurrencyType} from 'shared/types';
import Toast from 'react-native-simple-toast';
import Wallet from 'erc20-wallet';
import {PasswordModal} from '../components/PasswordModal';
let HookedWeb3Provider = require('hooked-web3-provider');
let lightwallet = require('eth-lightwallet');
let txutils = lightwallet.txutils;
let signing = lightwallet.signing;
let web3 = require('web3');
type SetAddressScreenProps = {
  route: {params: {currency: CurrencyType}};
};

export const SetAddressScreen: React.FC<SetAddressScreenProps> = ({
  route: {params},
}) => {
  const navigation = useNavigation();
  const {currency, quantityCurrenncy} = params;
  const recomendation = 21000;
  const [modalQR, setModalQR] = useGlobalState('modalQR');
  const [modalIsShowed, setModalIsShowed] = useState(false);
  const [mainAddress] = useGlobalState('mainAddress');
  const [gasLimit, setGasLimit] = useState(21000);
  const [isLoading, setIsLoading] = useState(false);
  const [minerFee, setMinerFee] = useState(21000);

  const [state, setState] = useState({
    amount: quantityCurrenncy,
    to: '',
    balance: parseFloat(currency.value.original),
    password: '',
  });
  /**
   * Open the modal for enter the user password
   */
  function handleSubmit() {
    setModalIsShowed(true);
  }
  /**
   * Set the password and calls send the crypto
   */
  function onPasswordFilled(password: string) {
    setState({...state, password});
    currency.type == 'ETH'
      ? getGasLimitETH(password)
      : getGasLimitToken(password);
  }

  const setWeb3Provider = async function() {
    let web3Provider = new HookedWeb3Provider({
      host: Wallet.provider,
      transaction_signer: Wallet.keystore,
    });
    Wallet.web3.setProvider(web3Provider);
  };

  const getGasLimitToken = async pass => {
    setIsLoading(true);
    await calculateGasLimitToken(mainAddress, state.to, state.amount)
      .then(response => {
        sendTokenss(response, pass);
      })
      .catch(error => {
        Toast.show('Insufficient funds for gas', Toast.SHORT);
        setIsLoading(false);
      });
  };

  const getGasLimitETH = async pass => {
    setIsLoading(true);
    await calculateGasLimitETH(mainAddress, state.to, state.amount)
      .then(response => {
        sendETH(response, pass);
      })
      .catch(error => {
        if (
          (error =
            'invalid argument 0: hex string has length 0, want 40 for common.Address')
        ) {
          Toast.show(
            'Please insert a valid Ethereum address to continue',
            Toast.SHORT,
          );
        }
        setIsLoading(false);
      });
  };

  const calculateGasLimitToken = async function(from, to, value) {
    return new Promise(async (resolve, reject) => {
      setWeb3Provider();
      let contract = Wallet.web3.eth
        .contract(Wallet.minABI)
        .at(Wallet.tokenAddr);
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
                reject('An error occurred while calculating the gas');
              }
            });
          } else {
            reject('An error occurred while calculating the gas');
          }
        },
      );
    });
  };

  const calculateGasLimitETH = async function(from, to, value) {
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
                  reject('An error occurred while calculating the gas');
                }
              });
            } else {
              reject(err);
            }
          });
        } else {
          reject(err);
        }
      });
    });
  };

  const sendETH = async function(gass, pass) {
    await sendETHE(
      pass,
      mainAddress,
      state.to,
      state.amount,
      gass.gasPrice,
      gass.gasLimit,
    )
      .then(response => {
        Toast.show('Hash transaction: ' + response, Toast.SHORT);
        navigation.navigate('Balance');
        setModalIsShowed(false);
        setIsLoading(false);
      })
      .catch(error => {
        if ((error = 'insufficient funds for gas * price + value')) {
          Toast.show('Insufficient funds for gas', Toast.SHORT);
        } else {
          Toast.show('Error: ' + error, Toast.SHORT);
        }
        setIsLoading(false);
      });
  };

  const sendTokenss = async function(gass, pass) {
    await sendTokens(
      pass,
      mainAddress,
      state.to,
      state.amount,
      gass.gasPrice,
      gass.gasLimit,
    )
      .then(response => {
        Toast.show('Hash transaction: ' + response, Toast.SHORT);
        navigation.navigate('Balance');
        setModalIsShowed(false);
        setIsLoading(false);
      })
      .catch(error => {
        if ((error = 'insufficient funds for gas * price + value')) {
          Toast.show('Insufficient funds for gas', Toast.SHORT);
        } else {
          Toast.show('Error: ' + error, Toast.SHORT);
        }
        setIsLoading(false);
      });
  };

  const sendETHE = (password, from, to, value, gasPrice, gasLimit) => {
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

                  Wallet.web3.eth.sendRawTransaction(
                    signedTx,
                    (err, result) => {
                      if (!err) {
                        resolve(result);
                      } else {
                        reject(err.message);
                      }
                    },
                  );
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

  const sendTokens = async (password, from, to, value, gasPrice, gasLimit) => {
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
                  Wallet.web3.eth.sendRawTransaction(
                    signedTx,
                    (err, result) => {
                      if (!err) {
                        resolve(result);
                      } else {
                        reject(err.message);
                      }
                    },
                  );
                } catch (e) {
                  reject(e.message);
                }
              },
            );

            // let txOptions = {
            //     to: this.tokenAddr,
            //     gasLimit: this.web3.toHex(gasLimit),
            //     gasPrice: this.web3.toHex(gasPrice),
            //     value: this.web3.toHex(0),
            //     nonce: this.web3.eth.getTransactionCount(from),
            //     data: contract.transfer.getData(to, value, { from: from }),
            // };
          } else {
            reject('There was an error sending tokens');
          }
        });
      } catch (e) {
        reject(e.message);
      }
    });
  };

  const setAddressText = text => {
    setState({...state, to: text});
  };

  const onRecomendationClick = () => setMinerFee(recomendation);

  return (
    <>
      <PasswordModal
        transactionData={{
          currency: currency.type,
          amount: state.amount,
          usd:
            (parseFloat(currency.value.usd) /
              parseFloat(currency.value.original)) *
            parseFloat(state.amount),
        }}
        isShowed={modalIsShowed}
        onClose={() => setModalIsShowed(false)}
        onDoned={onPasswordFilled}
        loading={isLoading}
      />
      <ScrollView
        contentContainerStyle={{backgroundColor: colors.white}}
        style={{backgroundColor: colors.white}}>
        <Container light>
          <Label style={{fontSize: 14}}>Amount to send: {state.amount}</Label>
          <InputBox>
            <Label style={{marginHorizontal: 5}}>To</Label>
            <InputButton>
              <FromInput
                value={state.to}
                maxLength={42}
                keyboardAppearance={'dark'}
                onChangeText={value => setAddressText(value)}
              />

              <IconContainer
                onPress={() =>
                  navigation.navigate('Transfers', {
                    screen: 'address',
                    params: {
                      setAddress: address => setState({...state, to: address}),
                    },
                  })
                }>
                <Icon name="address-book" size={20} color={colors.accent} />
              </IconContainer>
            </InputButton>
          </InputBox>
          <InputBox style={{paddingHorizontal: 5}}>
            <Label>Gas fee</Label>
            <FeeText ligth={false} style={{textTransform: 'uppercase'}}>
              {minerFee} gwei= $ {minerFee * 1050000000}
            </FeeText>
            <FeeSlider
              minimumValue={21000}
              maximumValue={81000}
              value={minerFee}
              onSlidingComplete={setMinerFee}
            />
            <FeeSpeedContainer>
              <SmallText color="ligth">Slow</SmallText>
              <SmallText color="ligth">Fast</SmallText>
            </FeeSpeedContainer>
            <TouchableOpacity onPress={onRecomendationClick}>
              <RecomendedFeed>
                Recomended: {recomendation} gwei/b
              </RecomendedFeed>
            </TouchableOpacity>
          </InputBox>
          <Button
            secondary
            isActivated={state.to.length === 42}
            onClick={handleSubmit}
            isLoading={isLoading}>
            Confirm
          </Button>
        </Container>
        <Modal
          isShowed={modalQR}
          icon={'x'}
          onClose={() => {
            setModalQR(!modalQR);
          }}>
          <ScanScreen
            closeModal={data => {
              setState({...state, to: data});
              setModalQR(false);
            }}
          />
        </Modal>
      </ScrollView>
    </>
  );
};
const Container = styled(ScreenContainer)`
  flex: 1;
  padding-top: 8px;e
`;
const Title = styled(Text)``;
const Label = styled(BaseLabel)`
  top: 4px;
`;
const InputBox = styled.View`
  border-radius: 4px;
  margin: 8px 0;
  background-color: ${colors.lightGray};
  width: 103%;
`;
const InputButton = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const IconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const FromInput = styled(Input)`
  flex: 9;
  font-size: 13px;
  padding-right: 0px;
  padding-left: 10px;
  background-color: ${colors.lightGray};
  justify-content: center;
  text-align: left;
`;
const MaxTransfer = styled(SmallText)`
  color: ${colors.primary};
`;
const TransferInput = styled(Input)`
  font-size: 14px;
  font-weight: normal;
`;
const TransferText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
`;
const FeeSlider = styled(Slider)``;
const FeeText = styled(Label)`
  width: 100%;
  font-size: 12px;
  color: ${colors.black};
  margin: 8px 0 12px;
`;
const FeeSpeedContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px;
`;
const RecomendedFeed = styled(SmallText)`
  color: ${colors.primary};
  text-align: right;
  margin-bottom: 8px;
`;
