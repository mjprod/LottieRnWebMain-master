import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg-web';
import { Colors, Fonts } from '../util/constants';

const CircularProgress = ({ countdownTimer }) => {
    const size = 35;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const percentage = ((countdownTimer - 1) / 9) * 100;
    const [countDown, setCountDown] = useState(5)

    const svgProgress = 100 - percentage;

    useEffect(() => {
        const count = (countdownTimer / 10) * 5
        setCountDown(count === 0.5 ? 0 : Math.ceil(count))
    }, [countdownTimer])

    const getText = (countDown) => {
        return countDown === 0 ? "X" : countDown;
    }

    const getTextColor = (value) => {
        if (value >= 0 && value < 1) {
            return Colors.jokerRed900;
        } else if (value >= 2 && value <= 3) {
            return Colors.jokerHoney900;
        } else if (value >= 4 && value <= 5) {
            return Colors.jokerGreen900;
        } else {
            return Colors.jokerRed900;
        }
    };

    const getPositiveColor = (value) => {
        if (value >= 0 && value <= 1) {
            return Colors.jokerRed700;
        } else if (value >= 2 && value <= 3) {
            return Colors.jokerHoney700;
        } else if (value >= 4 && value <= 5) {
            return Colors.jokerGreen700;
        } else {
            return Colors.jokerBlack300;
        }
    };

    const getNegativeColor = (value) => {
        if (value >= 0 && value <= 1) {
            return Colors.jokerRed900;
        } else if (value >= 2 && value <= 3) {
            return Colors.jokerHoney900;
        } else if (value >= 4 && value <= 5) {
            return Colors.jokerGreen900;
        } else {
            return Colors.jokerBlack300;
        }
    };

    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    }, [countDown]);

    const animatedProgress = useRef(new Animated.Value(svgProgress)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: svgProgress,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, [svgProgress]);

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    return (
        <Animated.View style={{
            transform: [{ scale: scaleAnim }],
            flexShrink: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8
        }}>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    stroke={getNegativeColor(countDown)}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <AnimatedCircle
                    stroke={getPositiveColor(countDown)}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={`${circum} ${circum}`}
                    strokeDashoffset={animatedProgress.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, -radius * Math.PI * 2]
                    })}
                    strokeLinecap="butt"
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                    strokeWidth={strokeWidth}
                />
            </Svg>
            <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0.5,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                width: size,
                height: size,
            }}>
                <Text style={{
                    fontFamily: Fonts.TekoSemiBold,
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: 18,
                    paddingTop: 2,
                    color: getTextColor(countDown)
                }}>{`${getText(countDown)}`}</Text>
            </View>
        </Animated.View>
    );
};

export default CircularProgress;