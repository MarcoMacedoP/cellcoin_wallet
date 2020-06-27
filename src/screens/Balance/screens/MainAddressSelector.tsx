import React, {useState, useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import {EmptyState, ScreenContainer, DeleteItemCard} from 'shared/components';
import {useGlobalState} from 'globalState';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthRootStackParams} from 'Router';
import {AddAddressModal} from '../components/AddAddressModal';
import {useModal, useHeaderIcon} from 'shared/hooks';
import * as Notifications from 'shared/libs/Notifications';
import {ContactCard} from 'screens/Transfers/components/ContactCard';
import {globalStyles} from 'shared/styles';
import {View} from 'react-native';
import {WalletListItem} from 'shared/types/interfaces';
import {EditWalletModal} from '../components/EditWalletModal';

type SendTransferScreenProps = {
  navigation: StackNavigationProp<AuthRootStackParams, 'MainAddressSelector'>;
};
export const MainAddressSelector: React.FC<SendTransferScreenProps> = ({
  navigation,
}) => {
  const addWalletModal = useModal();
  const editWalletModal = useModal();

  const [, setMainAddress] = useGlobalState('mainAddress');

  const [state, setState] = useState({
    alias: '',
    address: '',
  });

  const [selectedWallet, setSelectedWallet] = useState<WalletListItem>();

  const [listAddress, setListAddress] = useState<WalletListItem[]>([]);
  const [listAddressBase, setListAddressBase] = useState([]);
  const [listAddressQuantity, setListAddressQuantity] = useState(0);
  useHeaderIcon({
    onPress: addWalletModal.open,
  });

  useEffect(() => {
    async function getAddress() {
      try {
        const arrayAddress: string[] = JSON.parse(
          await AsyncStorage.getItem('addresses'),
        );
        const arrayAddressEdited: WalletListItem[] = JSON.parse(
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

  const editAddress = async (listItem: WalletListItem) => {
    const updatedAddress = listAddress.map(item =>
      item.address === listItem.address ? {...item, ...listItem} : item,
    );
    setListAddress(updatedAddress);
    await AsyncStorage.setItem('addressesEdit', JSON.stringify(updatedAddress));
  };

  const setOnAsync = async () => {
    await AsyncStorage.setItem('addressesEdit', JSON.stringify(listAddress));
    addWalletModal.close();
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
  const handleWalletLongPress = (wallet: WalletListItem) => {
    setSelectedWallet(wallet);
    editWalletModal.open();
  };
  const handleDeleteWalletFromDetailsModal = async (wallet: WalletListItem) => {
    editWalletModal.close();
    await removeAddress(wallet, wallet.index);
  };
  const handleEditWallet = async (wallet: WalletListItem) => {
    editWalletModal.close();
    await editAddress(wallet);
  };
  return (
    <ScreenContainer statusBarProps={{barStyle: 'dark-content'}} light>
      <View style={globalStyles.baseContainer}>
        <SwipeListView
          ListEmptyComponent={() => (
            <EmptyState message="There is not an address to select" />
          )}
          keyExtractor={({address}) => address}
          contentContainerStyle={globalStyles.listContentContainer}
          data={listAddress}
          rightOpenValue={-75}
          renderItem={({item, index}) =>
            item.alias && (
              <ContactCard
                onLongPress={() => handleWalletLongPress(item)}
                key={index}
                onPress={setMainAddresAndReload}
                address={item.address}
                alias={item.alias}
              />
            )
          }
          renderHiddenItem={({item, index}) => (
            <DeleteItemCard onDelete={() => removeAddress(item, index)} />
          )}
        />
      </View>

      <AddAddressModal
        isOpen={addWalletModal.isOpen}
        onClose={addWalletModal.close}
        alias={state.alias}
        onAliasChange={onTextAliasChange}
        onSubmit={addNewAddress}
      />
      <EditWalletModal
        onDelete={handleDeleteWalletFromDetailsModal}
        isOpen={editWalletModal.isOpen}
        onSubmit={handleEditWallet}
        wallet={selectedWallet}
        onClose={editWalletModal.close}
      />
    </ScreenContainer>
  );
};
