import React from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform, Pressable } from "react-native";
import Video from "../../../components/Video";
import AssetPack from "../../../util/AssetsPack";
import { Colors, isAndroidWebView, isChromeBrowser } from "../../../util/constants";

WinLuckySymbolView.propTypes = {
  videoRef: PropTypes.any,
  style: PropTypes.object,
  onSkipClicked: PropTypes.func.isRequired,
  onVideoEnd: PropTypes.func.isRequired,
};

export default function WinLuckySymbolView({ videoRef, style, onSkipClicked, onVideoEnd }) {
  return (
    <View
      key="overlay"
      style={{
        ...style,
        ...styles.blackOverlayWin,
        flex: 1,
        zIndex: 9999,
        elevation: 10,
        alignContent: "flex-end",
      }}
    >
      {isChromeBrowser ? <Video
        ref={videoRef}
        source={AssetPack.videos.WIN_LUCKY_SYMBOL_CHROME}
        style={styles.transparentVideo}
        onEnd={onVideoEnd}
        onEnded={onVideoEnd}
      /> : <Video
        ref={videoRef}
        source={isAndroidWebView ? AssetPack.videos.WIN_LUCKY_SYMBOL_CHROME : AssetPack.videos.WIN_LUCKY_SYMBOL}
        style={styles.transparentVideo}
        onEnd={onVideoEnd}
        onEnded={onVideoEnd}
      />
      }
      <Pressable style={styles.clickableArea} onPress={onSkipClicked}>
        <View style={styles.transparentOverlay} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  transparentVideo: {
    width: 300,
    height: 300,
    objectFit: "contain",
    resizeMode: "contain",
  },
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
  clickableArea: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
});
