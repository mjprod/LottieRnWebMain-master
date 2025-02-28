import React from "react";
import { View, Text, Image } from "react-native";

function Slide({ data, height, width }) {
  console.log("Slide Data", data);
  return (
    <Image
      resizeMode="contain"
      source={{ uri: data.image }}
      style={{ width: width * 0.8, height: height * 0.9 }}
    />
  );
}
export default Slide;
