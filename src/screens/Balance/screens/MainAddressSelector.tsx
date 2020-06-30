import React, {useState, useEffect, useMemo} from 'react';
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
import {useAsyncStorageList} from 'shared/hooks/useAsyncStorageList';

type SendTransferScreenProps = {
  navigation: StackNavigationProp<AuthRootStackParams, 'MainAddressSelector'>;
};
export const MainAddressSelector: React.FC<SendTransferScreenProps> = ({
  navigation,
}) => {
  const wallets = useWalletsList();
  const addWalletModal = useModal();
  const editWalletModal = useModal();

  const [, setMainAddress] = useGlobalState('mainAddress');
  const [, setMainAddressAlias] = useGlobalState('mainAddressAlias');

  const [state, setState] = useState({
    alias: '',
    address: '',
  });
  const [selectedWallet, setSelectedWallet] = useState<WalletListItem>();
 useHeaderIcon({
    onPress: addWalletModal.open,
  });

  const setMainAddresAndReload = (selectedAddress: string, alias: string) => {
    setMainAddressAlias(alias);
    Notifications.setUserAddress(selectedAddress);
    setMainAddress(selectedAddress);
    navigation.push('Balance');
  };

  const onTextAliasChange = text => {
    setState({...state, alias: text});
  };
  const handleAddWallet = async () => {
    addWalletModal.close();
    await wallets.add(state.alias);
    setState((state)=>({...state, alias: ''}))
  }
  const handleWalletLongPress = (wallet: WalletListItem) => {
    setSelectedWallet(wallet);
    editWalletModal.open();
  };
  const handleDeleteWalletFromDetailsModal = async (wallet: WalletListItem) => {
    editWalletModal.close();
    await wallets.delete(wallet, 'address');
  
  };
  const handleEditWallet = async (wallet: WalletListItem) => {
    editWalletModal.close();
    await wallets.editItem(wallet, 'address');
  };
  return (
    <ScreenContainer statusBarProps={{barStyle: 'dark-content'}} light>
      <View style={globalStyles.baseContainer}>
        <SwipeListView
        refreshing={wallets.isLoading}
        onRefresh={wallets.get}
          ListEmptyComponent={() => (
            <EmptyState message="There is not an address to select" />
          )}
          keyExtractor={({address}) => address}
          contentContainerStyle={globalStyles.listContentContainer}
          data={wallets.list}
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
          renderHiddenItem={({item}) => (
            <DeleteItemCard onDelete={() => wallets.delete(item, 'address')} />
          )}
        />
      </View>

      <AddAddressModal
        isOpen={addWalletModal.isOpen}
        onClose={addWalletModal.close}
        alias={state.alias}
        onAliasChange={onTextAliasChange}
        onSubmit={handleAddWallet}
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

function useWalletsList() {
  const maximumWallets  = 9;
  const [addressList, setAddressList] = useState([]);
  const wallet = useAsyncStorageList<WalletListItem>('addressesEdit');
  const walletCount = useMemo(() => wallet.list.length - 1, [wallet.list]);
  
  async function getList(){
      const [rawAddressList] = await Promise.all([
          AsyncStorage.getItem('addresses'),
          wallet.get(),
      ]);
      const parsedList = JSON.parse(rawAddressList);
      setAddressList(parsedList);
  }
  useEffect(() => {
    getList();
  }, []);

  async function addItem(alias:string) {
    const item: WalletListItem = {
      alias,
      address: addressList[walletCount + 1 ]?.address,
      index: walletCount
    }
    if(walletCount > maximumWallets){
          Toast.show('Limit address');      
    }else{
      await wallet.add(item);
    }
  }
  return {...wallet, add : addItem, get: getList }
}
