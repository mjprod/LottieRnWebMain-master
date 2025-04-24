import React, { createContext, useCallback, useContext, useState } from 'react';
import CustomSnackbar from './CustomSnackbar';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    duration: 4000,
  });

  const showSnackbar = useCallback((message, duration = 4000) => {
    setSnackbar({ visible: true, message, duration });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <CustomSnackbar
        message={snackbar.message}
        visible={snackbar.visible}
        duration={snackbar.duration}
        onDismiss={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};