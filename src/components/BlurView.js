import React from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground } from 'react-native';

const BlurView = ({ children, blurAmount, style }) => {
    if (Platform.OS === 'web') {
      return (
        <div
          style={{
            ...style,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`, // For Safari
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </div>
      );
    }
  
    return (
      <View style={style}>
        {children}
      </View>
    );
  };
