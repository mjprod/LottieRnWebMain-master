import React from "react";
import {View, StyleSheet} from "react-native";

export const VideoBackground = ({ source }) => {
  return (
    <View style={styles.container}>
      <video
        src={source}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        loop
        autoPlay
        muted
        playsInline
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    position: "relative",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
