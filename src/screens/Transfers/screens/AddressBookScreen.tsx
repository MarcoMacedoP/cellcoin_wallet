import React, {useState, useEffect} from 'react';
import {Text, SmallText} from 'shared/styled-components/Texts';
import {
  ScreenContainer,
  Label as BaseLabel,
  Input,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {
  TouchableOpacity,
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {Button} from 'shared/components/Button';
import BaseIcon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import {Modal} from 'shared/components';
import {useGlobalState} from 'globalState';
import FIcon from 'react-native-vector-icons/Feather';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScanScreen} from 'shared/components/QrReader';

type SendTransferScreenProps = {
  route: {params: {setAddress: (address) => void}};
};

export const AddressBookScreen: React.FC<SendTransferScreenProps> = props => {
  const {setAddress} = props.route.params;
  const [modalQR, setModalQR] = useGlobalState('modalQR');
  const [modalAdd, setModalAdd] = useGlobalState('modalAdd');
  const [contactsQuantity, setContactsQuantity] = useGlobalState(
    'contactsQuantity',
  );

  const [state, setState] = useState({
    alias: '',
    address: '',
    ready: false,
  });

  const [listAddress, setListAddress] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function getAddress() {
      try {
        let arrayAddress: Array<any> = JSON.parse(
          await AsyncStorage.getItem('contacts'),
        );
        if (arrayAddress.length !== 0) {
          setListAddress(arrayAddress);
        } else {
          cleanList();
        }
      } catch (error) {}
    }
    async function cleanList() {
      const tempArray = listAddress.filter(data => data.index !== -1 && data);
      setListAddress(tempArray);
      setContactsQuantity(0);
      await AsyncStorage.setItem('contacts', JSON.stringify(tempArray));
    }
    getAddress();
  }, []);
  const addNewAddress = async () => {
    setContactsQuantity(contactsQuantity + 1);
    var data = {
      alias: state.alias,
      address: state.address,
      index: contactsQuantity,
    };
    listAddress.push(data);
    setListAddress(listAddress);
    setOnAsync();
  };
  const setOnAsync = async () => {
    await AsyncStorage.setItem('contacts', JSON.stringify(listAddress));
    setModalAdd(!modalAdd);
    setState({
      ...state,
      alias: '',
      address: '',
    });
  };

  const onTextAliasChange = text => {
    setState({...state, alias: text});
  };
  const isAddress = function(address) {
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
  };
  const onTextAddressChange = text => {
    let validAddress = false;
    try {
      validAddress = isAddress(text);
    } catch (e) {
      console.log(e);
    }

    setState({...state, address: text, validAddress: validAddress});
  };

  const deleteAddress = async ({item}) => {
    const tempArray = listAddress.filter(
      data => data.index !== item.index && data,
    );
    setListAddress(tempArray);
    await AsyncStorage.setItem('contacts', JSON.stringify(tempArray));
  };

  return (
    <Container hasData={listAddress.length === 0 ? false : true} light>
      {listAddress.length === 0 ? (
        <>
          <Icon name="address-card-o" size={60} color={colors.black} />
          <Button isActivated={true} onClick={() => setModalAdd(!modalAdd)}>
            Add
          </Button>
        </>
      ) : (
        <ListContent>
          <Subtitle>Swipe elements to remove</Subtitle>
          <SwipeListView
            data={listAddress}
            renderItem={(data, rowMap) => (
              <TouchableHighlight
                id={rowMap}
                onPress={() => {
                  setAddress(data.item.address);
                  navigation.goBack();
                }}
                underlayColor={colors.lightGray}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  height: 60,
                  marginTop: 10,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <>
                  <IconBox>
                    <FIcon name="user" size={25} color={colors.accent} />
                  </IconBox>
                  <LabelBox>
                    <Text>{data.item.alias}</Text>
                    <Text style={{color: colors.gray, fontSize: 10}}>
                      {' '}
                      {data.item.address}
                    </Text>
                  </LabelBox>
                </>
              </TouchableHighlight>
            )}
            renderHiddenItem={(data, rowMap) => (
              <TouchableOpacity
                onPress={() => deleteAddress(data)}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#ef5350',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 15,
                  marginTop: 10,
                  height: 60,
                  borderRadius: 5,
                }}>
                <FIcon name="x-circle" size={25} color={colors.white} />
              </TouchableOpacity>
            )}
            leftOpenValue={75}
          />
        </ListContent>
      )}
      <Modal
        isShowed={modalAdd}
        icon={'x'}
        onClose={() => {
          setModalAdd(!modalAdd);
        }}>
        <InputContainer>
          <Label>Alias</Label>
          <Input
            align="left"
            value={state.alias}
            maxLength={15}
            keyboardAppearance={'dark'}
            onChangeText={value => onTextAliasChange(value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Address</Label>
          <InputField
            align="left"
            value={state.address}
            keyboardAppearance={'dark'}
            onChangeText={value => onTextAddressChange(value)}
          />
          <IconContainer
            onPress={() => {
              setModalAdd(!modalAdd);
              setModalQR(!modalQR);
            }}>
            <Icon name="qrcode" size={25} color={colors.accent} />
          </IconContainer>
        </InputContainer>
        <Button
          isActivated={state.alias && state.address ? true : false}
          width={'90%'}
          onClick={() => addNewAddress()}>
          Add Address
        </Button>
      </Modal>

      <Modal
        isShowed={modalQR}
        icon={'x'}
        onClose={() => {
          setModalQR(!modalQR);
          setModalAdd(!modalAdd);
        }}>
        <ScanScreen
          closeModal={data => {
            setState({...state, address: data});
            setModalQR(false);
            setModalAdd(true);
          }}
        />
      </Modal>
    </Container>
  );
};
const Icon = styled(BaseIcon)``;
type ContainerProps = {
  hasData: boolean;
};
const Container = styled<ContainerProps>(ScreenContainer)`
  height: 100%;
  align-items: center;
  justify-content: ${props => (props.hasData ? 'center' : 'space-around')};
  background-color: ${props =>
    props.hasData ? colors.lightGray : colors.white};
`;
const ListContent = styled.View`
  margin-top: 10%;
  width: 100%;
  height: 80%;
`;
const InputContainer = styled.View`
  margin: 8px 0;
  padding: 4px 8px;
  width: 90%;
  background-color: ${colors.whiteDark};
  border-radius: 4px;
`;
const InputField = styled(Input)`
  width: 90%;
`;
const IconBox = styled.View`
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const LabelBox = styled.View`
  width: 90%;
  justify-content: center;
  align-items: center;
`;
const Label = styled(BaseLabel)`
  position: relative;
  top: 4px;
`;
const Subtitle = styled(BaseLabel)`
  position: relative;
  color: ${colors.black};
  top: 4px;
`;
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  bottom: 28px;
  justify-content: center;
  align-items: center;
`;
