import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { ImageBackground } from "react-native-web";
import AlphaView from "./AlphaView";

const lottieAppBackground = require("../assets/image/background_top_nav.png");

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const NavLayout = ({ showAlphaView }) => {
  const isMobile = screenWidth < 768;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.viewBackground,
          { height: screenHeight * 0.15 },
        ]}
      >
        <ImageBackground
          source={lottieAppBackground}
          style={styles.imageBackground}
          reziseMode="cover"
        >
          <AlphaView showAlphaView={showAlphaView} />
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Não usar flex: 1 aqui
  },
  viewBackground: {
    backgroundColor: "#222021",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavLayout;
