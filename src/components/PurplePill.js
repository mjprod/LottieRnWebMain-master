import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../util/constants";

const PurplePill = ({ text, style }) => {
  return (
    <View style={{ ...styles.background, ...style }}>
      <Text style={{ ...styles.betaCompetitionText }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    borderRadius: 63,
    borderColor: "#FFDEA8",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 17,
    backgroundColor: "#00000033"
  },
  betaCompetitionText: {
    fontFamily: Fonts.InterRegular,
    color: "white",
    fontSize: 14,
  },
});

export default PurplePill;
