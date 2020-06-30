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
import {useAsyncStorageList} from 'shared/hooks/useAsyncStorageList';

type ContactListProps = {
  route: RouteProp<AuthRootStackParams, 'ContactsList'>;
  navigation: StackNavigationProp<AuthRootStackParams, 'ContactsList'>;
};

export const ContactList: React.FC<ContactListProps> = ({
  navigation,
  route,
}) => {
  const addContactModal = useModal();
  const contacts = useAsyncStorageList<Contact>('contacts');

  useHeaderIcon({
    onPress: addContactModal.open,
  });

  useEffect(() => {
    contacts.get();
  }, []);

  async function handleAddModalSubmit(contact: Contact) {
    await contacts.add(contact);
    addContactModal.close();
  }

  function selectContact(address: string) {
    navigation.navigate('SetFeeDestinationToSend', {
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
            <DeleteItemCard onDelete={() => contacts.delete(item, 'address')} />
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
