import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocation } from "react-router-dom";
import useAppNavigation from "../../../hook/useAppNavigation";

 const WeAreExtendingContent = () => {
  const location = useLocation();
  const appNavigation = useAppNavigation()

  return (
    <View style={styles.container}>
      <Text>We Are Extending Play Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default WeAreExtendingContent;
