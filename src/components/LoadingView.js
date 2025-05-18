import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const LoadingView = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFD89E" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default LoadingView;
