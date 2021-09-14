// import AsyncStorage from '@react-native-async-storage/async-storage';

async function setData(key:string, value:any):Promise<void> {
  const valueAsString:string = JSON.stringify(value);
  // await AsyncStorage.setItem(key, valueAsString);
}

async function getData(key:string):Promise<string> {
  // const item = await AsyncStorage.getItem(key);
  // return item || '';
  return '';
}

const StorageManager = {setData, getData};
export default StorageManager;
