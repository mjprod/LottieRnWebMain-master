import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Image } from 'react-native-svg-web';

export const IconTypeLucky = () => {
  // Create animated value for the bounce and rotation
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Define the bounce and rotation animations
  useEffect(() => {
    // Bounce animation (scaling up and down)
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.2, // Scale up
          duration: 2000,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1, 
          duration: 2000,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [bounceAnim, rotateAnim]);

  // Interpolate rotation value from 0 to 360 degrees
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        marginTop: 3,
      }}
    >
      <Animated.View
        style={{
          transform: [
            { scale: bounceAnim }, // Apply bounce scaling
            { rotate: rotation }, // Apply rotation
          ],
        }}
      >
        <Svg width="100" height="100" viewBox="0 0 100 100">
          <Image
            href={require('./../image/lucky_coin.png')}
            x="25"
            y="25"
            height="50"
            width="50"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};
