import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const NumberTicker = ({ number, duration = 1000, textSize = 40, textStyle }) => {
  const [previousNumber, setPreviousNumber] = useState(number); // Store the previous number
  const animatedValue = useRef(new Animated.Value(0)).current; // Control the animation

  useEffect(() => {
    if (number !== previousNumber) {
      // Reset animation value before starting
      animatedValue.setValue(0);

      // Start the animation when the number changes
      Animated.timing(animatedValue, {
        toValue: 1, // Animate from 0 to 1
        duration: duration, // Full duration for both numbers
        useNativeDriver: true, // For performance
      }).start(() => {
        // Once animation is complete, update the previous number
        setPreviousNumber(number);
      });
    }
  }, [number, previousNumber, duration, animatedValue]);

  // Interpolating translateY to animate both numbers simultaneously
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -textSize], // Move previous number up and out, and new number in
  });

  const nextTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [textSize, 0], // Moves new number in from below
  });

  return (
    <View style={[styles.container, { height: textSize }]}>
      {/* Animated previous number sliding out */}
      <Animated.View style={{ position: 'absolute', transform: [{ translateY }] }}>
        <Text style={[styles.text, textStyle, { fontSize: textSize }]}>
          {previousNumber}
        </Text>
      </Animated.View>

      {/* Animated current number sliding in */}
      <Animated.View style={{ position: 'absolute', transform: [{ translateY: nextTranslateY }] }}>
        <Text style={[styles.text, textStyle, { fontSize: textSize }]}>
          {number}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Hide overflow for smooth transitions
    position: 'relative', // Allow positioning for numbers to overlap
  },
  text: {
    fontWeight: 'bold',
    color: '#00ff00', // Green color for your number
    textAlign: 'center',
  },
});

export default NumberTicker;
