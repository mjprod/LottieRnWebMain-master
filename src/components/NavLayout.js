import React from "react";
import { StyleSheet, View } from "react-native";
import { ImageBackground } from "react-native-web";
import AlphaView from "./AlphaView";

const lottieAppBackground = require("../assets/image/background_top_nav.png");



const NavLayout = ({ showAlphaView }) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewBackground}>
        <ImageBackground
          source={lottieAppBackground}
          style={styles.imageBackground}
        />
        <AlphaView showAlphaView={showAlphaView} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewBackground: {
    flexDirection: "flex-start",
    backgroundColor: "#222021",
    height: 130,
    overflow: "hidden",
  },

  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavLayout;
