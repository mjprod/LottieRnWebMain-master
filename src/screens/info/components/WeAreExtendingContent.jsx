import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import { Fonts } from "../../../util/constants";

const WeAreExtendingContent = () => {

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 175, height: 46, marginBottom: 20, marginTop: -30 }}
        source={AssetPack.logos.TURBO_SCRATCH} />
      <Text style={styles.text}>
        We’ve added 1 week to the playtime and opportunity to win more gift cards. As a thank you we have also given you 2 FREE tickets entries into this week’s draw.
      </Text>
      <Image style={{ width: "100%", height: 200, marginBottom: 20, marginTop: 30}} resizeMode='contain' source={AssetPack.images.EXTENDING_PLAY} />
      
      <View style={styles.roundedTextContainer}>
        <Text style={styles.roundedText}>7 Day Extension</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  text: {
    color: "#A6A6A6",
    fontFamily: Fonts.InterRegular,
    textAlign: "center",
    fontSize: 16,
  },
  roundedTextContainer: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717",
    borderColor: "#D6BC9E",
    borderWidth: 1.5,
    paddingHorizontal: 35.5,
    paddingVertical: 15,
    borderRadius: 30,
    boxShadow: "1px 2px 3.84px 0 rgba(255, 222, 168, 0.25)",
    elevation: 5,
  },
  roundedText: {
    color: "#FFDEA8",
    fontSize: 16,
    fontFamily: Fonts.InterRegular,
  }
});

export default WeAreExtendingContent;
