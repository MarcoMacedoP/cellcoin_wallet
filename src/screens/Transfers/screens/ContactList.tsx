import React, {useState, useEffect} from 'react';
import {ScreenContainer} from 'shared/styled-components';
import {StyleSheet, Alert, View} from 'react-native';
import {DeleteItemCard} from 'shared/components';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {RouteProp} from '@react-navigation/native';
import {AuthRootStackParams} from 'Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {EmptyContactList} from '../components/EmptyContactList';
import {AddContactModal} from '../components/AddContactModal';
import {useModal, useHeaderIcon} from 'shared/hooks';
import {Contact} from 'shared/types/interfaces';
import {ContactCard} from '../components/ContactCard';
import Toast from 'react-native-simple-toast';

type ContactListProps = {
  route: RouteProp<AuthRootStackParams, 'ContactsList'>;
  navigation: StackNavigationProp<AuthRootStackParams, 'ContactsList'>;
};

async function asyncStorageErrorHandler<T>(
  caller: () => Promise<T>,
  onError?: () => void,
) {
  try {
    await caller();
    console.log('loaded');
  } catch {
    Alert.alert('Error', 'Error reading data', [
      {onPress: caller, text: 'Try again'},
    ]);
    if (onError) {
      onError();
    }
  }
}
function useContacts() {
  const [listAddress, setListAddress] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getContacts() {
    setIsLoading(true);
    asyncStorageErrorHandler(
      async () => {
        const contacts: Contact[] = JSON.parse(
          await AsyncStorage.getItem('contacts'),
        );
        setIsLoading(false);
        setListAddress(contacts || []);
      },
      () => setIsLoading(false),
    );
  }
  async function addItem(contact: Contact) {
    console.log({listAddress});
    const updatedList =  listAddress?.length > 0 ? [contact, ...listAddress] : [contact];
    console.log({updatedList});
    setListAddress(updatedList);
    setIsLoading(true);
    asyncStorageErrorHandler(
      async () => {
        await AsyncStorage.setItem('contacts', JSON.stringify(updatedList));
        setIsLoading(false);
      },
      () => setIsLoading(false),
    );
  }

  async function removeItem(contact: Contact) {
    setIsLoading(true);
    asyncStorageErrorHandler(
      async () => {
        const filteredList = listAddress.filter(
          item => item.address !== contact.address,
        );
        console.log({filteredList});
        setListAddress(filteredList);
        await AsyncStorage.setItem('contacts', JSON.stringify(filteredList));
        setIsLoading(false);
      },
      () => setIsLoading(false),
    );
  }

  return {
    list: listAddress,
    isLoading,
    get: getContacts,
    add: addItem,
    delete: removeItem,
  };
}

export const ContactList: React.FC<ContactListProps> = ({
  navigation,
  route,
}) => {
  const addContactModal = useModal();
  const contacts = useContacts();

  useHeaderIcon({
    onPress: addContactModal.open,
  });

  useEffect(() => {
    contacts.get();
  }, []);

  async function handleAddModalSubmit(contact: Contact) {
    try {
      console.log({contact});
      await contacts.add(contact);
      addContactModal.close();
    } catch (e) {
      console.log(e);
    }
  }

  function selectContact(address: string) {
    navigation.navigate('ConfirmSend', {
      ...route.params,
      selectedAddress: address,
    });
  }

  return (
    <ScreenContainer light>
      <View style={styles.list}>
        <SwipeListView
          showsVerticalScrollIndicator={false}
          rightOpenValue={-75}
          data={contacts.list}
          onRefresh={contacts.get}
          keyExtractor={({address}) => address}
          refreshing={contacts.isLoading}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={() => (
            <EmptyContactList
              onAddContactPress={() => addContactModal.open()}
            />
          )}
          renderItem={({index, item}) =>
            item && (
              <ContactCard
                address={item.address}
                alias={item.alias}
                onPress={selectContact}
                key={index}
              />
            )
          }
          renderHiddenItem={({item}) => (
            <DeleteItemCard onDelete={() => contacts.delete(item)} />
          )}
        />
      </View>

      <AddContactModal
        onClose={addContactModal.close}
        isOpen={addContactModal.isOpen}
        onSubmit={handleAddModalSubmit}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    flex: 1,
    paddingTop: 16,
  },
  list: {
    width: '100%',
    flex: 1,
  },
});
