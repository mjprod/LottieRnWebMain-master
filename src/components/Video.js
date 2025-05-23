import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { unstable_createElement } from "react-native-web";
import AssetPack from "../util/AssetsPack";

const Video = forwardRef(({ source, muted = false, onEnded, style, containerStyles, seekTime, loop = false, poster = AssetPack.images.BLANK, autoPlay = true }, ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    seekToTime: (time) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    play: () => {
      console.log("Play Play Play");
      if (videoRef.current) {
        return videoRef.current.play();
      }
    },
    pause: () => {
      if (videoRef.current) {
        return videoRef.current.pause();
      }
    },
    videoElement: videoRef.current,
  }));

  const handleLoadedMetadata = (e) => {
    if (seekTime !== undefined) {
      e.target.currentTime = seekTime;
    }
  };

  const attrs = {
    src: source,
    autoPlay: autoPlay,
    muted: muted,
    loop: loop,
    playsInline: true,
    controls: false,
    preload: "auto",
    poster: poster,
    onEnded,
    onLoadedMetadata: handleLoadedMetadata,
    style: style,
    'webkit-playsinline': 'true',
    ref: videoRef,
  };

  return (
    <View style={[styles.videoContainer, containerStyles]}>
      {unstable_createElement("video", attrs)}
    </View>
  );
});

Video.displayName = "Video";

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
