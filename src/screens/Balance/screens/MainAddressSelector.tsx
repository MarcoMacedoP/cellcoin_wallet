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
  //   route: {params: {setAddress: (address) => void}};
};

export const MainAddressSelector: React.FC<SendTransferScreenProps> = props => {
  //   const {setAddress} = props.route.params;
  const [modalAdd, setModalAdd] = useGlobalState('modalAdd');
  const [, setMainAddress] = useGlobalState('mainAddress');

  const [state, setState] = useState({
    alias: '',
    address: '',
    ready: false,
  });

  const [listAddress, setListAddress] = useState([]);
  const [listAddressBase, setListAddressBase] = useState([]);
  const [listAddressQuantity, setListAddressQuantity] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    async function getAddress() {
      try {
        // AsyncStorage.removeItem('addressesEdit')
        let arrayAddress: Array<any> = JSON.parse(
          await AsyncStorage.getItem('addresses'),
        );
        let arrayAddressEdited: Array<any> = JSON.parse(
          await AsyncStorage.getItem('addressesEdit'),
        );
        setListAddressBase(arrayAddress);
        if (arrayAddressEdited.length !== 0) {
          setListAddress(arrayAddressEdited);
          setListAddressQuantity(arrayAddressEdited.length - 1);
        } else {
          cleanList();
        }
      } catch (error) {}
    }
    async function cleanList() {
      const tempArray = listAddress.filter(data => data.index !== -1 && data);
      setListAddress(tempArray);
      await AsyncStorage.setItem('addressesEdit', JSON.stringify(tempArray));
    }
    getAddress();
  }, []);
  const addNewAddress = async () => {
    if (listAddressQuantity != 9) {
      let counter = 1 + listAddressQuantity;
      setListAddressQuantity(counter);
      var data = {
        alias: state.alias,
        address: listAddressBase[counter].address,
        index: listAddressQuantity,
      };
      listAddress.push(data);
      setListAddress(listAddress);
      setOnAsync();
    } else {
      Toast.show('Limit address');
    }
  };
  const setOnAsync = async () => {
    await AsyncStorage.setItem('addressesEdit', JSON.stringify(listAddress));
    setModalAdd(!modalAdd);
    setState({
      ...state,
      alias: '',
      address: listAddressBase[listAddressQuantity].address,
    });
  };

  const SetMainAddresAndReload = text => {
    setMainAddress(text);
    // navigation.goBack();
    navigation.reset({
      index: 0,
      routes: [{name: 'Balance'}],
    });
  };

  const onTextAliasChange = text => {
    setState({...state, alias: text});
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
          <SwipeListView
            data={listAddress}
            renderItem={(data, rowMap) => (
              <TouchableHighlight
                id={rowMap}
                onPress={() => {
                  // setMainAddress(data.item.address);
                  // navigation.goBack();
                  SetMainAddresAndReload(data.item.address);
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
                style={{
                  backgroundColor: 'transparent',
                }}
              />
            )}
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
        <Button
          isActivated={state.alias ? true : false}
          width={'90%'}
          onClick={() => addNewAddress()}>
          Add Address
        </Button>
      </Modal>
    </Container>
  );
};
const Icon = styled(BaseIcon)``;
type ContainerProps = {
  hasData: boolean;
};
const Container = styled(ScreenContainer)<ContainerProps>`
  flex: 1;

  align-items: center;
  justify-content: ${props => (props.hasData ? 'center' : 'space-around')};
  background-color: ${props =>
    props.hasData ? colors.lightGray : colors.white};
`;
const ListContent = styled.View`
  margin-top: 25%;
  width: 100%;
  flex: 1;
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
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  bottom: 28px;
  justify-content: center;
  align-items: center;
`;
