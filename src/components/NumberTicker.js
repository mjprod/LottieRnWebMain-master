import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const DigitTicker = ({ digit, duration = 100, textSize = 40, textStyle }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [previousDigit, setPreviousDigit] = useState(digit);

  useEffect(() => {
    if (digit !== previousDigit) {
      animatedValue.setValue(0);

      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
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
    <View style={[styles.digitContainer, { height: textSize, minWidth: textSize / 2.5 }]}>
      <Animated.View style={{ position: 'absolute', transform: [{ translateY }] }}>
        <Text style={[styles.text, textStyle, { fontSize: textSize }]}>{previousDigit}</Text>
      </Animated.View>

      <Animated.View style={{ position: 'absolute', transform: [{ translateY: nextTranslateY }] }}>
        <Text style={[styles.text, textStyle, { fontSize: textSize }]}>{digit}</Text>
      </Animated.View>
    </View>
  );
};

const NumberTicker = ({ number, duration = 100, textSize = 20, textStyle }) => {
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
    maxWidth: 100,
    marginTop: -8,
    minHeight: 34,
    borderColor: '#5F5F5F',
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 0, // Remove margem horizontal
    paddingHorizontal: 0, // Remover padding para compactar
  },
  text: {
    fontFamily: 'Teko-Medium',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default NumberTicker;
