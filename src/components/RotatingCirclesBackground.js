import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const RotatingCirclesBackground = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      rotation.setValue(0); // Reset animation value to 0 before starting
      Animated.timing(rotation, {
        toValue: 1,
        duration: 24000,
        easing: Easing.linear,
        useNativeDriver: true,
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
      { translateX: 300 },
    ],
  };

  const planetStyle2 = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "540deg"], // Offset by 180 degrees
        }),
      },
      { translateX: 300 },
    ],
  };

  return (
    <View style={styles.container}>
    
      <Animated.View style={[styles.planet, styles.planet1, planetStyle1]} />
      <Animated.View style={[styles.planet, styles.planet2, planetStyle2]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }, 
  planet: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  planet1: {
    backgroundColor: "#2C5444",
  },
  planet2: {
    backgroundColor: "#5D3E2A",
  },
});

export default RotatingCirclesBackground;
