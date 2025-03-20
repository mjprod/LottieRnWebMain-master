import React from "react";
import { Image } from "react-native";

function Slide({ data, height, width }) {
  console.log("Slide Data", data);
  return (
    <Image
      resizeMode="contain"
      source={{ uri: data.image }}
      style={{ width: width, height: height }}
    />
  );
}
export default Slide;
