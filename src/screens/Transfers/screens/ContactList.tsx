import React, {useState, useEffect} from 'react';
import {
  Text,
  ScreenContainer,
  Label as BaseLabel,
  Input,
} from 'shared/styled-components';
import styled from 'styled-components/native';
import {colors} from 'shared/styles';
import {TouchableOpacity, TouchableHighlight, StyleSheet} from 'react-native';
import {Button} from 'shared/components/Button';
import BaseIcon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import {Modal, EmptyState} from 'shared/components';
import {useGlobalState} from 'globalState';
import FIcon from 'react-native-vector-icons/Feather';
import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {ScanScreen} from 'shared/components/QrReader';
import {AuthRootStackParams} from 'Router';
import {StackNavigationProp} from '@react-navigation/stack';
import {EmptyContactList} from '../components/EmptyContactList';
import {AddContactModal} from '../components/AddContactModal';
import {useModal} from 'shared/hooks';
import {Contact} from 'shared/types/interfaces';

type ContactListProps = {
  route: RouteProp<AuthRootStackParams, 'ContactsList'>;
  navigation: StackNavigationProp<AuthRootStackParams, 'ContactsList'>;
};

export const ContactList: React.FC<ContactListProps> = ({
  navigation,
  route,
}) => {
  const addContactModal = useModal();
  const [contactsQuantity, setContactsQuantity] = useGlobalState(
    'contactsQuantity',
  );

  const [listAddress, setListAddress] = useState<Contact[]>([]);

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
    //bug solution for what ???
    async function cleanList() {
      const tempArray = listAddress.filter(data => data.index !== -1 && data);
      setListAddress(tempArray);
      setContactsQuantity(0);
      await AsyncStorage.setItem('contacts', JSON.stringify(tempArray));
    }
    getAddress();
  }, []);

  async function handleAddModalSubmit(contact: Contact) {
    setListAddress([contact, ...listAddress]);
    addContactModal.close();
    await AsyncStorage.setItem('contacts', JSON.stringify(listAddress));
  }

  //move to validations file
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

  const deleteAddress = async ({item}) => {
    const tempArray = listAddress.filter(
      data => data.index !== item.index && data,
    );
    setListAddress(tempArray);
    await AsyncStorage.setItem('contacts', JSON.stringify(tempArray));
  };

  return (
    <ScreenContainer>
      <ListContent>
        {listAddress.length > 0 && (
          <Subtitle>Swipe elements to remove</Subtitle>
        )}
        <SwipeListView
          data={listAddress}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={() => (
            <EmptyContactList
              onAddContactPress={() => addContactModal.open()}
            />
          )}
          renderItem={(data, rowMap) => (
            <TouchableHighlight
              id={rowMap}
              onPress={() => {
                navigation.goBack();
              }}
              underlayColor={colors.lightGray}
              style={{
                alignItems: 'center',
                backgroundColor: 'blue',
                borderRadius: 5,
                height: 100,
                marginTop: 40,
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
  },
});

const Icon = styled(BaseIcon)``;
const ListContent = styled.View`
  width: 100%;
  flex: 1;
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
