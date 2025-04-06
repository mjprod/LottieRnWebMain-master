import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AlphaView from "./AlphaView";
import TopBannerNav from "./TopBannerNav";

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

  return (
    <View style={styles.container}>
      <TopBannerNav hasBackButton />

      <View style={styles.videoContainer}>
        <video
          ref={videoRef}
          src={source}
          style={styles.video}
          loop={true}
          autoPlay={true}
          controls={false}
          muted={false}
          allowsInlineMediaPlayback={true}
          playsInline={true}
          webkit-playsinline={true}
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
    width: "100%",
    height: "100%",
    backgroundColor: "#242424",
  },
  videoContainer: {
    flex: 1,
    maxHeight: 200,
  },
  video: {
    flex: 1,
    objectFit: "cover",
  },
});

export default BackgroundGame;
