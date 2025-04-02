import React from "react";
import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";
import TimerComponent from "./TimerComponent";
import AssetPack from "../util/AssetsPack";
import LottieView from "react-native-web-lottie";
import PurplePill from "./PurplePill";
import { Dimentions, Fonts } from "../util/constants";

const NextDrawCard = ({ style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Image
        style={{ width: 145, height: 46 }}
        source={AssetPack.logos.TURBO_SCRATCH} />
      <Text style={{ color: "#fff", fontSize: 28, fontFamily: Fonts.TekoMedium, textTransform: 'uppercase' }}>
        Win Amazon Gift Cards
      </Text>
      <Text style={{ color: "#FFFFFFCC", fontSize: 16, fontFamily: Fonts.InterMedium }}>
        Scratch for more chances to win!
      </Text>
      <TimerComponent />
      <LottieView
        style={{ position: "absolute", top: 0, left: 0 }}
        source={AssetPack.lotties.CONFETTI}
        speed={1}
        loop={true}
        autoPlay={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    overflow: "hidden",
    backgroundColor: "#171717",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: Dimentions.marginL
  },
  topSection: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
});

export default NextDrawCard;
