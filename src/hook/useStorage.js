import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

const useStorage = () => {
    const saveData = async (key, value) => {
        if (isWeb) {
            window.localStorage.setItem(key, value);
        }
    };

    const loadData = async (key) => {
        if (isWeb) {
            const value = window.localStorage.getItem(key);
            return value;
        }
    };

    const removeData = async (key) => {
        if (isWeb) {
            window.localStorage.removeItem(key);
        }
    };

    return {
        saveData,
        loadData,
        removeData,
    };
};

export default useStorage;