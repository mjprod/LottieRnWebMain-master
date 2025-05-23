import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "../util/constants";

const PurplePill = ({ text = "Beta Competition", style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.frostedGlass}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000033',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  frostedGlass: {
    fontFamily: Fonts.InterSemiBold,
    borderRadius: 100,
    borderColor: '#FFDEA8',
    borderWidth: 1,
    lineHeight: "150%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  text: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 16,
    color: Colors.jokerWhite50,
  },
});

export default PurplePill;
