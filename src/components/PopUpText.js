import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const PopUpText = ({ value }) => {

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

  const getTextColor = (value) => {
    if (value >= 1 && value <= 2) {
      return "#F56134"; // Red
    } else if (value >= 3 && value <= 4) {
      return "#DD9F4B"; // Yellow
    } else if (value >= 5 && value <= 10) {
      return "#3EDA41"; // Green
    } else {
      return "#dc4445"; // Default to Red if no match
    }
  };
  


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.containerShape,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
          {backgroundColor: getTextColor(value)}
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
    zIndex: 999,
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
    color: "#FFFFFF",
    fontFamily: "Teko-Medium",
  },
});

export default PopUpText;
