import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { VideoBackground } from "../components/VideoBackground";
import TopLayout from "../components/TopLayout";
import ScratchLayout from "../components/ScratchLayout";
import NavLayout from "../components/NavLayout";

const backgroundLoop = require("./../assets/video/background_movie_loop.mp4");
const backgroundGame = require("./../assets/image/background_game.png");

const ScratchLuckyGame = () => {
  return (
    <View style={styles.fullScreen}>
      <VideoBackground source={backgroundLoop} />
      <View style={styles.containerOverlay}>
        <NavLayout />

        <ImageBackground
          source={backgroundGame}
          style={styles.imageBackground}
          resizeMode="stretch"
        >
          {
            <View style={styles.overlay}>
              <TopLayout />
            </View>
          }
          {<ScratchLayout />}
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    position: "relative",
  },
  containerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  imageBackground: {
    flex: 1,
    margin: 10,
    position: "absolute",
    top: 220,
    left: 10,
    right: 10,
    bottom: 10,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1, // Ocupar todo o espaço disponível no ImageBackground
    width: "100%",
    height: "100%",
    //justifyContent: 'center',
    //alignItems: 'center',
  },
});

export default ScratchLuckyGame;
