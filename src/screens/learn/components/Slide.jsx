import React from "react";
import { Image } from "react-native";

function Slide({ data, height, width }) {
  return (
    <Image
      resizeMode="contain"
      source={{ uri: data.image }}
      style={{ width: width, height: height }}
    />
  );
}
export default Slide;
