import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const TimerComponent = ({ text, handlePress, style }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontWeight: 500,
    fontSize: 14,
    color: "#A6A6A6",
    textDecorationLine: "underline",
  },
});

export default TimerComponent;
