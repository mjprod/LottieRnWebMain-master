import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomSnackbar = ({ message, visible, onDismiss, duration = 3000 }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => {
        if (duration !== Infinity) {
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: Platform.OS !== 'web',
            }).start(() => {
              onDismiss && onDismiss();
            });
          }, duration);
        }
      });
    }
  }, [visible, duration, fadeAnim, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.snackbar, { opacity: fadeAnim, zIndex: 9999 }]}>
      <Text style={styles.snackbarText}>{message}</Text>
      <TouchableOpacity
        onPress={() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: Platform.OS !== 'web',
          }).start(() => {
            onDismiss && onDismiss();
          });
        }}
      >
        <Text style={styles.dismissText}>Dismiss</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    elevation: 3,
    boxShadowColor: '#000',
    boxShadowOpacity: 0.3,
    boxShadowRadius: 4,
    boxShadowOffset: { width: 0, height: 2 },
  },
  snackbarText: {
    color: '#fff',
    flex: 1,
  },
  dismissText: {
    color: '#fff',
    marginLeft: 16,
    fontWeight: 'bold',
  },
});

export default CustomSnackbar;