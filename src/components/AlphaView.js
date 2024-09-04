import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";

const AlphaView = ({ showAlphaView }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showAlphaView ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showAlphaView]);

  return (
    <Animated.View
      style={[
        styles.containerNav,
        {
          opacity: fadeAnim,
          backgroundColor: "rgba(0,0,0,0.7)",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  containerNav: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default AlphaView;
