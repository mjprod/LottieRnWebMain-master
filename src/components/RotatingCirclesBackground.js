import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing, Platform } from "react-native";

const RotatingCirclesBackground = ({ style, children }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      rotation.setValue(0); // Reset animation value to 0 before starting
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => {
        startAnimation(); // Restart animation when it finishes
      });
    };
    startAnimation();
  }, [rotation]);

  const planetStyle1 = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
      { translateX: 280 },
    ],
  };

  const planetStyle2 = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "540deg"],
        }),
      },
      { translateX: 240 },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.container, ...style }}>
        <Animated.View style={[styles.planet, styles.planet1, planetStyle1]} />
        <Animated.View style={[styles.planet, styles.planet2, planetStyle2]} />
        <div
          style={{
            backdropFilter: `blur(${100}px)`,
            WebkitBackdropFilter: `blur(${100}px)`,
            position: "absolute",
            top: 0,
            left: -500,
            right: 0,
            bottom: 0,
            width: 1200,
            height: 1200,
          }}
        />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  blurView: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  planet: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  planet1: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  planet2: {
    backgroundColor: "rgba(220, 80, 5, 0.2)",
  },
});

export default RotatingCirclesBackground;
