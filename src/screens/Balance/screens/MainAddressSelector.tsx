import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  ScreenContainer,
  Label as BaseLabel,
  Input,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {TouchableOpacity} from 'react-native';
import {Button} from 'shared/components/Button';
import Toast from 'react-native-simple-toast';
import {Modal, EmptyState} from 'shared/components';
import {useGlobalState} from 'globalState';
import FIcon from 'react-native-vector-icons/Feather';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthRootStackParams} from 'Router';
import {AddressItem} from '../components/AddressItem';

type SendTransferScreenProps = {
  navigation: StackNavigationProp<AuthRootStackParams, 'MainAddressSelector'>;
};

export const MainAddressSelector: React.FC<SendTransferScreenProps> = ({
  navigation,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setMainAddress] = useGlobalState('mainAddress');

  const [state, setState] = useState({
    alias: '',
    address: '',
    isReady: false,
  });

  const [listAddress, setListAddress] = useState([]);
  const [listAddressBase, setListAddressBase] = useState([]);
  const [listAddressQuantity, setListAddressQuantity] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <FIcon
          name="plus"
          size={20}
          color={tintColor}
          onPress={() => setIsModalOpen(true)}
        />
      ),
    });
  }, []);

  useEffect(() => {
    async function getAddress() {
      try {
        // AsyncStorage.removeItem('addressesEdit')
        let arrayAddress: string[] = JSON.parse(
          await AsyncStorage.getItem('addresses'),
        );
        let arrayAddressEdited: string[] = JSON.parse(
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
    setIsModalOpen(!isModalOpen);
    setState({
      ...state,
      alias: '',
      address: listAddressBase[listAddressQuantity].address,
    });
  };

  const setMainAddresAndReload = (selectedAddress: string) => {
    setMainAddress(selectedAddress);
    navigation.push('Balance');
  };

  const onTextAliasChange = text => {
    setState({...state, alias: text});
  };

  return (
    <Container hasData={listAddress.length === 0 ? false : true} light>
      <ListContent>
        <SwipeListView
          ListEmptyComponent={() => (
            <EmptyState message="There is not an address to select" />
          )}
          data={listAddress}
          renderItem={({item, index}) => (
            <AddressItem
              key={index}
              onPress={setMainAddresAndReload}
              address={item.address}
              alias={item.alias}
            />
          )}
          renderHiddenItem={(data, rowMap) => (
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
              }}
            />
          )}
        />
      </ListContent>

      <Modal
        isShowed={isModalOpen}
        icon={'x'}
        onClose={() => {
          setIsModalOpen(!isModalOpen);
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

const Label = styled(BaseLabel)`
  position: relative;
  top: 4px;
`;
