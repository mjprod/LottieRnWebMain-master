import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from 'react-native-web-linear-gradient';

const DiagonalGradientCard = ({ children, style }) => {
  return (<LinearGradient start={{ x: 0.0, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
    locations={[0, 0.3, 0.45, 0.55, 1.0]}
    colors={['#21212100', '#262E334D', '#1D4A644D', '#24282B4D', '#2121214D']}
    style={{ ...styles.card, ...style }}>
    {children}
  </LinearGradient>);
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #4B595D",
    borderRadius: 12,
  },
});

export default DiagonalGradientCard;