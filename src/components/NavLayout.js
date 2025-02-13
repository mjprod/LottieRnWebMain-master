import React from "react";
import { StyleSheet, View } from "react-native";
import { ImageBackground } from "react-native-web";
import AlphaView from "./AlphaView";

const navTopAppBackground = require("../assets/image/background_top_nav.png");

const NavLayout = ({ showAlphaView }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.viewBackground,
          { height: 130 },
        ]}
      >
        <ImageBackground
          source={navTopAppBackground}
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
