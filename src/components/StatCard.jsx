import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import { Colors, Dimentions, Fonts } from "../util/constants";

const StatCard = ({ title = "Title", titleIcon = <IconStarResultScreen />, stat = "0", children }) => {
  return (<View style={styles.card}>
    <View style={styles.viewRow}>
      <View style={styles.viewIcon}>{titleIcon}</View>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={{ borderBottomWidth: 1, width: "100%", borderColor: Colors.jokerBlack200, marginVertical: Dimentions.marginS }} />
    {!children ? <Text style={styles.statText}>{stat}</Text> : children}
  </View>);
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #3D3D3D",
    borderRadius: 8,
    backgroundColor: "#131313",
    padding: Dimentions.innerCardPadding,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewIcon: {
    marginTop: 2,
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InterSemiBold,
    color: Colors.jokerWhite50,
    marginLeft: 8,
  },
  statText: {
    fontFamily: Fonts.TekoMedium,
    fontSize: 38,
    color: Colors.jokerGold400,
    margin: -5,
  },
});

export default StatCard;