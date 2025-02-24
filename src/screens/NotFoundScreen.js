import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import AssetPack from "../util/AssetsPack";
import GameButton from "../components/GameButton";

const NotFoundScreen = () => {
  return (
    <ImageBackground
      source={AssetPack.backgrounds.BLUE_BACKGROUND_CARD}
      style={styles.rotatingBackgroundContainer}
    >
      <RotatingCirclesBackground>
        <Image
          source={AssetPack.images.PHAROAH}
          style={{ width: 250, height: 200, marginBottom: -100, zIndex: 10 }}
        />
        <View style={styles.container}>
          <Image
            style={{ width: 145, height: 46 }}
            source={AssetPack.logos.TURBO_SCRATCH}
          />
          <Image
            style={{ width: 169, height: 120 }}
            source={AssetPack.icons.ICON_404}
            resizeMode="center"
          />
          <Text style={styles.message}>
            Looks like you’ve scratched the wrong spot! This page doesn’t exist!
          </Text>
        </View>
        <GameButton style={{ paddingHorizontal: 35 }} text="TAKE ME BACK" />
      </RotatingCirclesBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rotatingBackgroundContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  container: {
    paddingTop: 100,
    borderColor: "#FFEEC0",
    borderWidth: 1,
    borderRadius: 12,
    height: "60%",
    marginHorizontal: 35,
    alignItems: "center",
    marginBottom: 30,
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
