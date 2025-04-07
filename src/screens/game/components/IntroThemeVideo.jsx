import React, { } from "react";
import { View, StyleSheet, Platform, Pressable } from "react-native";
import Video from "../../../components/Video";
import BrowserDetection from "react-browser-detection";
import { useTheme } from "../../../hook/useTheme";
import { useSound } from "../../../hook/useSoundPlayer";
import { isAndroidWebView } from "../../../util/Helpers";

const IntroThemeVideo = ({ handleVideoEnd, style }) => {

  const { introThemeNext, introChromeThemeNext } = useTheme();
  const { isSoundEnabled } = useSound();

  const browserHandler = {
    chrome: () => (
      <Video
        source={
          introChromeThemeNext
        } // Play the win video
        muted={!isSoundEnabled}
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
    default: (browser) => (
      <Video
        source={
          isAndroidWebView() ? introChromeThemeNext : introThemeNext
        } // Play the win video
        muted={isSoundEnabled}
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
  };

  return (
    <Pressable
      onPress={handleVideoEnd}
      key="overlay"
      style={{
        ...style,
        ...styles.blackOverlayWin,
        flex: 1,
        zIndex: 9999,
        elevation: 10,
      }}
    >
      <BrowserDetection>{browserHandler}</BrowserDetection>
      <View style={styles.transparentOverlay} />
    </Pressable>
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
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
      },
    }),
  },
});

export default IntroThemeVideo;
