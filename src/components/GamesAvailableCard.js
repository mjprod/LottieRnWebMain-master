import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import AssetPack from "../util/AssetsPack";
import { Fonts } from "../util/constants";

const GamesAvailableCard = ({
  cardsLeft = 0,
  style,
}) => {
  return (
    <View style={{ ...styles.backgroundRounded, ...style }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8 }}>
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
    borderColor: "#ADADAD33",
    backgroundColor: "#131313",
    borderWidth: 1,
    borderRadius: 12
  },
  gamesAvailableText: {
    fontFamily: Fonts.InterRegular,
    fontSize: 18,
    paddingTop: 2,
    color: "#fff",
  },
  valueText: {
    fontFamily: Fonts.TekoRegular,
    fontSize: 30,
    marginTop: -15,
    marginBottom: -20,
    color: "#FFDEA8",
  },
});

export default GamesAvailableCard;
