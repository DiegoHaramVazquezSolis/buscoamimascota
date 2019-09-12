import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(dataKey, value) {
    try {
      await AsyncStorage.setItem(`@bamm_${dataKey}`, value);
    } catch (error) {
      console.error(error);
    }
}

export async function getData(dataKey) {
    try {
      return await AsyncStorage.getItem(`@bamm_${dataKey}`);
    } catch(error) {
      console.error(error);
    }
}

export async function removeData(dataKey) {
    try {
      await AsyncStorage.removeItem(`@bamm_${dataKey}`);
    } catch(error) {
      console.error(error);
    }
}