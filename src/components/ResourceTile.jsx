import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import AssetPack from "../util/AssetsPack";
import { Colors, Dimentions, Fonts } from "../util/constants";

const ResourceTile = ({
  title = "Cards available",
  icon = AssetPack.icons.CARDS,
  number = 0,
  style,
}) => {
  return (
    <View style={{ ...styles.backgroundRounded, ...style }}>
      <View style={styles.leftContainer}>
        <Image
          style={{ width: 24, height: 20, marginTop: 2 }}
          resizeMode="contain"
          source={icon} />
        <Text style={styles.gamesAvailableText}>{title}</Text>
      </View>
      <View style={{ width: 1, backgroundColor: Colors.jokerBlack200, height: "100%" }} />
      <View style={styles.rightContainer}>
        <Text style={styles.valueText}>
          {number}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundRounded: {
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    borderColor: Colors.jokerBlack200,
    backgroundColor: Colors.jokerBlack800,
    borderWidth: 1,
    borderRadius: 8,
    padding: Dimentions.innerCardPadding,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  rightContainer: {
  },
  gamesAvailableText: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 16,
    paddingTop: 2,
    color: Colors.jokerWhite50,
  },
  valueText: {
    fontFamily: Fonts.TekoMedium,
    fontSize: 30,
    marginTop: -15,
    marginBottom: -20,
    color: Colors.jokerGold400,
  },
});

export default ResourceTile;
