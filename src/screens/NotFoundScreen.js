// NotFoundScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NotFoundScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Not Found</Text>
      <Text style={styles.message}>
        Send your ID / Username.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NotFoundScreen;