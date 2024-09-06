import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const CenteredText = ({ value }) => {

  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    scaleValue.setValue(0);
    opacityValue.setValue(1);
   
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.containerShape,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Text style={styles.text}>{value * 100}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerShape: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,255,0,1)",
    borderRadius: 12,
  },
  text: {
    padding: 2,
    fontSize: 12,
  },
});

export default CenteredText;
