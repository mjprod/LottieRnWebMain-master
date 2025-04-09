import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-web";
import { Colors, Fonts } from "../util/constants";

const SectionTitle = ({
  text,
  viewAllText = "View All",
  viewAllAction,
  style,
}) => {
  return (
    <View style={{ ...styles.mainContainer, ...style }}>
      <Text style={{ ...styles.text }}>{text}</Text>
      {viewAllAction && (
        <TouchableOpacity onPress={viewAllAction}>
          <Text style={styles.viewAllText}>{`${viewAllText}`}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginBottom: -10,
    fontFamily: Fonts.TekoMedium,
    fontSize: 24,
    letterSpacing: "4.5%",
    color: Colors.jokerWhite50,
    textTransform: "uppercase",
  },
  viewAllText: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 16,
    textDecorationLine: "underline",
    WebkitTextDecorationLine: "underline",
    color: Colors.jokerGold400,
  },
});

export default SectionTitle;
