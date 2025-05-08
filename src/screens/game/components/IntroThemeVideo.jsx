import React, { } from "react";
import { View, StyleSheet, Platform, Pressable } from "react-native";
import Video from "../../../components/Video";
import { useTheme } from "../../../hook/useTheme";
import { useSound } from "../../../hook/useSoundPlayer";
import AssetPack from "../../../util/AssetsPack";
import { Colors, isAndroidWebView, isChromeBrowser } from "../../../util/constants";

const IntroThemeVideo = ({ handleVideoEnd, style }) => {

  const { introThemeNext, introChromeThemeNext } = useTheme();
  const { isSoundEnabled } = useSound();

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
      {isChromeBrowser ? <Video
        source={
          introChromeThemeNext
        } // Play the win video
        muted={!isSoundEnabled}
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
        poster={AssetPack.images.BLANK}
      /> : <Video
        source={
          isAndroidWebView ? introChromeThemeNext : introThemeNext
        } // Play the win video
        muted={!isSoundEnabled}
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
        poster={AssetPack.images.BLANK}
      />}
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
        backgroundColor: Colors.jokerBlack90070,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.jokerBlack90070,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: Colors.transparent,
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
