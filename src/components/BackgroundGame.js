import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import AlphaView from "./AlphaView";
import TopBannerNav from "./TopBannerNav";
import LinearGradient from "react-native-web-linear-gradient";
import { Colors } from "../util/constants";
export const BackgroundGame = ({ source, showAlphaView }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      videoRef.current.setAttribute('webkit-playsinline', 'true');
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Autoplay failed:", error);
        });
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <TopBannerNav hasBackButton title={"Scratch To Win!"} subtitle={"Your next prize awaits."} blur />
      <View style={styles.videoContainer}>
        <video
          ref={videoRef}
          src={source}
          style={styles.video}
          loop={true}
          autoPlay={true}
          controls={false}
          muted={false}
          playsInline={true}
        />
        <LinearGradient
          colors={[Colors.background, Colors.background, Colors.transparent, Colors.transparent]}
          locations={[0, 0.40, 0.9, 1]}
          style={{ flex: 1, width: "100%", height: "100%" }} />
      </View>
      <AlphaView showAlphaView={showAlphaView} />
    </View >
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
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
  video: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.3,
    flex: 1,
    objectFit: "cover",
  },
});

export default BackgroundGame;
