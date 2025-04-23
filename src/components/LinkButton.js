import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "../util/constants";

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
    fontFamily: Fonts.InterRegular,
    fontSize: 16,
    color: Colors.jokerBlack50,
    textDecorationLine: "underline",
  },
});

export default TimerComponent;
