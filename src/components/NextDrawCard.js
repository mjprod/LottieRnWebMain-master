import React from "react";
import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";
import TimerComponent from "./TimerComponent";
import AssetPack from "../util/AssetsPack";

const NextDrawCard = ({ days, hours, minutes, seconds }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1, flexDirection: "column", justifyContent: "space-between"}}
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
            <Text
              style={{
                fontFamily: "Inter-Bold",
                color: "white",
                fontSize: 14,
                textTransform: "uppercase",
                fontWeight: "bold",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 2,
                backgroundColor: "#523069",
                borderRadius: 25,
                borderColor: "#7F48A7",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              Beta Competition
            </Text>
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
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </View>
      </ImageBackground>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
