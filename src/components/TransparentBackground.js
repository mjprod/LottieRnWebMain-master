import React from "react";
import { View, ImageBackground } from "react-native";

const TransparentBackground = ({ source, children, style }) => {
  return (
    <ImageBackground
      source={source}
      blurRadius={10}
      resizeMode="cover"
      style={[
        {
          flex: 1,
          justifyContent: "stretch",
          backgroundColor: "#000",
          overflow: "hidden",
        },
        style,
      ]}
    >
      {children}
    </ImageBackground>
  );
};

export default TransparentBackground;
