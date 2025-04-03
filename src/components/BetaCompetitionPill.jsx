import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../util/constants";

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
  },
  frostedGlass: {
    fontFamily: Fonts.InterMedium,
    borderRadius: 63,
    borderColor: '#FFDEA8',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
});

export default PurplePill;
