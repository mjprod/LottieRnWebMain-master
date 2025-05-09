import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const storageKeys = {
  soundEnabled: "soundEnabled",
};

const useStorage = () => {
  const saveData = (key, value) => {
    if (isWeb) {
      window.localStorage.setItem(key, value);
    }
  };

  const loadData = (key) => {
    if (isWeb) {
      const value = window.localStorage.getItem(key);
      return value;
    }
  };

  const removeData = (key) => {
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