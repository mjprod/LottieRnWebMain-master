import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-web";

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
          <Text style={styles.viewAllText}>{`${viewAllText} >`}</Text>
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
    marginBottom: 10,
  },
  text: {
    fontFamily: "Teko-Medium",
    fontSize: 24,
    color: "#fff",
    textTransform: "uppercase",
  },
  viewAllText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#D6BC9E",
  },
});

export default SectionTitle;
