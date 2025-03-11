import React from "react";
import { useNavigate } from "react-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import AssetPack from "../util/AssetsPack";
import GameButton from "../components/GameButton";

const NotFoundScreen = () => {
  const navigate = useNavigate();
  return (
    <ImageBackground
      source={AssetPack.backgrounds.BLUE_BACKGROUND_CARD}
      style={styles.rotatingBackgroundContainer}
    >
      <RotatingCirclesBackground style={{ paddingVertical: "20%" }}>
        <Image
          source={AssetPack.images.PHAROAH}
          style={{ width: 250, height: 200, marginBottom: -100, zIndex: 10 }}
        />
        <ImageBackground
          blurRadius={10}
          resizeMode="cover"
          source={AssetPack.backgrounds.GOLD_RUSH}
          style={{
            flex: 1,
            justifyContent: "stretch",
            backgroundColor: "#000",
            overflow: "hidden",
            borderColor: "#FFEEC0",
            borderWidth: 1,
            borderRadius: 12,
            marginHorizontal: 35,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "#00000099",
              height: "100%",
              paddingTop: 80,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 175, height: 46, marginBottom: 20 }}
              source={AssetPack.logos.TURBO_SCRATCH}
            />
            <Image
              style={{
                padding: 35,
                width: "100%",
                height: 120,
                marginBottom: 35,
              }}
              source={AssetPack.icons.ICON_404}
              resizeMode="center"
            />
            <Text style={styles.message}>
              Looks like you’ve scratched the wrong spot! This page doesn’t
              exist!
            </Text>
          </View>
        </ImageBackground>
        <GameButton
          style={{ paddingHorizontal: 35, width: "100%" }}
          text="TAKE ME BACK"
          onPress={() => {
            navigate("/daily");
          }}
        />
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
