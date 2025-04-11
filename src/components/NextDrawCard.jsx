import React from "react";
import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";
import TimerComponent from "./TimerComponent";
import AssetPack from "../util/AssetsPack";
import LottieView from "react-native-web-lottie";
import PurplePill from "./BetaCompetitionPill";
import { Colors, Dimentions, Fonts } from "../util/constants";

const NextDrawCard = ({ style }) => {
  return (
    <ImageBackground style={{ ...styles.imageContainer, ...style }} source={AssetPack.backgrounds.GOLD_SACK} blurRadius={6}>
      <View style={styles.container}>
        <Image
          style={{ width: 145, height: 46 }}
          source={AssetPack.logos.TURBO_SCRATCH} />
        <View style={{ marginTop: Dimentions.marginS, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.jokerWhite50, fontSize: 30, fontFamily: Fonts.TekoMedium, textTransform: 'uppercase' }}>
            Win Amazon Gift Cards
          </Text>
          <Text style={{ color: Colors.jokerBlack50, fontSize: 16, fontFamily: Fonts.InterMedium, marginBottom: Dimentions.marginM}}>
            Scratch for more chances to win!
          </Text>
        </View>
        <TimerComponent />
        <LottieView
          style={{ position: "absolute", top: 0, left: 0 }}
          source={AssetPack.lotties.CONFETTI}
          speed={1}
          loop={true}
          autoPlay={true} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000004D",
    padding: Dimentions.marginL,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.jokerBlack200,
    overflow: "hidden",
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
