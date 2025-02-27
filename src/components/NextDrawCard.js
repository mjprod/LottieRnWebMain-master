import React from "react";
import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";
import TimerComponent from "./TimerComponent";
import AssetPack from "../util/AssetsPack";
import LottieView from "react-native-web-lottie";
import PurplePill from "./PurplePill";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
const NextDrawCard = ({style }) => {
  const [timeLeft] = useTimeLeftForNextDraw();
  return (
    <View style={{ ...styles.container, ...style }}>
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        resizeMode="stretch"
        source={AssetPack.backgrounds.NEXT_DRAW_CARD}
      >
        <View style={styles.topSection}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            <PurplePill text={"Beta Competition"} />
          </View>

          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Win Amazon Gift Cards
          </Text>
          <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
            Scratch for more chances to win!
          </Text>
        </View>
        <View style={styles.bottomSection}>
          <Image
            style={{ width: 145, height: 46 }}
            source={AssetPack.logos.TURBO_SCRATCH}
          />
          <TimerComponent
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
          />
        </View>
        <LottieView
          style={{ position: "absolute", top: 0, left: 0 }}
          source={AssetPack.lotties.CONFETTI}
          speed={1}
          loop={true}
          autoPlay={true}
        />
      </ImageBackground>
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
  },
  topSection: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
