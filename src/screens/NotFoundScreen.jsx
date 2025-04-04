import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import AssetPack from "../util/AssetsPack";
import GameButton from "../components/GameButton";
import { Dimentions } from "../util/constants";

const NotFoundScreen = () => {
  return (
    <ImageBackground
      source={AssetPack.backgrounds.SCRACHIE}
      style={styles.rotatingBackgroundContainer}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Image
          style={{ width: 175, height: 46, marginBottom: 20 }}
          source={AssetPack.logos.TURBO_SCRATCH} />
        <Image
          style={{
            padding: 35,
            width: 269,
            height: 120,
            marginBottom: 35,
          }}
          source={AssetPack.icons.ICON_404}
          resizeMode="center"
        />
        <Text style={styles.message}>
          Looks like you’ve scratched the wrong spot! This page doesn’t exist!
        </Text>
      </View>
      <GameButton
        style={{ width: "100%", marginBottom: Dimentions.marginXL }}
        text="TAKE ME BACK"
        onPress={() => { }} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rotatingBackgroundContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  message: {
    fontFamily: "Inter-SemiBold",
    color: "#FFEEC0",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 35,
  },
});

export default NotFoundScreen;
