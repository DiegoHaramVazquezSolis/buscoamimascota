import AsyncStorage from '@react-native-community/async-storage';

/**
 * Save a given value with the specified key on async storage
 * 
 * @param {string} dataKey Key of the value to save on async storage
 * @param {string} value Value to save on async storage
 */
export async function storeAsyncStorageData(dataKey, value) {
    try {
        await AsyncStorage.setItem(`@bamm_${dataKey}`, value);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Get a value from async storage based on the key of that value
 * 
 * @param {string} dataKey Key of the async storage data to find
 */
export async function getAsyncStorageData(dataKey) {
    try {
        return await AsyncStorage.getItem(`@bamm_${dataKey}`);
    } catch(error) {
        console.error(error);
    }
}

/**
 * Remove a specific value from async storage based on the key
 * 
 * @param {string} dataKey Key of the async storage value to remove
 */
export async function removeAsyncStorageData(dataKey) {
    try {
        await AsyncStorage.removeItem(`@bamm_${dataKey}`);
    } catch(error) {
        console.error(error);
    }
}