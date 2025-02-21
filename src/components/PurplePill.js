import React from "react";
import { Text, View, StyleSheet } from "react-native";

const PurplePill = ({ text, style }) => {
  return (
    <Text style={{ ...styles.betaCompetitionText, ...style }}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  betaCompetitionText: {
    fontFamily: "Teko-Medium",
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 2,
    backgroundColor: "#523069",
    borderRadius: 25,
    borderColor: "#7F48A7",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    letterSpacing: 1,
  },
});

export default PurplePill;
