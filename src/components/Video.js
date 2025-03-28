import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { unstable_createElement } from "react-native-web";

const Video = forwardRef(({ source, muted = false, onEnded, style, containerStyles, seekTime }, ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    seekToTime: (time) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    }
  }));

  const handleLoadedMetadata = (e) => {
    if (seekTime !== undefined) {
      e.target.currentTime = seekTime;
    }
  };

  const attrs = {
    src: source,
    autoPlay: true,
    muted,
    loop: false,
    playsInline: true,
    controls: false,
    preload: "auto",
    onEnded,
    onLoadedMetadata: handleLoadedMetadata,
    style: style,
    ref: videoRef
  };

  return (
    <View style={[styles.videoContainer, containerStyles]}>
      {unstable_createElement("video", attrs)}
    </View>
  );
});

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});

export default Video;
