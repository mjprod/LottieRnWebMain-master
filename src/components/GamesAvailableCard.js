import React from "react";
import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";
import AssetPack from "../util/AssetsPack";
import DiagonalGradientCard from "../components/DiagonalGradientCard";

const GamesAvailableCard = ({
  cardsLeft = 0,
  style,
}) => {
  return (
    <DiagonalGradientCard
      style={{ ...styles.backgroundRounded, ...style }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8 }}>
        <Image
          style={{ width: 22.25, height: 17 }}
          source={AssetPack.icons.CARDS} />
        <Text style={styles.gamesAvailableText}>Cards Available</Text>
      </View>
      <View>
        <Text style={styles.valueText}>
          {cardsLeft} CARDS
        </Text>
      </View>
    </DiagonalGradientCard>
  );
};

const styles = StyleSheet.create({
  backgroundRounded: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
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
