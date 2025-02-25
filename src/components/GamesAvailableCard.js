import React from "react";
import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";
import AssetPack from "../util/AssetsPack";

const GamesAvailableCard = ({
  numberOfSets,
  numberOfCardsInSet = 12,
  style,
}) => {
  return (
    <ImageBackground
      style={{ ...styles.backgroundRounded, ...style }}
      source={AssetPack.backgrounds.BLUE_DIAGONAL_GRADIENT}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8 }}
      >
        <Image
          style={{ width: 22.25, height: 17 }}
          source={AssetPack.icons.CARDS}
        />
        <Text style={styles.gamesAvailableText}>Games Available</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.valueText}>
          {numberOfCardsInSet * numberOfSets} ({numberOfSets} set)
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundRounded: {
    flexDirection: "row",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ADADAD33",
  },
  gamesAvailableText: {
    fontFamily: "Teko-Medium",
    fontSize: 16,
    paddingTop: 2,
    color: "#fff",
    textTransform: "uppercase",
  },
  valueText: {
    fontFamily: "Teko-Medium",
    fontSize: 30,
    color: "#FFDEA8",
  },
});

export default GamesAvailableCard;
