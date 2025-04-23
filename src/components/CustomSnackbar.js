import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../util/constants';

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
    borderColor: Colors.jokerBlack200,
    borderWidth: 1,
    boxShadowColor: Colors.jokerGold400,
    backgroundColor: "#000000C7",
    backdropFilter: `blur(10px)`,
    WebkitBackdropFilter: `blur(10px)`,
    boxShadowOpacity: 0.3,
    boxShadowRadius: 4,
    boxShadowOffset: { width: 0, height: 2 },
  },
  snackbarText: {
    fontFamily: Fonts.InterRegular,
    color: Colors.jokerWhite50,
    lineHeight: "150%",
    fontSize: 12,
    flex: 1,
  },
  dismissText: {
    color: Colors.jokerWhite50,
    fontFamily: Fonts.InterSemiBold,
    marginLeft: 12,
  },
});

export default CustomSnackbar;