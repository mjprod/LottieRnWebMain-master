import React from "react";
import { Text, StyleSheet } from "react-native";
import { Fonts } from "../util/constants";
import LinearGradient from 'react-native-web-linear-gradient';

const PurplePill = ({ text, style }) => {
  return (
    <LinearGradient colors={["#533166", "#613D7B", "#614176"]}
      locations={[0, 0.50, 1]}
      start={{ x: 0.0, y: 1 }}
      end={{ x: 0.0, y: 1.0 }}
      style={{ ...styles.background, ...style }}>
      <Text style={{ ...styles.betaCompetitionText }}>{text}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    borderRadius: 63,
    borderColor: "#7F48A7",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
  betaCompetitionText: {
    fontFamily: Fonts.InterRegular,
    color: "white",
    fontSize: 14,
  },
});

export default PurplePill;
