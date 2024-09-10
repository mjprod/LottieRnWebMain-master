import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import AlphaView from "./AlphaView";
import NavLayout from "./NavLayout";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const BackgroundGame = ({ source, showAlphaView }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay failed:", error);
        });
      }
    }
  }, []);

  const isMobile = screenWidth < 768;

  return (
    <View style={isMobile ? styles.containerMobile : styles.container}>
      {/* NavLayout */}
      <NavLayout showAlphaView={showAlphaView} />

      {/* Video */}
      <View style={styles.videoContainer}>
        <video
          ref={videoRef}
          src={source}
          style={styles.video}
          loop
          autoPlay
          muted
          playsInline
        />
      </View>

      <AlphaView showAlphaView={showAlphaView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  containerMobile: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    padding: 0,
    margin: 0,
  },
  videoContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export default BackgroundGame;
