import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import AssetPack from "../util/AssetsPack";
import { Colors, Fonts } from "../util/constants";

const GamesAvailableCard = ({
  cardsLeft = 0,
  style,
}) => {
  return (
    <View style={{ ...styles.backgroundRounded, ...style }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8, }}>
        <Image
          style={{ width: 21, height: 16, marginTop: 2 }}
          source={AssetPack.icons.CARDS} />
        <Text style={styles.gamesAvailableText}>Cards available</Text>
      </View>
      <View>
        <Text style={styles.valueText}>
          {cardsLeft} CARDS
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundRounded: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 24,
    borderColor: Colors.jokerGold400,
    backgroundColor: Colors.jokerGold1000,
    borderWidth: 1,
    borderRadius: 8
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

export default GamesAvailableCard;
