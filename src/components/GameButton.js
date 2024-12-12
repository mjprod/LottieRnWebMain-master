import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

const buttonBackground = require("./../assets/image/button_play_game.png");

const GameButton = ({
  onPress,
  text,
  loading = false,
  style = {},
}) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <ImageBackground source={buttonBackground} style={styles.imageBackground}>
        {loading ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <View style={styles.content}>
            <Text style={styles.text}>{text}</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    zIndex: 999,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  img: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  text: {
    color: "#3E362A",
    fontSize: 22,
    fontFamily: "Teko-Medium",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default GameButton;
