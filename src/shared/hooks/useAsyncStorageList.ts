import { Alert } from "react-native"
import { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export function useAsyncStorageList<T>(name: string) {
    const [list, setList] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
   async function getList() {
    setIsLoading(true);
    asyncStorageErrorHandler(
      async () => {
        const list: T[] = JSON.parse(
          await AsyncStorage.getItem(name),
        );
        setIsLoading(false);
        setList(list || []);
        console.log(list)
      },
      () => setIsLoading(false),
    );
  }
  
  async function addItem(item: T) {
    const updatedList =  list?.length > 0 ? [item, ...list] : [item];
    setList(updatedList);
    setIsLoading(true);
    asyncStorageErrorHandler(
      async () => {
        await AsyncStorage.setItem(name, JSON.stringify(updatedList));
        setIsLoading(false);
      },
      () => setIsLoading(false),
    );
  }

  /**
   * 
   * @param item the item to be removed
   * @param keyToFilter the key of the item to be filter from the list
   */
  async function removeItem(item: T, keyToFilter:string) {
    setIsLoading(true);
    asyncStorageErrorHandler(
      async () => {
        const filteredList = list.filter(
          listItem => listItem[keyToFilter] !== item[keyToFilter],
        );
        setList(filteredList);
        await AsyncStorage.setItem(name, JSON.stringify(filteredList));
        setIsLoading(false);
      },
      () => setIsLoading(false),
    );
  }

  async function editItem(item:T, keyToFilter: string) {
        const updatedList = list.map(listItem =>
            item[keyToFilter] === listItem[keyToFilter] ? {...listItem, ...item} : listItem,
    );
    setList(updatedList);
    await AsyncStorage.setItem(name, JSON.stringify(updatedList));
  }

  return {
    list,
    isLoading,
    get: getList,
    add: addItem,
    delete: removeItem,
    editItem
  };
}





export async function asyncStorageErrorHandler<T>(
  caller: () => Promise<T>,
  onError?: () => void,
) {
  try {
    await caller();
  } catch (error) {
      console.log(error);
    Alert.alert('Error', 'Error reading data', [
      {onPress: caller, text: 'Try again'},
    ]);
    if (onError) {
      onError();
    }
  }
}