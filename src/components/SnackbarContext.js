// SnackbarContext.js
import React, { createContext, useCallback, useContext, useState } from 'react';
import CustomSnackbar from './CustomSnackbar';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  // State to manage the snackbar message and visibility
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    duration: 3000, // default duration
  });

  // Function to show the snackbar
  const showSnackbar = useCallback((message, duration = 3000) => {
    setSnackbar({ visible: true, message, duration });
  }, []);

  // Function to hide the snackbar
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

// Custom hook to use the snackbar context
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};