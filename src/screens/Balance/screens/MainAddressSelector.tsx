import React, {useState, useEffect, useLayoutEffect} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import {EmptyState, ScreenContainer} from 'shared/components';
import {useGlobalState} from 'globalState';
import FIcon from 'react-native-vector-icons/Feather';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthRootStackParams} from 'Router';
import {AddressItem} from '../components/AddressItem';
import {AddAddressModal} from '../components/AddAddressModal';

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
        const arrayAddress: string[] = JSON.parse(
          await AsyncStorage.getItem('addresses'),
        );
        const arrayAddressEdited: string[] = JSON.parse(
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

  function handleModalClose() {
    setIsModalOpen(false);
  }
  return (
    <ScreenContainer statusBarProps={{barStyle: 'dark-content'}}>
      <SwipeListView
        ListEmptyComponent={() => (
          <EmptyState message="There is not an address to select" />
        )}
        keyExtractor={({address}) => address}
        data={listAddress}
        renderItem={({item, index}) => (
          <AddressItem
            key={index}
            onPress={setMainAddresAndReload}
            address={item.address}
            alias={item.alias}
          />
        )}
      />

      <AddAddressModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        alias={state.alias}
        onAliasChange={onTextAliasChange}
        onSubmit={addNewAddress}
      />
    </ScreenContainer>
  );
};
