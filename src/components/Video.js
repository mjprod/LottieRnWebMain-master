import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { unstable_createElement } from "react-native-web";


class Video extends Component {
  // Function to create the video element with attributes
  createVideo(attrs) {
    return unstable_createElement("video", {
      ...attrs,
      onEnded: this.props.onEnded, // Trigger the callback when the video ends
    });
  }

  render() {
    const { source , muted = true } = this.props;
    // Video attributes passed to create the video element
    const attrs = {
      //src: require("./../assets/video/win_safari.mp4"), // Ensure the video path is correct
      src: source, // Use the dynamic source passed via props
      autoPlay: true,  // Enable autoplay
      muted: muted,     // Mute the video for autoplay to work on all browsers
      loop: false,     // Ensure the video does not loop, plays only once
      playsInline: true, // Ensure inline playback on mobile
      controls: false,  // Hide controls
      preload: "auto",
      style: {
        objectFit: "contain", // Make sure the video covers the full container while keeping aspect ratio
        width: "100%", // Full width
        height: "100%", // Full height
      },
    };

    return (
      <View style={styles.videoContainer}>
        {/* Render the video element */}
        {this.createVideo(attrs)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    position: "absolute",
    width: "100%",  // Make the video container take the full width
    height: "100%", // Make the video container take the full height
    top: 0,
    left: 0,
  },
});

export default Video;
