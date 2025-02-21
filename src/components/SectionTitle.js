import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Image, View, Text } from "react-native-web";

const SectionTitle = ({ style }) => {
  return <Text style={{ ...styles.text, ...style }}>LeaderBoard</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Teko-Medium",
    fontSize: 24,
    color: "#fff",
    textTransform: "uppercase",
  },
});

export default SectionTitle;
