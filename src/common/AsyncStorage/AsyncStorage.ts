import AsyncStorage from '@react-native-async-storage/async-storage';

async function setData(key:string, value:any):Promise<void> {
  const valueAsString:string = JSON.stringify(value);
  await AsyncStorage.setItem(key, valueAsString);
}

async function getData(key:string):Promise<string|null> {
  return await AsyncStorage.getItem(key);
}

const StorageManager = {setData, getData};
export default StorageManager;
