import React, {useState, useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import {EmptyState, ScreenContainer, DeleteItemCard} from 'shared/components';
import {useGlobalState} from 'globalState';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthRootStackParams} from 'Router';
import {AddressItem} from '../components/AddressItem';
import {AddAddressModal} from '../components/AddAddressModal';
import {useModal, useHeaderIcon} from 'shared/hooks';
import * as Notifications from 'shared/libs/Notifications';
import {ContactCard} from 'screens/Transfers/components/ContactCard';
import {globalStyles} from 'shared/styles';
import {View} from 'react-native';

type SendTransferScreenProps = {
  navigation: StackNavigationProp<AuthRootStackParams, 'MainAddressSelector'>;
};

export const MainAddressSelector: React.FC<SendTransferScreenProps> = ({
  navigation,
}) => {
  const modal = useModal();
  const [, setMainAddress] = useGlobalState('mainAddress');

  const [state, setState] = useState({
    alias: '',
    address: '',
    isReady: false,
  });

  const [listAddress, setListAddress] = useState([]);
  const [listAddressBase, setListAddressBase] = useState([]);
  const [listAddressQuantity, setListAddressQuantity] = useState(0);
  useHeaderIcon({
    onPress: modal.open,
  });

  useEffect(() => {
    async function getAddress() {
      try {
        const arrayAddress: string[] = JSON.parse(
          await AsyncStorage.getItem('addresses'),
        );
        const arrayAddressEdited: string[] = JSON.parse(
          await AsyncStorage.getItem('addressesEdit'),
        );
        console.log();
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

  const removeAddress = async (listItem: any, index: number) => {
    if (index === 0) {
      Toast.show("You can't delete your main address");
    } else {
      const updatedAddress = listAddress.filter(
        item => item.address !== listItem.address,
      );
      setListAddress(updatedAddress);
      await AsyncStorage.setItem(
        'addressesEdit',
        JSON.stringify(updatedAddress),
      );
    }
  };

  const setOnAsync = async () => {
    await AsyncStorage.setItem('addressesEdit', JSON.stringify(listAddress));
    modal.close();
    setState({
      ...state,
      alias: '',
      address: listAddressBase[listAddressQuantity].address,
    });
  };

  const setMainAddresAndReload = (selectedAddress: string) => {
    Notifications.setUserAddress(selectedAddress);
    setMainAddress(selectedAddress);
    navigation.push('Balance');
  };

  const onTextAliasChange = text => {
    setState({...state, alias: text});
  };

  return (
    <ScreenContainer statusBarProps={{barStyle: 'dark-content'}} light>
      <View style={globalStyles.baseContainer}>
        <SwipeListView
          ListEmptyComponent={() => (
            <EmptyState message="There is not an address to select" />
          )}
          keyExtractor={({address}) => address}
          data={listAddress}
          contentContainerStyle={globalStyles.listContentContainer}
          rightOpenValue={-75}
          keyExtractor={({address}) => address}
          renderItem={({item, index}) => (
            <ContactCard
              key={index}
              onPress={setMainAddresAndReload}
              address={item.address}
              alias={item.alias}
            />
          )}
          renderHiddenItem={({item, index}) => (
            <DeleteItemCard onDelete={() => removeAddress(item, index)} />
          )}
        />
      </View>

      <AddAddressModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        alias={state.alias}
        onAliasChange={onTextAliasChange}
        onSubmit={addNewAddress}
      />
    </ScreenContainer>
  );
};
