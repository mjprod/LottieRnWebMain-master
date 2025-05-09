import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, Platform } from 'react-native';
import { Colors, Fonts } from '../../../util/constants';

const DigitTicker = ({ digit, duration = 500, textSize = 18, textStyle }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [previousDigit, setPreviousDigit] = useState(digit);

  useEffect(() => {
    if (digit !== previousDigit) {
      animatedValue.setValue(0);

      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => setPreviousDigit(digit));
    }
  }, [digit, previousDigit, animatedValue, duration]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -textSize],
  });

  const nextTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [textSize, 0],
  });

  return (
    <View style={[styles.digitContainer, { height: textSize, minWidth: textSize / 1.5 }]}>
      <Animated.View style={{ position: 'absolute', transform: [{ translateY }] }}>
        <Text style={[styles.text, textStyle, { fontSize: textSize }]}>{previousDigit}</Text>
      </Animated.View>

      <Animated.View style={{ position: 'absolute', transform: [{ translateY: nextTranslateY }] }}>
        <Text style={[styles.text, textStyle, { fontSize: textSize }]}>{digit}</Text>
      </Animated.View>
    </View>
  );
};

const NumberTicker = ({ number, duration = 1000, textSize = 18, textStyle }) => {
  const digits = String(number).split('');

  return (
    <View style={[styles.container, { height: textSize + 10 }]}>
      {digits.map((digit, index) => (
        <DigitTicker
          key={index}
          digit={digit}
          duration={duration}
          textSize={textSize}
          textStyle={textStyle}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: Colors.jokerBlack200,
    backgroundColor: Colors.jokerBlack300,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    margin: -2,
  },
  text: {
    fontFamily: Fonts.TekoMedium,
    color: Colors.jokerWhite50,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default NumberTicker;
