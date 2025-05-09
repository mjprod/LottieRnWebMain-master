import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ progress, style }) => {
  const width = progress * 100 + '%';

  return (
    <View style={{ ...styles.progressBar, ...style }}>
      <Animated.View style={{ ...StyleSheet.absoluteFill, backgroundColor: "#FFD89D", width: width, borderRadius: 50 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 15,
    flexDirection: "row",
    width: '100%',
    boxShadow: 'inset 0px 2px 1px #000000',
    backgroundColor: '#131313',
    borderBottomColor: '#C0E8FF33',
    borderBottomWidth: 2,
    borderRadius: 50,
  },
});

export default ProgressBar;
