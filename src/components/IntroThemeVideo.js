import React, {  } from "react";
import { View, StyleSheet,Platform } from "react-native";
import Video from "./Video";
import BrowserDetection from "react-browser-detection";
import { useTheme } from "../hook/useTheme";

const IntroThemeVideo = ({ handleVideoEnd }) => {

  const { introThemeNext } = useTheme();

  const browserHandler = {
    chrome: () => (
      <Video
        source={
          introThemeNext
        } // Play the win video
        muted = {false} 
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
    default: (browser) => (
      <Video
        source={
          introThemeNext
        } // Play the win video
         muted = {false} 
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
  };


  return (
    <View
    key="overlay"
    style={{
      ...styles.blackOverlayWin,
      flex: 1,
      zIndex: 9999, // Makes sure the overlay is on top of all other elements
      elevation: 10, // Ensures the overlay has proper visual depth on Android
    }}
  >
    <BrowserDetection>{browserHandler}</BrowserDetection>
      <View style={styles.transparentOverlay} />
  </View>
  );
};

const styles = StyleSheet.create({
  blackOverlayWin: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for win screen
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Same semi-transparent background for mobile
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  transparentVideo: {
    ...Platform.select({
      web: {
        width: "100vw", // Full viewport width for web
        height: "100vh", // Full viewport height for web
        objectFit: "cover", // Makes sure the video scales proportionally on web
      },
      default: {
        ...StyleSheet.absoluteFillObject, // For mobile, full-screen video scaling
        resizeMode: "cover",
      },
    }),
  },
});

export default IntroThemeVideo;
