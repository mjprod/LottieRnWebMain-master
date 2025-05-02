import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg-web';
import { Colors, Fonts } from '../util/constants';

const CircularProgress = ({ countdownTimer }) => {
    const size = 25;
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const percentage = ((countdownTimer - 1) / 9) * 100;

    const svgProgress = 100 - percentage;

    const getBackground = (value) => {
        if (value >= 1 && value <= 2) {
            return Colors.jokerRed400;
        } else if (value >= 3 && value <= 6) {
            return Colors.jokerHoney400;
        } else if (value >= 7 && value <= 10) {
            return Colors.jokerGreen400;
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
    }, [percentage]);

    return (
        <Animated.View style={{
            transform: [{ scale: scaleAnim }],
            flexShrink: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        }}>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    stroke="#D9D9D9"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <Circle
                    stroke={getBackground(countdownTimer)}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={`${circum} ${circum}`}
                    strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
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
                <Text style={{ fontFamily: Fonts.InterBold, textAlign: "center", alignSelf: "center" }}>{countdownTimer === 1 ? 'X' : countdownTimer}</Text>
            </View>
        </Animated.View>
    );
};

export default CircularProgress;