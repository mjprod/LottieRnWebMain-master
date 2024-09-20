import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import LottieView from "react-native-web-lottie";

const GameOverScreen = () => {
  const gameLoseScreen = require("./../assets/image/game_lose_screen.png");
  const lottieCatLose = require("./../assets/lotties/lottieCatLose.json");

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.containerLose}>
        
          <LottieView
            style={styles.lottieAnimation}
            source={lottieCatLose}
            autoPlay
            speed={1}
            loop={true}
          />
            <Image
            resizeMode="contain"
            source={gameLoseScreen}
            style={styles.iconLose}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for win screen
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Same semi-transparent background for mobile
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  centeredView: {
    flex: 1, // Takes up the entire container space
    justifyContent: "flex-end", // Vertically center the content
    alignItems: "end", // Horizontally center the content
  },
  gameOverText: {
    color: "#ffffff", // White color for the text
    fontSize: 24, // Optional: Adjust the font size for better visibility
  },
  iconLose: {
    width: "90%",
    height: 250,
    marginTop: -150,
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 250,
    height: 250,
    alignItems: 'center',
  },
  containerLose: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20%',
  },
});

export default GameOverScreen;
